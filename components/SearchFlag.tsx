"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const FeatureFlagList = () => {
  // Access the prefetched data from the cache
  const queryClient = useQueryClient();
  const config = queryClient.getQueryData(["hydrate-flags"]) as Record<
    string,
    any
  >;

  const [searchQuery, setSearchQuery] = useState("");

  // Get the main properties of the config object
  const configKeys = Object.keys(config);

  // Filter keys based on the search query
  const filteredKeys = configKeys.filter((key) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to render value with appropriate styling
  const renderValue = (value) => {
    if (typeof value === "boolean") {
      return <span className="text-green-600">{value.toString()}</span>;
    } else if (Array.isArray(value)) {
      // Check if the array contains objects with 'segments' and 'value'
      if (value.every((item) => item.segments && item.value)) {
        return (
          <pre className="bg-gray-200 p-2 rounded">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        );
      }
      return (
        <pre className="bg-gray-200 p-1 rounded">
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      );
    } else if (typeof value === "object") {
      return (
        <pre className="bg-gray-300 p-1 rounded">
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      );
    } else {
      return <span className="text-blue-600">{value}</span>;
    }
  };

  return (
    <div className="p-4">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search properties..."
        className="border p-2 mb-4 w-full"
      />

      {/* Render Filtered Properties */}
      {filteredKeys.map((key) => {
        const value = config[key];
        return (
          <div
            key={key}
            className="flex flex-col border-b border-gray-300 pb-2 mb-4"
          >
            <div className="flex justify-between items-center">
              <strong className="text-lg">{key}</strong>
              <a href={`/edit/${key}`} className="text-blue-500 underline">
                Edit
              </a>
            </div>
            <div className="mt-1">{renderValue(value)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureFlagList;
