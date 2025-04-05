from pydantic import BaseModel, EmailStr  # Pydantic models for data validation and email type validation
from datetime import datetime  # For handling date and time
from typing import Optional  # For optional typing in Pydantic models

# ==========================
# Define the Chat model to validate and structure chat data
# ==========================
class Chat(BaseModel):
    title: str  # Title of the chat
    created_at: datetime = datetime.now()  # Timestamp for when the chat was created (default: current time)
    updated_at: datetime = datetime.now()  # Timestamp for when the chat was last updated (default: current time)

# ==========================
# Define the Message model to validate and structure message data
# ==========================
class Message(BaseModel):
    chat_id: Optional[str] = None  # Chat ID for the message, optional as it may not be provided initially
    text: str  # Text content of the message
    timestamp: datetime = datetime.now()  # Timestamp for when the message was created (default: current time)
    is_bot: bool = False  # Boolean to indicate if the message is from a bot (default: False)

# ==========================
# Define the User model to validate and structure user data
# ==========================
class User(BaseModel):
    email: EmailStr  # Email address of the user, validated as a proper email format
    password: str  # Password for the user account
