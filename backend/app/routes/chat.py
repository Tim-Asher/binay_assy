from fastapi import APIRouter, HTTPException, Request, Depends  # FastAPI core tools for building API routes and handling requests
from bson import ObjectId  # Utility to work with MongoDB ObjectIds (e.g., validating and converting string IDs)
from app.database import database  # Access to the MongoDB database instance from your app
from app.models import Message, Chat  # Importing Pydantic models representing the structure of Chat and Message documents
from app.routes.protect import get_user_id_from_token  # A function that extracts and validates the user ID from a JWT token
from app.services.gemini import get_gemini_response  # Function to get AI-generated responses (e.g., from Gemini or a similar LLM)
from pymongo import DESCENDING  # To specify sort order when querying MongoDB (DESCENDING = newest first)
from datetime import datetime  # For working with timestamps (e.g., updated_at fields)


router = APIRouter()  # Create an API router for grouping related endpoints

# ==========================
# Delete a specific chat
# ==========================
@router.delete("/delete/{chat_id}")
async def delete_chat(chat_id: str, user_id: str = Depends(get_user_id_from_token)):
    if not ObjectId.is_valid(chat_id):
        raise HTTPException(status_code=404, detail="Invalid chat ID")

    # Fetch the chat from DB
    chat = await database["chats"].find_one({"_id": ObjectId(chat_id)})
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    # Only the owner can delete the chat
    if chat.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this chat")

    # Delete chat document
    await database["chats"].delete_one({"_id": ObjectId(chat_id)})

    return {"status": "success", "message": "Chat deleted"}

# ==========================
# Create a new chat
# ==========================
@router.post("/create_chat")
async def create_chat(chat: Chat, user_id: str = Depends(get_user_id_from_token)):
    chat_dict = chat.model_dump()
    chat_dict["user_id"] = user_id  # Attach user ID to the chat

    # Insert into database
    result = await database["chats"].insert_one(chat_dict)
    chat_dict["_id"] = str(result.inserted_id)  # Add ID to response

    return {"status": "success", "chat": chat_dict}

# ==========================
# Update a chat (e.g., rename title)
# ==========================
@router.patch("/update_chat/{chat_id}")
async def update_chat(chat_id: str, chat: Chat, user_id: str = Depends(get_user_id_from_token)):
    if not ObjectId.is_valid(chat_id):
        raise HTTPException(status_code=400, detail="Invalid Chat ID")

    # Find existing chat
    existing_chat = await database["chats"].find_one({"_id": ObjectId(chat_id)})
    if not existing_chat:
        raise HTTPException(status_code=404, detail="Chat Not Found")

    # Ensure user owns this chat
    if existing_chat.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this chat")

    # Prepare update fields (e.g., title + timestamp)
    update_fields = {}
    if chat.title:
        update_fields["title"] = chat.title
    update_fields["updated_at"] = datetime.utcnow().isoformat()

    # Apply update
    await database["chats"].update_one(
        {"_id": ObjectId(chat_id)},
        {"$set": update_fields}
    )

    return {"status": "success", "updated_chat_id": chat_id}

# ==========================
# Get all chats for a user
# ==========================
@router.get("/get_all_chats")
async def get_all_chats(user_id: str = Depends(get_user_id_from_token)):
    # Get chats sorted by last updated (ascending)
    chats = await database["chats"].find(
        {"user_id": user_id}, {"messages": 0}  # Exclude messages field
    ).sort("updated_at", 1).to_list(None)

    # Convert ObjectId to string
    for chat in chats:
        chat["_id"] = str(chat["_id"])

    return {"chats": chats}

# ==========================
# Get a specific chat and its messages
# ==========================
@router.get("/get_chat/{chat_id}")
async def get_chat(chat_id: str, user_id: str = Depends(get_user_id_from_token)):
    # Get chat from DB
    chat = await database["chats"].find_one({"_id": ObjectId(chat_id)})
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    # Ensure access rights
    if chat.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this chat")

    # Fetch all messages for the chat
    messages = await database["messages"].find({"chat_id": chat_id}).to_list(None)
    for message in messages:
        message["_id"] = str(message["_id"])
        message["chat_id"] = str(message["chat_id"])

    return {"chat_id": chat_id, "messages": messages}

# ==========================
# Chat with Gemini AI (store user & bot messages)
# ==========================
@router.post("/chat")
async def chat_with_gemini(message: Message, user_id: str = Depends(get_user_id_from_token)):
    # Update timestamp & store user message if chat_id exists
    if message.chat_id:
        await database["chats"].update_one(
            {"_id": ObjectId(message.chat_id)},
            {"$set": {"updated_at": datetime.utcnow()}}
        )
        message_dict = message.model_dump()
        message_dict["user_id"] = user_id
        await database["messages"].insert_one(message_dict)

    # Get Gemini's response
    bot_response = await get_gemini_response(message.text)

    # Create bot message
    bot_message = Message(
        user_id="gemini",
        chat_id=message.chat_id,
        text=bot_response,
        is_bot=True
    )

    # Save bot response if chat exists
    if message.chat_id:
        await database["messages"].insert_one(bot_message.model_dump())

    return {"user_message": message, "gemini_response": bot_message}

# ==========================
# Delete all messages in a specific chat
# ==========================
@router.delete("/messages/{chat_id}")
async def delete_all_messages(chat_id: str):
    await database["messages"].delete_many({"chat_id": chat_id})
    return {"status": "success"}
