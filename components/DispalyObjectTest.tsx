"use client";

import React, { useState } from "react";

const ConfigDisplay = ({ config }) => {
  const [editingField, setEditingField] = useState(null);

  const handleEditClick = (field) => {
    setEditingField(field);
    // Add your edit logic here (e.g., show an input or a form to edit the value)
  };

  // Function to render nested objects or arrays with background and different colors based on types
  const renderNested = (value) => {
    if (Array.isArray(value)) {
      return (
        <pre className="bg-blue-100 text-blue-600 ml-4 p-2 rounded">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    } else if (typeof value === "object") {
      return (
        <pre className="bg-purple-100 text-purple-600 ml-4 p-2 rounded">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    } else if (typeof value === "boolean") {
      return (
        <span className={`ml-4 ${value ? "text-green-600" : "text-red-600"}`}>
          {value.toString()}
        </span>
      );
    } else if (typeof value === "string") {
      return <span className="ml-4 text-yellow-600">{value}</span>;
    } else {
      return <span className="ml-4">{value}</span>;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 bg-white shadow-lg rounded">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="mb-6">
            <div className="flex items-center">
              <strong className="text-xl">{key}: </strong>
              <button
                className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => handleEditClick(key)}
              >
                Edit
              </button>
            </div>
            <div className="ml-4">{renderNested(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example config object
const config = {
  dfpUrl: [{ id: 1 }, { id: 2 }, { id: 3 }],
  deliveryDisplayOrder: { value: ["order1", "order2"] },
  applePayMerchantId: "merchant.uk.co.argostest",
  mobileAdImage: "https://placehold.co/300x250",
  mobileAdUrl: "https://www.argos.co.uk",
  mobileAdAlt: "placeholder alt text",
  roktSandbox: true,
};

const App = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Config Object</h1>
      <ConfigDisplay config={config} />
    </div>
  );
};

export default App;
