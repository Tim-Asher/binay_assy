import { useModal } from "../../contexts/ModalContext"; // Import useModal hook to manage modals
import { AuthModal } from "./AuthModal"; // Import the AuthModal component for user authentication
import { CiLogin, CiLogout } from "react-icons/ci"; // Import login and logout icons
import { useUser } from "../../contexts/UserContext"; // Import useUser hook to manage user state (authentication status)
import { DropdownMenu } from "../DropdownMenu"; // Import DropdownMenu component for displaying user actions
import { FaRegUserCircle } from "react-icons/fa"; // Import user icon
import { useNavigate } from "react-router-dom"; // Import useNavigate hook to handle navigation

export const UserButton = () => {
  const { openModal } = useModal(); // Extract openModal function from ModalContext
  const { user, logout } = useUser(); // Extract user and logout function from UserContext
  const navigate = useNavigate(); // Extract navigate function for navigation

  const actions = [
    // Define actions for the dropdown menu when the user is logged in
    {
      icon: <CiLogout size={20} />, // Logout icon
      text: "Logout", // Logout text
      onClick: () => {
        // Logout action
        logout(); // Log out the user
        navigate(`/`); // Navigate to the home page
      },
    },
  ];

  return (
    <div>
      {user ? ( // If user is logged in, show the dropdown menu
        <DropdownMenu
          actions={actions} // Pass actions to the DropdownMenu
          triggerComponent={
            // The component that triggers the dropdown menu
            <div className="rounded-xl p-2 text-white hover:cursor-pointer hover:bg-stone-600">
              <FaRegUserCircle size={20} /> {/* User icon */}
            </div>
          }
        />
      ) : (
        // If no user is logged in, show the login button
        <button
          className="rounded-xl p-2 text-white hover:cursor-pointer hover:bg-stone-600"
          onClick={() => {
            openModal(<AuthModal />); // Open the authentication modal when clicked
          }}
        >
          <CiLogin size={20} /> {/* Login icon */}
        </button>
      )}
    </div>
  );
};
