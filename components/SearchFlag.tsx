"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const FeatureFlagList = () => {
  // Access the prefetched data from the cache
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(["hydrate-flags"]) as Record<
    string,
    any
  >;

  const featureFlagKeys = Object.keys(cachedData);
  const featureFlagValues = Array.from(Object.values(cachedData));
  const featureFlagValuesTypes = Object.values(cachedData).map(
    (value) => typeof value
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Filter flags based on search query
  const filteredFlags = featureFlagKeys.filter((flag) =>
    flag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("data", cachedData);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search flags..."
        className="border p-2 mb-4 w-full"
      />

      {/* Render Filtered Flags */}
      {filteredFlags.map((flag, i) => (
        <div key={flag} className="flex">
          <p>
            {flag} {`(${featureFlagValuesTypes[i]})`}{" "}
            {`values: ${featureFlagValues[i]})`}
          </p>
          <a href={`/edit/${flag}`} className="text-red-500 underline">
            {`Edit ${flag}`}
          </a>
        </div>
      ))}
    </div>
  );
};

export default FeatureFlagList;
