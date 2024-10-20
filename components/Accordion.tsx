"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppContext } from "@/context/ContextProvider";
import FlagComparison from "@/components/FlagComparison"; // Import the comparison component
import PillsWrapper from "@/components/PillsWrapper"; // Import the comparison component

const InputField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
    />
  </div>
);

const AccordionForm = ({ editFlag }: { editFlag: string }) => {
  const { state, dispatch } = useAppContext();
  const { features } = state;

  // Get the current feature flag value from the state
  const currentFlagValue = features?.[editFlag];

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false); // State to control the visibility of the comparison module
  const [UpdatedFlagValue, setUpdatedFlagValue] = useState(currentFlagValue); // State to control the visibility of the comparison module
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleInputChange = (field: string, value: string) => {
    //setFormData({ ...formData, [field]: value });
  };

  const toggleAccordion = (accordionIndex: number) => {
    setActiveAccordion(
      activeAccordion === accordionIndex ? null : accordionIndex
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    /* e.preventDefault();

    //set update value from sub components as users
    // setUpdatedFlagValue([{ flag: 1 }]);
    setUpdatedFlagValue(true);

    // Show the comparison module
    setShowComparison(true); */
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {!showComparison && (
        <form onSubmit={handleSubmit}>
          {/* Accordion for flag editing */}
          <h3>Editing: {editFlag}</h3>

          {/* Accordion 1 */}
          <div className="border-b">
            <button
              type="button"
              onClick={() => toggleAccordion(1)}
              className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200"
            >
              <div className="flex justify-between items-center">
                <span>Section 1: Personal Info</span>
                <span>{activeAccordion === 1 ? "-" : "+"}</span>
              </div>
            </button>
            {activeAccordion === 1 && (
              <div className="px-6 py-4 bg-white">
                <PillsWrapper />
                <InputField
                  label="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Accordion 2 */}
          <div className="border-b">
            <button
              type="button"
              onClick={() => toggleAccordion(2)}
              className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200"
            >
              <div className="flex justify-between items-center">
                <span>Section 2: Contact Info</span>
                <span>{activeAccordion === 2 ? "-" : "+"}</span>
              </div>
            </button>
            {activeAccordion === 2 && (
              <div className="px-6 py-4 bg-white">
                <InputField
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Show comparison module after form submission */}
      {showComparison && (
        <div className="mt-6">
          <FlagComparison
            flagName={editFlag}
            beforeValue={currentFlagValue}
            afterValue={UpdatedFlagValue} // Example of new value after editing
          />

          {/* Submit button for API call */}
          {/* currentFlagValue !== UpdatedFlagValue && (
            <button
              onClick={() => {}}
              className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit Changes
            </button>
          ) */}
        </div>
      )}
    </div>
  );
};

export default AccordionForm;
