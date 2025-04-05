import { TextareaAutosize } from "@mui/material"; // Import TextareaAutosize from MUI for dynamic text area resizing
import { useEffect, useRef, useState } from "react"; // Import hooks from React
import { IoMdSend } from "react-icons/io"; // Import send icon
import { useParams } from "react-router-dom"; // Import useParams hook to extract parameters from the URL
import { MessageProps } from "../Interfaces/interfaces"; // Import MessageProps interface
import { useMessages } from "../contexts/MessagesContext"; // Import useMessages context for managing messages
import { useUser } from "../contexts/UserContext"; // Import useUser context for user management

export const Chat = () => {
  const { messages, setMessages, sendMessage, fetchMessages } = useMessages(); // Extract messages and message-related functions from MessagesContext
  const { user } = useUser(); // Extract user information from UserContext
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling to the end of messages
  const [text, setText] = useState(""); // State to hold the current text input
  const [loading, setLoading] = useState(false); // State to manage loading state
  const { chatId } = useParams(); // Extract chatId from the URL parameters

  // Handle key events in the textarea (new line with Shift+Enter, send on Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.preventDefault();
        setText((prev) => prev + "\n"); // Add new line on Shift + Enter
      } else {
        e.preventDefault();
        handleSubmit(); // Submit message on Enter without Shift
      }
    }
  };

  // Handle the submission of the message
  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true);
      setText(""); // Clear the input field
      await sendMessage(chatId, text); // Send message
      setLoading(false); // Reset loading state
    }
  };

  // Fetch messages when chatId or user changes
  useEffect(() => {
    setMessages([]); // Clear previous messages
    if (chatId) {
      fetchMessages(chatId); // Fetch messages for the current chat
    }
  }, [chatId, user]); // Dependencies: chatId and user

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]); // Dependencies: messages

  return (
    <div className="h-svh w-full bg-stone-900">
      <div className="hidden-scrollbar h-5/6 overflow-y-scroll border-b">
        {messages.length > 0 ? ( // If there are messages, display them
          messages?.map((message: MessageProps) => (
            <div
              key={message._id}
              className={`flex p-3 ${message.is_bot ? "justify-start" : "justify-end"}`} // Align based on message sender
            >
              <div
                className={`max-w-[70%] rounded-t-xl border p-3 ${
                  message.is_bot
                    ? "rounded-r-xl border-gray-400"
                    : "rounded-l-xl border-blue-500"
                }`} // Style based on message sender (bot or user)
              >
                <p className="text-white">{message.text}</p>{" "}
                {/* Display message text */}
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-4xl font-bold text-white">
              Write Something For Me
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />{" "}
        {/* Reference for scrolling to the bottom */}
      </div>
      <div className="flex h-1/6 items-center justify-center">
        <div className="flex w-[80%] items-center justify-center rounded border border-white">
          <TextareaAutosize
            className="hidden-scrollbar w-full resize-none bg-transparent p-3 text-white focus:outline-0"
            maxRows={4}
            placeholder="Ask Gemini something..."
            value={text}
            onChange={(e) => setText(e.target.value)} // Update text state
            onKeyDown={handleKeyDown} // Handle key press for Enter/Shift+Enter
          />
          <button
            className="border-l pr-3 pl-3 text-3xl text-white hover:cursor-pointer"
            onClick={handleSubmit} // Trigger handleSubmit on click
          >
            <IoMdSend /> {/* Send icon */}
          </button>
        </div>
      </div>
    </div>
  );
};
