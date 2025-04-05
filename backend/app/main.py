from fastapi import FastAPI  # FastAPI framework for building the web application
from app.routes import chat, user  # Import the chat and user routes for inclusion in the app
from app.middlewares.corsMiddlewares import setup_cors  # Import the CORS setup function

# ==========================
# Initialize FastAPI app instance
# ==========================
app = FastAPI()  # Create an instance of FastAPI for the application

# ==========================
# Set up CORS middleware for the app
# ==========================
setup_cors(app)  # Call the function to set up Cross-Origin Resource Sharing (CORS) middleware

# ==========================
# Include the chat and user routers in the application
# ==========================
app.include_router(chat.router)  # Include the chat-related routes in the app
app.include_router(user.router)  # Include the user-related routes in the app

# ==========================
# Run the application with Uvicorn server when script is executed directly
# ==========================
if __name__ == "__main__":  
    import uvicorn  # Uvicorn ASGI server for running the FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Run the app on host 0.0.0.0 and port 8000
