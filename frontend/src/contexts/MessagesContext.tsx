import { createContext, useContext, useState } from "react"; // React context and hooks for state management
import {
  deleteMessagesApi,
  getMessagesApi,
  sendMessageApi,
} from "../services/messagesServices"; // API functions to interact with message services (send, fetch, delete)
import { MessageContextProps, MessageProps } from "../Interfaces/interfaces"; // TypeScript types for message context and message properties
import { handleApiRequest } from "../utils/apiHandler"; // Utility function for API error handling
import { useChats } from "./ChatContext"; // Custom hook to access the chat context

// ==========================
// Create the Messages Context
// ==========================
const MessagesContext = createContext<MessageContextProps | undefined>(
  undefined, // Default value is undefined if context isn't provided
);

// ==========================
// MessageProvider component
// ==========================
export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<MessageProps[]>([]); // State to hold messages in the current chat
  const { chats, setChats } = useChats(); // Access chats from the ChatContext

  // ==========================
  // Function to send a message
  // ==========================
  const sendMessage = async (chatId: string | undefined, text: string) => {
    // Prevent sending empty messages
    if (!text.trim()) return;

    // Create a new message object
    const newMessage: MessageProps = {
      _id: crypto.randomUUID(), // Unique ID for the message
      chat_id: chatId, // Chat ID the message belongs to
      text: text, // Message content
      timestamp: new Date().toISOString(), // Timestamp of when the message is sent
      is_bot: false, // Mark as user message
    };

    // Add the new message to the state
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    return handleApiRequest(async () => {
      // Send the user message to the server
      const res = await sendMessageApi(newMessage);

      // Create a bot's response message
      const geminiMessage: MessageProps = {
        _id: res.data.gemini_response._id || crypto.randomUUID(), // Generate ID or use the one from API
        chat_id: chatId, // Chat ID for the bot's response
        user_id: "gemini", // Mark as bot message
        text: res.data.gemini_response.text, // Bot's response text
        timestamp: new Date().toISOString(), // Timestamp for bot's response
        is_bot: true, // Mark as bot message
      };

      // Add bot response to state
      setMessages((prevMessages) => [...prevMessages, geminiMessage]);

      if (chatId) {
        const updatedChats = [...chats];
        const chatIndex = updatedChats.findIndex((chat) => chat._id === chatId);

        // Move the current chat to the first position
        const [chat] = updatedChats.splice(chatIndex, 1); // Remove the chat from its current position
        updatedChats.unshift(chat); // Add it to the beginning of the array

        // Update chats state
        setChats(updatedChats);
      }
    }, "Failed to send message");
  };

  // ==========================
  // Function to delete all messages in a chat
  // ==========================
  const deleteAllMessages = (chatId: string) => {
    return handleApiRequest(async () => {
      const res = await deleteMessagesApi(chatId);
      return res;
    }, "Failed to delete messages");
  };

  // ==========================
  // Function to fetch messages from the server
  // ==========================
  const fetchMessages = (chatId: string) => {
    return handleApiRequest(async () => {
      const res = await getMessagesApi({ chatId });
      setMessages(res.data.messages); // Set the fetched messages into state
    }, "Error fetching messages");
  };

  // ==========================
  // Return MessagesContext.Provider to supply values to components
  // ==========================
  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
        fetchMessages,
        sendMessage,
        deleteAllMessages,
      }}
    >
      {children} {/* Render children components within the provider */}
    </MessagesContext.Provider>
  );
};

// ==========================
// Custom hook to access the messages context
// ==========================
export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MesageProvider");
  }
  return context; // Return context value
};
