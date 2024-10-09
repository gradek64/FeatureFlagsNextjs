"use client";

import React, { createContext, useContext, useState } from "react";

// Define the shape of the context state
interface MyContextType {
  data: string;
  setData: (value: string) => void;
}

// Create the context with default values
const MyContext = createContext<MyContextType | undefined>(undefined);

// Create a provider component
export function MyContextProvider({
  children,
  initialData,
}: {
  children: any;
  initialData: any;
}) {
  const [data, setData] = useState<string>("Initial Data");

  console.log("gewtetetgetg", initialData);

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}

// Custom hook for consuming the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
