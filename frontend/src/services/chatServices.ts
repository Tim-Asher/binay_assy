import { CreateChatProps, EditChatProps } from "../Interfaces/interfaces"; // Importing types for props
import api from "./api"; // Importing the configured axios instance for API calls

// ==========================
// Edit Chat API Call
// ==========================
export const editChatApi = async ({ chatId, title }: EditChatProps) => {
  // Making a PATCH request to update the chat's title
  const res = await api.patch(`/update_chat/${chatId}`, {
    title, // Sending updated title in the request body
  });
  return res; // Returning the response from the API
};

// ==========================
// Delete Chat API Call
// ==========================
export const deleteChatApi = async (chatId: string) => {
  // Making a DELETE request to delete the chat by its ID
  const res = await api.delete(`/delete/${chatId}`);
  return res; // Returning the response from the API
};

// ==========================
// Get All Chats API Call
// ==========================
export const getAllChatsApi = async () => {
  // Making a GET request to retrieve all chats
  const res = await api.get(`/get_all_chats`);
  return res; // Returning the response from the API
};

// ==========================
// Create Chat API Call
// ==========================
export const createChatApi = async ({ title }: CreateChatProps) => {
  // Making a POST request to create a new chat with the provided title
  const res = await api.post(`/create_chat`, { title });
  return res; // Returning the response from the API
};
