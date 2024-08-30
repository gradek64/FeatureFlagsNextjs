import React, { useState } from 'react';

interface InputField {
  id: number;
  value: string;
}

const DynamicInput: React.FC = () => {
  const [inputFields, setInputFields] = useState<InputField[]>([
    { id: Date.now(), value: '' },
  ]);

  const handleInputChange = (id: number, value: string) => {
    setInputFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleAddInput = () => {
    setInputFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), value: '' },
    ]);
  };

  const handleRemoveInput = (id: number) => {
    setInputFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddInput();
    }
  };

  return (
    <div className="space-y-2">
      {inputFields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <input
            type="text"
            value={field.value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            onKeyPress={handleKeyPress}
            className="border border-gray-300 rounded-lg px-2 py-1 w-full"
          />
          {index === inputFields.length - 1 ? (
            <button
              type="button"
              onClick={handleAddInput}
              className="text-white bg-blue-500 px-2 py-1 rounded-lg"
            >
              +
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleRemoveInput(field.id)}
              className="text-white bg-red-500 px-2 py-1 rounded-lg"
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInput;
