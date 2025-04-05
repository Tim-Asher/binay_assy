import { useEffect, useState } from "react";
import { LuSquarePen } from "react-icons/lu"; // Icon for creating a new chat
import { useLocation, useNavigate } from "react-router-dom";
import { useChats } from "../contexts/ChatContext"; // Custom hook to access chat data
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon for mobile view
import { UserButton } from "./Auth/UserButton"; // Custom button for user authentication
import { ChatMenuButton } from "./ChatMenuButton"; // Button component to manage individual chats
import { useUser } from "../contexts/UserContext"; // Custom hook to access user data

// Sidebar component
export const SideBar = () => {
  const { chats, createChat } = useChats(); // Extract chats and createChat function
  const { user } = useUser(); // Extract user data
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get the current location (URL)

  // Extract current chat ID from the URL
  const pathParts = location.pathname.split("/");
  const currentChatId = pathParts[1] === "chat" ? pathParts[2] : null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  // Function to create a new chat
  const handleCreateChat = async () => {
    if (!user) {
      alert("Must log in to create chat and have history!");
      return;
    }
    const data = await createChat({ title: "New Chat" }); // Create a new chat with a default title
    navigate(`/chat/${data.chat._id}`); // Navigate to the newly created chat
  };

  // Effect to handle chat navigation or fallback
  useEffect(() => {
    if (chats.length > 0) {
      // If a chat is selected, navigate to the selected chat or the first chat
      if (currentChatId && !chats.some((chat) => chat?._id === currentChatId)) {
        navigate(`/chat/${chats[0]?._id}`);
      }
    } else {
      navigate("/"); // If no chats, navigate to the home page
    }
  }, [chats, currentChatId]); // Dependency array to re-run when chats or currentChatId change

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="absolute top-2 left-2 rounded-xl p-3 text-white hover:cursor-pointer hover:bg-stone-600 md:hidden"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-svh min-w-64 transform border-r bg-stone-950 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:block md:w-1/3 md:max-w-72 md:translate-x-0`}
      >
        <div className="flex justify-between p-3">
          {/* Button to create a new chat */}
          <button
            className="rounded-xl p-2 text-white hover:cursor-pointer hover:bg-stone-600"
            onClick={handleCreateChat}
          >
            <LuSquarePen size={20} />
          </button>
          {/* User button for authentication */}
          <UserButton />
        </div>

        <div className="flex flex-col gap-2 py-3">
          {/* Display list of chats */}
          {chats?.map((chat) => (
            <ChatMenuButton chat={chat} setIsSidebarOpen={setIsSidebarOpen} />
          ))}
        </div>
      </div>
    </>
  );
};
