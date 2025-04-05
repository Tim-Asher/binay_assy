from motor.motor_asyncio import AsyncIOMotorClient  # MongoDB async client for asynchronous operations
import os  # For accessing environment variables
from dotenv import load_dotenv  # To load environment variables from a .env file

# ==========================
# Load environment variables from the .env file
# ==========================
load_dotenv()  # Load environment variables from a .env file into the environment

# ==========================
# Retrieve the MongoDB URI and set database details
# ==========================
MONGO_URI = os.getenv("MONGO_URI")  # Retrieve the MongoDB URI from the environment variable
DB_NAME = "binat"  # Define the database name to be used

# ==========================
# Initialize MongoDB client and connect to the database
# ==========================
client = AsyncIOMotorClient(MONGO_URI)  # Create an async MongoDB client using the connection URI
database = client[DB_NAME]  # Get the specific database ('binat') from the client
