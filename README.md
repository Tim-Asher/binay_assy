

# Chat Application

A real-time chat application where users can create, edit, and delete chat rooms, send messages, and manage authentication. The application features a front-end built with React and a back-end API built with FastAPI.

## Features

### Frontend Features:

- **User Authentication**:
  - Register, login, and logout functionality with JWT authentication.
  - Token validation to keep the user session alive.
- **Chat Management**:

  - Create, edit, and delete chat rooms.
  - Real-time message sending.
  - Chat-specific modal for displaying messages.

- **UI Components**:

  - Sidebar for navigation between different chats.
  - Modal for showing and interacting with chat content.

- **Error Handling**:
  - Alerts for handling API request errors with user-friendly messages.

### Backend Features:

- **User Authentication**:
  - Registration and login with JWT authentication.
- **Chat Management**:
  - Create, delete, and update chats.
- **Message Management**:
  - Send messages to a chat and communicate with a Gemini bot.
- **Cross-Origin Resource Sharing (CORS)**:
  - Support for handling requests from different domains.

## Technologies Used

### Frontend:

- **React** (for building the user interface)
- **React Router** (for routing and handling navigation)
- **Axios** (for making API requests)
- **Tailwind CSS** (for styling)
- **Context Management**:

  - React Context API (for state management)

- **API Services**:
  - Axios-based API requests for interacting with the backend.

### Backend:

- **FastAPI**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user, chat, and message data.
- **Pydantic**: Data validation and settings management.
- **Passlib**: Password hashing and verification.
- **PyJWT**: JWT token generation and verification.
- **Motor**: Async MongoDB driver.
- **Uvicorn**: ASGI server to run the FastAPI app.

## Project Setup

### Frontend Setup

1. **Clone the repository**:

```bash
git clone https://github.com/Tim-Asher/binat_assignment.git
cd frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root of your frontend project and add the following:

```bash
VITE_API_URL=http://your-api-url
```

4. **Run the development server**:

```bash
npm start
```

The application will be available at `http://localhost:5173`.

### Backend Setup

1. **Clone the repository**:

```bash
git clone https://github.com/Tim-Asher/binat_assignment.git
cd backend
```

2. **Run Venv & Install dependencies**:

```bash
venv\Scripts\activate
pip install
```

3. **Set up environment variables**:

Create a `.env` file in the root of your backend project and add the following:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
GEMINI_API_KEY=<your_gemini_api_key>
```

4. **Run the application**:

```bash
uvicorn app.main:app --reload
```

The backend will be available at `http://127.0.0.1:8000`.

### MongoDB Setup

If you're using MongoDB locally, make sure your MongoDB server is running. If using MongoDB Atlas, ensure the `MONGO_URI` in your `.env` file is correctly configured.

## File Structure

### Frontend

```
├── components/
│   ├── Auth/
│   |   ├── AuthForm.tsx   # Form component for user authentication (login/signup).
│   |   ├── AuthModel.tsx  # Modal component for authentication (displaying forms).
│   |   └── UserButton.tsx # Button component for managing user login/logout.
│   ├── Chat.tsx           # Main chat component where messages are displayed and sent.
│   ├── ChatMenuButton.tsx # Button component for opening the chat menu.
│   ├── DropdownMenu.tsx   # Dropdown menu for user actions within the app.
│   ├── EditChat.tsx       # Component for editing chat details.
│   ├── Input.tsx          # Input field for sending messages in a chat.
│   └── SideBar.tsx        # Sidebar component for navigation between chats.
├── contexts/
│   ├── AppProvider.tsx    # Provides context for app state (authentication, chat state).
│   ├── ChatContext.tsx    # Provides context for chat management.
│   ├── MessageContext.tsx # Provides context for managing messages.
│   ├── ModalContext.tsx   # Manages modal states for chat content interactions.
│   └── UserContext.tsx    # Provides context for user management (login/logout).
├── services/
│   ├── api.ts             # Axios instance for handling API requests.
│   ├── chatServices.ts    # Functions for handling chat-related API requests.
│   ├── messageServices.ts # Functions for handling message-related API requests.
│   └── userServices.ts    # Functions for user authentication (login, register, etc.).
├── Interfaces/
│   ├── interfaces.ts      # TypeScript interfaces for type safety (e.g., User, Message, Chat).
├── utils/
│   ├── apiHandler.ts      # Utility functions for handling API requests and responses.
├── App.css                # Styles for the app.
├── App.tsx                # Main app component, handles routing and UI.
└── index.tsx              # Entry point of the application, renders the app.

```

### Backend

```
├── app/
|   ├── middlewares/
|   |   └── corsMiddlewares.py   # Middleware for handling Cross-Origin Resource Sharing (CORS).
|   ├── routes/
|   |   ├── chat.py              # API routes for chat management (create, delete, update).
|   |   ├── protect.py           # Middleware for protecting routes requiring authentication.
|   |   └── user.py              # API routes for user authentication (login, register, logout).
|   ├── services/
|   |   └── gemini.py            # Service for interacting with Gemini bot API.
|   ├── utils/
|   |   ├── hash.py              # Utility functions for password hashing and verification.
|   |   └── jwt.py               # Utility functions for generating and verifying JWT tokens.
│   ├── main.py                  # Main FastAPI application, the entry point for the API.
│   ├── models.py                # Database models for MongoDB collections (User, Chat, Message).
│   ├── database.py              # Database connection setup (MongoDB) and session management.
├── requirements.txt             # List of dependencies required for the backend.
├── .env                         # Environment variables (MongoDB URI, JWT secret, etc.).
└── README.md                    # Project documentation.

```

## API Endpoints

### Frontend API Endpoints

- **POST /register**: Register a new user.
- **POST /login**: Login an existing user.
- **POST /logout**: Logout the current user.
- **GET /validate_token**: Validate the user's session token.

- **POST /create_chat**: Create a new chat.
- **PATCH /update_chat/:chatId**: Edit an existing chat.
- **DELETE /delete/:chatId**: Delete a chat.
- **GET /get_all_chats**: Fetch all chats.

- **POST /chat**: Send a message to a chat.
- **GET /get_chat/:chatId**: Fetch messages for a specific chat.
- **DELETE /messages/:chatId**: Delete all messages from a chat.

### Backend API Endpoints

- **POST /register**: Registers a new user.
- **POST /login**: Logs in an existing user and returns a JWT token.
- **POST /logout**: Logs out the user by invalidating the JWT token.
- **GET /validate_token**: Checks if the JWT token is valid.

- **POST /create_chat**: Creates a new chat.
- **DELETE /delete/{chat_id}**: Deletes a chat by its ID.
- **PATCH /update_chat/{chat_id}**: Updates a chat’s title.
- **GET /get_all_chats**: Retrieves all chats for the authenticated user.
- **GET /get_chat/{chat_id}**: Retrieves a specific chat and its messages.

- **POST /chat**: Sends a message to the Gemini bot and returns a bot response.
- **DELETE /messages/{chat_id}**: Deletes all messages in a specific chat.

## Contributing

Feel free to open issues or submit pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
