import { createContext, useContext, useEffect, useState } from "react";
import {
  createChatApi,
  deleteChatApi,
  editChatApi,
  getAllChatsApi,
} from "../services/chatServices";
import {
  ChatProps,
  CreateChatProps,
  EditChatProps,
} from "../Interfaces/interfaces";
import { handleApiRequest } from "../utils/apiHandler";
import { useUser } from "./UserContext";

// ==========================
// ChatContext definition
// ==========================
interface ChatContextProps {
  chats: ChatProps[]; // Stores the list of chats
  setChats: React.Dispatch<React.SetStateAction<ChatProps[]>>; // Function to update the chats state
  deleteChat: (chatId: string) => Promise<any>; // Function to delete a chat
  updateChat: ({ title, user_id, chatId }: EditChatProps) => Promise<any>; // Function to update a chat's title
  createChat: ({ title }: CreateChatProps) => Promise<any>; // Function to create a new chat
}

// ==========================
// Create context
// ==========================
const ChatContext = createContext<ChatContextProps | null>(null);

// ==========================
// ChatProvider component
// ==========================
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<ChatProps[]>([]); // State to hold the list of chats
  const { user } = useUser(); // Access current user context

  // ==========================
  // Function to create a new chat
  // ==========================
  const createChat = ({ title }: CreateChatProps) => {
    return handleApiRequest(async () => {
      const res = await createChatApi({ title }); // API call to create chat
      setChats((prevChats) => [res.data.chat, ...prevChats]); // Update state with the new chat
      return res.data;
    }, "Error creating chats");
  };

  // ==========================
  // Function to delete a chat
  // ==========================
  const deleteChat = (chatId: string) => {
    return handleApiRequest(async () => {
      const res = await deleteChatApi(chatId); // API call to delete chat
      setChats((prevChats) => {
        const updatedChats = prevChats.filter((chat) => chat._id !== chatId); // Remove chat from the state
        return updatedChats;
      });
      return res;
    }, "Error fetching chats");
  };

  // ==========================
  // Function to update chat's title
  // ==========================
  const updateChat = ({ title, user_id, chatId }: EditChatProps) => {
    return handleApiRequest(async () => {
      const res = await editChatApi({ chatId, title, user_id }); // API call to update chat
      setChats((prevChats) =>
        prevChats.map(
          (chat) => (chat._id === chatId ? { ...chat, title } : chat), // Update chat title in the state
        ),
      );
      return res;
    }, "Error update chat");
  };

  // ==========================
  // Fetch all chats
  // ==========================
  const fetchChats = () => {
    return handleApiRequest(async () => {
      const response = await getAllChatsApi(); // API call to fetch chats
      setChats(response.data.chats); // Set the chats in the state
    }, "Error fetching chats");
  };

  // ==========================
  // Fetch chats when user changes
  // ==========================
  useEffect(() => {
    fetchChats(); // Fetch chats on user change
  }, [user]); // Dependency on user, fetch chats whenever the user changes

  return (
    // ==========================
    // Provide context to children components
    // ==========================
    <ChatContext.Provider
      value={{ chats, setChats, deleteChat, updateChat, createChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// ==========================
// Custom hook to access chat context
// ==========================
export const useChats = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChats must be used within a ChatProvider");
  return context;
};
