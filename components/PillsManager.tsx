import React, { useState } from "react";
import CheckboxList from "./CheckboxList";
import DynamicInput from "./DynamicInput";

// Map pills to corresponding components
const componentMap: Record<string, React.FC> = {
  brand: () => <CheckboxList labels={["argos", "tu", "habitat"]} />,
  user: () => <DynamicInput />,
};

// Pill options
const pillOptions = [
  { label: "brand", value: "brand" },
  { label: "user", value: "user" },
];

// Individual PillSelector component (for a single set)
const PillSelector: React.FC<{ onRemove: () => void }> = ({ onRemove }) => {
  const [addedComponents, setAddedComponents] = useState<
    { id: number; type: string }[]
  >([]);
  let componentId = addedComponents.length + 1;

  const addComponent = (componentType: string) => {
    setAddedComponents((prevState) => [
      ...prevState,
      { id: componentId++, type: componentType },
    ]);
  };

  const removeComponent = (componentId: number) => {
    setAddedComponents((prevState) =>
      prevState.filter((component) => component.id !== componentId)
    );
  };

  return (
    <div
      style={{
        border: "1px solid pink",
      }}
    >
      {/* Remove this PillSelector */}
      <button
        onClick={onRemove}
        style={{
          border: "1px solid",
          float: "right",
        }}
      >
        -
      </button>
      {/* Render the pills for this specific set */}
      <div
        style={{
          backgroundColor: "grey",
        }}
      >
        {pillOptions.map((pill) => (
          <div
            key={pill.value}
            style={{
              display: "inline-block", // Change to inline-block
              padding: "5px 10px", // Adjust padding for appearance
              border: "1px solid black",
              borderRadius: "20px",
              cursor: "pointer",
              backgroundColor: "green",
              margin: "10px",
              whiteSpace: "nowrap", // Prevent text wrapping
            }}
            onClick={() => addComponent(pill.value)}
          >
            {pill.label}
          </div>
        ))}
      </div>

      {/* Render the dynamically added components */}
      {addedComponents.map((component) => (
        <div
          style={{
            position: "relative",
            padding: "10px",
            border: "1px solid black",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {/* Button for Removing the Component */}
          <button
            onClick={() => removeComponent(component.id)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#f44336", // Red background
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display: "block", // Ensures the button occupies its own line
            }}
          >
            &times;
          </button>

          {/* Ensure the content below appears after the button */}
          <div style={{ marginTop: "40px" }}>
            {" "}
            {/* Adjust margin to push content below the button */}
            {React.createElement(componentMap[component.type])}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PillSelector;
