// ==========================
// Chat-related Interfaces
// ==========================
export interface ChatProps {
  _id: string; // Unique identifier for the chat
  title: string; // Title of the chat
  user_id: string; // User ID of the chat creator or owner
  created_at?: string; // Optional field for the chat creation timestamp
  updated_at?: string; // Optional field for the chat last updated timestamp
}

export interface EditChatProps {
  chatId: string; // ID of the chat being edited
  title: string; // New title for the chat
  user_id: string; // User ID of the person making the change
}

export interface CreateChatProps {
  title: string; // Title of the new chat being created
}

// ==========================
// Message-related Interfaces
// ==========================
export interface MessageProps {
  chat_id?: string | undefined; // Optional ID of the chat this message belongs to
  is_bot: boolean; // Whether the message is from a bot or a user
  text: string; // Content of the message
  timestamp: string; // Time when the message was sent
  user_id?: string; // Optional ID of the user who sent the message
  _id: string; // Unique identifier for the message
}

export interface MessagesProps {
  chat_id: string; // ID of the chat containing these messages
  messages: MessageProps[]; // List of messages in the chat
}

// ==========================
// Message Context Interface
// ==========================
export interface MessageContextProps {
  messages: MessageProps[]; // Current list of messages
  setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>; // Function to update the messages
  fetchMessages: (chatId: string) => Promise<void>; // Function to fetch messages for a given chat ID
  sendMessage: (chatId: string | undefined, text: string) => Promise<void>; // Function to send a message to a chat
  deleteAllMessages: (chatId: string) => Promise<any>; // Function to delete all messages in a chat
}

// ==========================
// UI Component Interfaces
// ==========================
export interface MenuButtonProps {
  icon: React.ReactNode; // The icon to be displayed in the menu button
  text: string; // The text to be displayed in the button
  color?: string; // Optional custom color for the button
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Function to handle the button click event
}

export interface DropDownMenuProps {
  chatId: string; // ID of the chat related to the menu
  onDelete: (chatId: string, e: React.MouseEvent<HTMLButtonElement>) => void; // Function to handle the deletion of the chat
}

export interface DropdownAction {
  icon: React.ReactNode; // The icon to be displayed for the action
  text: string; // The text description of the action
  color?: string; // Optional custom color for the action
  onClick: () => void; // Function to handle the action when clicked
}

export interface DropDownMenuProps {
  actions: DropdownAction[]; // List of actions to be displayed in the dropdown menu
}

// ==========================
// User-related Interface
// ==========================
export interface UserProps {
  email: string; // Email of the user
  password: string; // Password of the user
}
