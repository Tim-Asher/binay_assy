import { createContext, useContext, useEffect, useState } from "react"; // React context, hooks, and state management

import { UserProps } from "../Interfaces/interfaces"; // Import user interface to define the user data structure
import { handleApiRequest } from "../utils/apiHandler"; // Utility function to handle API requests with error handling
import {
  loginApi,
  logoutApi,
  registerApi,
  validateTokenApi,
} from "../services/userServices"; // API calls for user authentication and registration

// ==========================
// Define UserContextProps type
// ==========================
interface UserContextProps {
  user: boolean; // User authentication status (logged in or not)
  setUser: React.Dispatch<React.SetStateAction<boolean>>; // Function to update user state
  login: ({ email, password }: UserProps) => Promise<any>; // Login function
  register: ({ email, password }: UserProps) => Promise<any>; // Register function
  logout: () => Promise<any>; // Logout function
}

// ==========================
// Create UserContext for managing user state and actions
// ==========================
const UserContext = createContext<UserContextProps | null>(null); // Default value is null

// ==========================
// UserProvider component to manage user authentication state
// ==========================
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<boolean>(false); // Manage the user state (true = logged in, false = logged out)

  // ==========================
  // Register function to create a new user
  // ==========================
  const register = ({ email, password }: UserProps) => {
    return handleApiRequest(async () => {
      await registerApi({ email, password }); // Call API to register user
      alert("User have been created."); // Alert on successful registration
    }, "Fail to register"); // Error handling
  };

  // ==========================
  // Login function to authenticate a user
  // ==========================
  const login = ({ email, password }: UserProps) => {
    return handleApiRequest(
      async () => {
        await loginApi({ email, password }); // Call API to login user
        setUser(true); // Set user state to true on successful login
      },
      "Fail to login", // Error message if login fails
      true, // Flag to trigger loading state
    );
  };

  // ==========================
  // Logout function to log the user out
  // ==========================
  const logout = () => {
    return handleApiRequest(async () => {
      await logoutApi(); // Call API to log the user out
      setUser(false); // Set user state to false on logout
    }, "Fail to logout"); // Error handling
  };

  // ==========================
  // Validate the user token on component mount
  // ==========================
  const validateToken = () => {
    return handleApiRequest(async () => {
      const res = await validateTokenApi(); // Call API to validate user token
      if (res.data.status === "success") {
        setUser(true); // Set user state to true if token is valid
      }
    }, "Fail to login"); // Error handling
  };

  // ==========================
  // Effect to validate the token on mount
  // ==========================
  useEffect(() => {
    validateToken(); // Validate token when the component mounts
  }, []);

  return (
    // ==========================
    // Provide UserContext to children
    // ==========================
    <UserContext.Provider value={{ user, setUser, register, login, logout }}>
      {children} {/* Render children components */}
    </UserContext.Provider>
  );
};

// ==========================
// Custom hook to access the UserContext
// ==========================
export const useUser = () => {
  const context = useContext(UserContext); // Get context value
  if (!context) throw new Error("useUser must be used within a UserProvider"); // Error if not used within UserProvider
  return context; // Return context value
};
