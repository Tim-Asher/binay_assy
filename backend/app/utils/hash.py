from passlib.context import CryptContext  # Import CryptContext from Passlib to handle password hashing

# ==========================
# Initialize CryptContext with bcrypt hashing algorithm
# ==========================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # Set bcrypt as the password hashing algorithm

# ==========================
# Hash the user's password using bcrypt algorithm
# ==========================
def hash_password(password: str) -> str:
    return pwd_context.hash(password)  # Hash the provided password and return the hashed value

# ==========================
# Verify if the plain password matches the hashed password
# ==========================
def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)  # Compare the plain password with the hashed password
