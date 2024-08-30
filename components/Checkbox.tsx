import React, { ChangeEvent, useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange, label }) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
      />
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};

export default Checkbox;
