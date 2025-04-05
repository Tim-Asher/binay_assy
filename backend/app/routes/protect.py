from fastapi import Depends, HTTPException, Request  # FastAPI tools: Depends for dependency injection, HTTPException for error handling, Request for request data
from app.utils.jwt import verify_token  # Import the verify_token function from the JWT utility module to validate and decode the token

# ==========================
# Function to extract the user ID from the token stored in the request cookies
# ==========================
def get_user_id_from_token(request: Request):
    token = request.cookies.get("access_token")  # Retrieve the "access_token" from the request's cookies
    if not token:  # If no token is found, return a placeholder user ID (temporary user)
        return "temp"  

    payload = verify_token(token)  # Verify the token and decode the payload

    if not payload:  # If token verification fails (invalid token), return a temporary user ID
        return "temp"  
    return payload  # Return the decoded payload, which contains the user ID and other information
