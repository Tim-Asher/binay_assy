import { useEffect, useRef, useState } from "react"; // Import hooks from React
import { MenuButtonProps, DropdownAction } from "../Interfaces/interfaces"; // Import types for button props and actions

// MenuButton component renders a button with an icon, text, and optional color
const MenuButton = ({
  icon,
  text,
  color = "white",
  onClick,
}: MenuButtonProps) => {
  return (
    <button
      style={{ color }} // Apply color style to the button
      className="flex items-center justify-start gap-2 rounded-md px-3 py-1 hover:cursor-pointer hover:bg-stone-500"
      onClick={onClick} // Trigger onClick function passed as a prop
    >
      {icon} {/* Render icon */}
      <p className="font-semibold">{text}</p> {/* Render text */}
    </button>
  );
};

// Define DropdownMenu component, accepting actions and triggerComponent as props
type DropdownMenuProps = {
  actions: DropdownAction[]; // List of actions with icon, text, color, and onClick
  triggerComponent: React.ReactNode; // Pass a custom trigger component (button or icon)
};

export const DropdownMenu = ({
  actions,
  triggerComponent,
}: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null); // Reference to the menu to detect clicks outside
  const [isOpen, setIsOpen] = useState(false); // State to track if the dropdown menu is open or closed

  // Toggle the dropdown menu when clicked
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle closing the dropdown when clicking outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the menu if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Listen for mouse clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className="relative flex" ref={menuRef}>
      {" "}
      {/* Dropdown wrapper with relative positioning */}
      <button onClick={handleClick} className="text-white hover:cursor-pointer">
        {" "}
        {/* Trigger button */}
        {triggerComponent}{" "}
        {/* Render custom trigger component passed as a prop */}
      </button>
      {isOpen && ( // Render menu only if isOpen state is true
        <div
          className={`absolute top-5 left-0 z-10 flex flex-col gap-1 rounded-xl bg-stone-700 p-3`}
        >
          {actions.map(
            (
              action,
              index, // Map through actions and create MenuButton for each
            ) => (
              <MenuButton
                key={index} // Assign key for each button in the list
                icon={action.icon} // Icon for the button
                text={action.text} // Text for the button
                color={action.color || "white"} // Default color is white, if not provided
                onClick={() => {
                  // Trigger action on button click
                  action.onClick(); // Execute the action's onClick function
                  setIsOpen(false); // Close the menu after action is executed
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};
