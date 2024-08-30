import React, { useState } from 'react';
import Checkbox from './Checkbox';

interface CheckboxListProps {
  labels: string[];
}

const CheckboxList: React.FC<CheckboxListProps> = ({ labels }) => {
  // Create a state object to manage the checked state of each checkbox
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
    labels.reduce((acc, label) => ({ ...acc, [label]: true }), {})
  );

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setCheckedStates(prevState => ({
      ...prevState,
      [label]: checked
    }));

    console.log('checkedStates',checkedStates)
  };

  return (
    <div className="space-y-4">
      {labels.map(label => (
        <Checkbox
          key={label}
          label={label}
          checked={checkedStates[label]}
          onChange={(checked) => handleCheckboxChange(label, checked)}
        />
      ))}
    </div>
  );
};

export default CheckboxList;
