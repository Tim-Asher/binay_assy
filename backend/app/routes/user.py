from fastapi import APIRouter, HTTPException, Request  # FastAPI tools: APIRouter for route handling, HTTPException for error handling, Request for request data
from fastapi.responses import JSONResponse  # Import JSONResponse to send custom HTTP responses
from app.models import User  # Import the User model representing user data
from app.utils.hash import hash_password, verify_password  # Utility functions for password hashing and verification
from app.utils.jwt import create_access_token, verify_token  # Functions for creating and verifying JWT tokens

from app.database import database  # Access the MongoDB database instance from the app

router = APIRouter()  # Create a router instance to handle the routes for authentication

# ==========================
# Register a new user in the system
# ==========================
@router.post("/register")
async def register(user: User):
    existing = await database["users"].find_one({"email": user.email})  # Check if the email already exists
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")  # If user exists, raise error
    
    hashed_pwd = hash_password(user.password)  # Hash the password before storing it
    user_dict = {"email": user.email, "password": hashed_pwd}  # Create user dictionary with hashed password
    res = await database["users"].insert_one(user_dict)  # Insert the new user into the database
    return {"id": str(res.inserted_id), "email": user.email}  # Return the user ID and email

# ==========================
# Log in an existing user and generate a JWT token
# ==========================
@router.post("/login")
async def login(user: User):
    db_user = await database["users"].find_one({"email": user.email})  # Find user by email in the database
    if not db_user or not verify_password(user.password, db_user["password"]):  # Verify the password
        raise HTTPException(status_code=401, detail="The email or password you entered is incorrect. Please try again.")  # Raise error if invalid
    
    token = create_access_token({"sub": str(db_user["_id"])})  # Create JWT token with user ID in payload

    response = JSONResponse(content={"message": "Login successful"})  # Prepare response message
    response.set_cookie(
        key="access_token",  # Set cookie with the generated token
        value=token,  # The JWT token as the value
        httponly=True,  # Prevents JavaScript access (XSS protection)
        secure=True,  # Send only over HTTPS (you can disable in dev)
        samesite="lax",  # Set SameSite attribute to control cross-site requests
        max_age=60 * 60 * 24 * 7,  # Cookie expiration time set to 1 week
    )
    return response  # Return the response with the login success message and cookie

# ==========================
# Log out the user by clearing the 'access_token' cookie
# ==========================
@router.post("/logout")
async def logout():
    # Create a response to send back to the client
    response = JSONResponse(content={"message": "Logout successful"})  # Set the logout message
    
    # Set the 'access_token' cookie to expire immediately to log out the user
    response.set_cookie(
        key="access_token",  # The name of the cookie
        value="",  # Empty value to invalidate the token
        httponly=True,  # Prevents JavaScript access (XSS protection)
        secure=True,  # Send only over HTTPS (recommended in production)
        samesite="lax",  # 'lax' or 'strict' based on your setup
        max_age=0,  # Expiry time set to 0 to remove the cookie
        expires=0  # Also set expires to 0 for good measure
    )
    
    return response  # Return the response indicating successful logout

# ==========================
# Validate the access token in the cookie
# ==========================
@router.get("/validate_token")
def check_cookie(request: Request):
    token = request.cookies.get("access_token")  # Retrieve the token from cookies
    if token:  # If token exists
        user = verify_token(token)  # Verify the token
        if user:  # If token is valid
            return {"status": "success"}  # Return success if token is valid
    return {"message": "No cookie found"}  # Return a message if no token is found
