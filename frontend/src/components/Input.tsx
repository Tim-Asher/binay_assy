import React from "react";

// Input component that handles controlled input field with customizable properties
export const Input = ({
  value, // Current value of the input
  setValue, // Function to update the value of the input
  placeholder, // Placeholder text for the input
  ref = undefined, // Optional ref to focus on the input
  type = "text", // Input type, default is "text"
}: {
  value: string; // Value of the input
  setValue: React.Dispatch<React.SetStateAction<string>>; // Function to update the input value
  placeholder: string | undefined; // Placeholder text
  ref?: React.Ref<HTMLInputElement> | undefined; // Optional ref for the input
  type?: string; // Optional type for the input field (default is "text")
}) => {
  return (
    <input
      ref={ref} // Ref passed down for focusing input if needed
      type={type} // Input type (text, email, etc.)
      value={value} // Controlled value from parent state
      placeholder={placeholder} // Placeholder text
      className="w-full rounded border border-black p-3 text-black" // Tailwind classes for styling
      onInput={(e) => {
        setValue(e.currentTarget.value); // Updates the value in parent state when input changes
      }}
    />
  );
};
