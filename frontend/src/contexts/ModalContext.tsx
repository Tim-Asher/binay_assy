import { createContext, ReactNode, useContext, useRef, useState } from "react"; // React context, hooks, and types for managing modal state

// ==========================
// Define ModalContextProps type
// ==========================
type ModalContextProps = {
  openModal: (content: React.ReactNode) => void; // Function to open the modal with content
  closeModal: () => void; // Function to close the modal
};

// ==========================
// Create ModalContext to provide modal state and actions
// ==========================
const ModalContext = createContext<ModalContextProps | undefined>(undefined); // Default value is undefined

// ==========================
// Custom hook to access the modal context
// ==========================
export const useModal = () => {
  const context = useContext(ModalContext); // Get context value
  if (!context) throw new Error("useModal must be used within ModalProvider.");
  return context; // Return context value if available
};

// ==========================
// ModalProvider component to wrap application with modal context
// ==========================
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null); // Store modal content
  const modalRef = useRef<HTMLDivElement>(null); // Ref to the modal element for potential future use (e.g., for animations or direct DOM manipulation)
  const [isOpen, setIsOpen] = useState(false); // Manage modal open/close state

  // ==========================
  // Function to open the modal with content
  // ==========================
  const openModal = (component: ReactNode) => {
    setContent(component); // Set modal content
    setIsOpen(true); // Open modal
  };

  // ==========================
  // Function to close the modal
  // ==========================
  const closeModal = () => {
    setIsOpen(false); // Close modal
    setContent(null); // Clear modal content
  };

  // ==========================
  // Handle click outside the modal to close it (overlay click)
  // ==========================
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal(); // Close modal if the overlay (background) is clicked
    }
  };

  return (
    // ==========================
    // Provide ModalContext to children
    // ==========================
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children} {/* Render children components */}
      {/* Render the modal if it's open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" // Modal overlay styling
          onClick={handleOverlayClick} // Close modal if overlay is clicked
        >
          <div
            ref={modalRef} // Attach ref to the modal element
            className="relative w-md max-w-[80%] rounded-lg bg-white p-6 shadow-lg" // Modal styling
          >
            <button
              className="absolute top-2 right-2 text-black hover:cursor-pointer" // Close button styling
              onClick={closeModal} // Close modal on click
            >
              ✕
            </button>
            {content} {/* Render modal content */}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
