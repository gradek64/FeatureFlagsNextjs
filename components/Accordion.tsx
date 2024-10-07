"use client";

import { QueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

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

const AccordionForm = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const router = useRouter();
  const params = useParams();
  const queryClient = new QueryClient();
  const { id: paramString } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleAccordion = (accordionIndex) => {
    setActiveAccordion(
      activeAccordion === accordionIndex ? null : accordionIndex
    );
  };

  const handleSubmit = (e) => {
    console.log("paramString", paramString);
    e.preventDefault();
    // Update the cached data in React Query
    queryClient.setQueryData(["hydrate-flags"], (oldData: any) => {
      return { ...oldData, [paramString as string]: formData.name };
    });
    router.push("/");
    //setEditKey(null); // Close the modal or form after saving
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10">
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
            {/* Conditionally render form fields */}
            <InputField
              label="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
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
            {/* Conditionally render form fields */}
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
  );
};

export default AccordionForm;
