import { ReactNode } from "react"; // Import ReactNode to type the children prop
import { ChatProvider } from "./ChatContext"; // Context provider for managing chat-related state
import { MessageProvider } from "./MessagesContext"; // Context provider for managing message-related state
import { ModalProvider } from "./ModalContext"; // Context provider for managing modal visibility and state
import { UserProvider } from "./UserContext"; // Context provider for managing user-related state

interface AppProviderProps {
  children: ReactNode; // Accepts React components or elements as children
}

// The AppProvider component wraps the entire application with multiple context providers
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserProvider>
      <ChatProvider>
        <MessageProvider>
          <ModalProvider>{children}</ModalProvider>
        </MessageProvider>
      </ChatProvider>
    </UserProvider>
  );
};
