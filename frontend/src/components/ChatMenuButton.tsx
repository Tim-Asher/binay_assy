import { MdDelete, MdEdit } from "react-icons/md"; // Import icons for editing and deleting
import { EditChat } from "./EditChat"; // Import the EditChat component for editing the chat
import { DropdownMenu } from "./DropdownMenu"; // Import DropdownMenu component for options
import { useModal } from "../contexts/ModalContext"; // Import useModal context to open modals
import { useMessages } from "../contexts/MessagesContext"; // Import useMessages context to manage messages
import { useChats } from "../contexts/ChatContext"; // Import useChats context to manage chats
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink for navigation and useLocation for path info
import { ChatProps } from "../Interfaces/interfaces"; // Import ChatProps interface
import { CiMenuKebab } from "react-icons/ci"; // Import kebab menu icon for dropdown

// Define ChatMenuButton component with props for a single chat and sidebar state
export const ChatMenuButton = ({
  chat,
  setIsSidebarOpen,
}: {
  chat: ChatProps;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deleteChat } = useChats(); // Get deleteChat function from ChatContext
  const { deleteAllMessages, setMessages } = useMessages(); // Get deleteAllMessages and setMessages from MessagesContext
  const { openModal } = useModal(); // Get openModal function from ModalContext
  const location = useLocation(); // Get the current location of the page
  const pathParts = location.pathname.split("/"); // Split the pathname to extract chatId
  const currentChatId = pathParts[1] === "chat" ? pathParts[2] : null; // Check if the current chatId matches the URL

  // Function to handle chat deletion with confirmation
  const handleDeleteChat = async (chatId: string) => {
    if (confirm("Are you sure you want to delete the chat ?")) {
      await deleteChat(chatId); // Delete the chat
      await deleteAllMessages(chatId); // Delete all messages associated with the chat
    }
  };

  // Define actions for the dropdown menu: Edit and Delete
  const actions = [
    {
      icon: <MdEdit size={20} />, // Edit icon
      text: "Edit", // Text for Edit action
      onClick: () => openModal(<EditChat chatId={chat._id} />), // Open the EditChat modal on click
    },
    {
      icon: <MdDelete size={20} />, // Delete icon
      text: "Delete", // Text for Delete action
      color: "#f93a37", // Red color for delete
      onClick: () => {
        handleDeleteChat(chat._id); // Handle deletion
        setMessages([]); // Clear messages after deletion
      },
    },
  ];

  return (
    <div key={chat?._id}>
      <div
        className={`mx-3 flex items-center justify-between rounded p-3 text-white hover:cursor-pointer hover:bg-stone-600 ${
          currentChatId === chat?._id ? "bg-stone-700" : "bg-stone-800"
        }`} // Set background color depending on whether the chat is the active one
      >
        <NavLink
          to={`/chat/${chat?._id}`} // Link to the chat page
          className="w-full"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking the chat
        >
          <p>{chat?.title}</p> {/* Display the chat title */}
        </NavLink>
        <DropdownMenu
          actions={actions} // Pass actions (Edit, Delete) to DropdownMenu
          triggerComponent={<CiMenuKebab size={20} className="rotate-90" />} // Kebab menu icon to trigger dropdown
        />
      </div>
    </div>
  );
};
