"use client";
import { useAppContext } from "@/context/ContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Features as FeatureFlags } from "@/actions/types/fetchFlags"; // Import your types here
import Link from "next/link";

const FeatureFlagList = () => {
  // Access context
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure features is defined, providing an empty object as default
  const features = state.features || {};
  const configKeys = Object.keys(features) as Array<keyof FeatureFlags>;

  // Filter keys based on the search query
  const filteredKeys = configKeys.filter((key) =>
    (key as string).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to render value with appropriate styling
  const renderValue = (value: any) => {
    if (typeof value === "boolean") {
      return <span className="text-green-600">{value.toString()}</span>;
    } else if (Array.isArray(value)) {
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
        const value = features[key]; // Accessing the value directly from features
        return (
          <div
            key={key}
            className="flex flex-col border-b border-gray-300 pb-2 mb-4"
          >
            <div className="flex justify-between items-center">
              <strong className="text-lg">{key}</strong>
              <Link href={`/edit/${key}`} className="text-blue-500 underline">
                Edit
              </Link>
            </div>
            <div className="mt-1">{renderValue(value)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureFlagList;
