# Import the CORS middleware from FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Define a function to configure CORS settings for the FastAPI app
def setup_cors(app):
    # Define the list of allowed origins (frontends that can communicate with this backend)
    origins = [
        "http://localhost:5173",  # Local development frontend URL
        "http://localhost:5173/", # Redundant, optional to keep both
    ]

    # Add the CORS middleware to the FastAPI app with specific configurations
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,            # Only allow requests from these origins
        allow_credentials=True,           # Allow sending cookies and auth headers
        allow_methods=["*"],              # Allow all HTTP methods (GET, POST, etc.)
        allow_headers=["*"],              # Allow all headers in the request
    )
