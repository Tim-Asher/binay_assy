import React, { useState } from "react"; // React and useState hooks
import { Input } from "../Input"; // Input component for text fields
import { useUser } from "../../contexts/UserContext"; // Custom context for user authentication
import { useModal } from "../../contexts/ModalContext"; // Custom context for modal handling

export enum AuthMode { // Enum to define possible modes for authentication (login or register)
  LOGIN = "login",
  REGISTER = "register",
}

type Props = {
  // Props type for the AuthForm component
  mode: AuthMode; // Current mode (login or register)
  onSwitchMode: () => void; // Function to toggle between login and register modes
};

export const AuthForm = ({ mode, onSwitchMode }: Props) => {
  const { register, login } = useUser(); // Destructure register and login from the user context
  const { closeModal } = useModal(); // Close the modal after submission
  const [email, setEmail] = useState(""); // Local state to track email input
  const [password, setPassword] = useState(""); // Local state to track password input

  const isLogin = mode === AuthMode.LOGIN; // Determine if the form is in login mode

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for email validation

  const handleSubmit = () => {
    // Function to handle form submission
    if (!email || !emailRegex.test(email)) {
      // Validate email
      alert("Email must be provided and valid.");
      return;
    } else if (!password) {
      // Validate password
      alert("Password must be provided and valid.");
      return;
    }
    const newUser = { email, password }; // Create user object with email and password
    if (isLogin) {
      // If login mode is active, call the login function
      login(newUser);
      closeModal(); // Close the modal after login
    } else {
      // If register mode is active, call the register function
      register(newUser);
      onSwitchMode(); // Switch to login mode after registration
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle 'Enter' key press to submit the form
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xl font-bold">{isLogin ? "Log In" : "Register"}</p>{" "}
      {/* Display mode */}
      <div className="flex w-full flex-col gap-3" onKeyDown={handleKeyDown}>
        {" "}
        {/* Form layout */}
        <Input value={email} placeholder="Username" setValue={setEmail} />{" "}
        {/* Email input */}
        <Input
          value={password}
          placeholder="Password"
          setValue={setPassword}
          type="password" // Hide password input
        />
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleSubmit} // Trigger form submission
        >
          {isLogin ? "Log In" : "Register"}{" "}
          {/* Submit button text based on mode */}
        </button>
      </div>
      <div className="flex gap-1">
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button
          className="text-blue-800 hover:cursor-pointer"
          onClick={onSwitchMode} // Switch between login and register modes
        >
          {isLogin ? "Register" : "Log In"} {/* Toggle text */}
        </button>
      </div>
    </div>
  );
};
