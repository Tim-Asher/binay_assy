from jose import JWTError, jwt  # JWT handling library for creating and verifying JWT tokens
from datetime import datetime, timedelta  # For handling date and time, especially for token expiration
import os  # For accessing environment variables

# ==========================
# Set up the JWT secret key and algorithm
# ==========================
secretKey = os.getenv("JWT_SECRET")  # Get the secret key for JWT encoding from environment variable
ALGORITHM = "HS256"  # Define the algorithm used for encoding the JWT token
EXPIRE_MINUTES = 60  # Set the token expiration time to 60 minutes

# ==========================
# Create an access token for a given data dictionary
# ==========================
def create_access_token(data: dict):
    to_encode = data.copy()  # Copy the input data to avoid modifying the original dictionary
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)  # Set the expiration time of the token
    to_encode.update({"exp": expire})  # Add expiration time to the token data
    return jwt.encode(to_encode,  secretKey, algorithm=ALGORITHM)  # Encode and return the JWT token

# ==========================
# Verify the JWT token and extract the payload
# ==========================
def verify_token(token: str):
    try:
        payload = jwt.decode(token,  secretKey, algorithms=[ALGORITHM])  # Decode the token and validate it
        return payload.get("sub")  # Extract and return the subject from the payload (usually user ID)
    except JWTError:
        return None  # If there's an error during decoding, return None (invalid token)
