import React, { useState } from "react";
import PillSelector from "./PillsManager";

// Wrapper component that manages multiple sets of PillSelector
const PillManager: React.FC = () => {
  const [pillSets, setPillSets] = useState<number[]>([1]); // Start with one set

  const addPillSet = () => {
    setPillSets((prevState) => [...prevState, prevState.length + 1]);
  };

  const removePillSet = (id: number) => {
    setPillSets((prevState) => prevState.filter((setId) => setId !== id));
  };

  return (
    <div>
      {pillSets.map((id) => (
        <div key={id} style={{ marginBottom: "20px" }}>
          <PillSelector onRemove={() => removePillSet(id)} />
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div
          onClick={addPillSet}
          style={{
            border: "1px solid black",
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default PillManager;
