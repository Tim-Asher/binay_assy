import { MessageProps } from "../Interfaces/interfaces"; // Importing the MessageProps type to define message data structure
import api from "./api"; // Importing the configured axios instance for API calls

// ==========================
// Get Messages API Call
// ==========================
export const getMessagesApi = async ({ chatId }: { chatId: string }) => {
  // Making a GET request to fetch all messages in a specific chat by chatId
  const res = await api.get(`/get_chat/${chatId}`);
  return res; // Returning the response from the API
};

// ==========================
// Send Message API Call
// ==========================
export const sendMessageApi = async (newMessage: MessageProps) => {
  // Making a POST request to send a new message to the server
  const res = await api.post("/chat", newMessage);
  return res; // Returning the response from the API
};

// ==========================
// Delete Messages API Call
// ==========================
export const deleteMessagesApi = async (chatId: string) => {
  // Making a DELETE request to delete all messages in a specific chat
  const res = await api.delete(`/messages/${chatId}`);
  return res; // Returning the response from the API
};
