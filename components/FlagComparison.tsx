import React, { useState, useEffect } from "react";

// Define the type for the feature values
import { FeaturesValue } from "@/actions/types/fetchFlags";

// Props for the comparison component
interface FlagComparisonProps {
  flagName: string;
  beforeValue: FeaturesValue;
  afterValue: FeaturesValue;
}

const FlagComparison: React.FC<FlagComparisonProps> = ({
  flagName,
  beforeValue,
  afterValue,
}) => {
  // Handle comparison logic here
  const [changeType, setFlagChanged] = useState(false);

  useEffect(() => {
    JSON.stringify(beforeValue) !== JSON.stringify(afterValue)
      ? setFlagChanged(true)
      : setFlagChanged(false); // No change
  }, [beforeValue, afterValue]);

  return (
    <div className="comparison-container p-4 border rounded-md">
      <p className="text-red-500">- {JSON.stringify(beforeValue)}</p>
      <p className="text-green-500">+ {JSON.stringify(afterValue)}</p>
      {!changeType && <p className="text-gray-500">No changes made.</p>}
    </div>
  );
};

export default FlagComparison;
