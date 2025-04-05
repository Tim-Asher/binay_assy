import google.generativeai as genai  # Google Generative AI SDK to interact with the Gemini API
import os  # OS module to interact with environment variables

# ==========================
# Configure the Gemini API key using environment variable
# ==========================
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Set the API key for the Gemini API from environment variable

# ==========================
# Function to get a response from Gemini based on user input message
# ==========================
async def get_gemini_response(user_message: str) -> str:
    model = genai.GenerativeModel(model_name='gemini-1.5-flash')  # Initialize the Gemini model
    response = model.generate_content(user_message)  # Generate a response from Gemini based on the user message
    return response.candidates[0].content.parts[0].text  # Extract and return the generated response text
