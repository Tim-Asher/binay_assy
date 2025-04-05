import React, { useEffect, useRef, useState } from "react"; // Import hooks from React
import { ChatProps } from "../Interfaces/interfaces"; // Import ChatProps type
import { useChats } from "../contexts/ChatContext"; // Import the useChats hook to manage chat data
import { useModal } from "../contexts/ModalContext"; // Import useModal hook to manage modal state
import { Input } from "./Input"; // Import custom Input component

// EditChat component to edit the title of a chat
export const EditChat = ({ chatId }: { chatId: string }) => {
  const { chats, updateChat } = useChats(); // Get chats data and the update function from context
  const { closeModal } = useModal(); // Get closeModal function to close the modal
  const inputRef = useRef<HTMLInputElement>(null); // Reference to focus on input field when modal opens

  const [chat, setChat] = useState<ChatProps | undefined>(undefined); // State to store the current chat data

  // Handle keydown event to submit the form when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(); // Trigger handleSubmit when Enter is pressed
    }
  };

  // Submit the new title and close the modal
  const handleSubmit = () => {
    handleEditChat(newTitle, chatId); // Call handleEditChat to update the chat title
    closeModal(); // Close the modal after submission
  };

  // Function to update chat title by sending a request to update the chat
  const handleEditChat = async (title: string, user_id: string) => {
    await updateChat({ chatId, title, user_id }); // Update the chat with new title
  };

  // Focus on the input field when the modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on input when modal is shown
    }
  }, []); // Runs only once when modal is opened

  // Set the current chat data based on chatId
  useEffect(() => {
    setChat(
      chats.find((chat) => chat._id === chatId), // Find the chat with matching chatId
    );
  }, []); // Runs only once when component is mounted

  const [newTitle, setNewTitle] = useState(""); // State to hold the new chat title

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold text-black">Change chat title</h2>
      <div className="flex w-full flex-col" onKeyDown={handleKeyDown}>
        {/* Input field to change chat title */}
        <Input
          ref={inputRef}
          value={newTitle}
          setValue={setNewTitle}
          placeholder={chat?.title} // Default placeholder is the current chat title
        />
        {/* Button to save the new title */}
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleSubmit} // Save the new title when clicked
        >
          Save
        </button>
      </div>
    </div>
  );
};
