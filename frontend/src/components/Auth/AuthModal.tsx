import { useState } from "react"; // Import useState hook from React
import { AuthForm, AuthMode } from "./AuthForm"; // Import AuthForm component and AuthMode enum

export const AuthModal = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN); // Local state to track the current authentication mode (login or register)

  const toggleMode = () =>
    // Function to toggle between login and register modes
    setMode(
      (
        prev, // Toggle the mode based on the current mode
      ) => (prev === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN), // Switch between AuthMode.LOGIN and AuthMode.REGISTER
    );

  return <AuthForm mode={mode} onSwitchMode={toggleMode} />; // Render the AuthForm component with mode and toggleMode as props
};
