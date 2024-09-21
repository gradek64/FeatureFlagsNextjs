"use client";

import React from "react";
import DynamicInput from "../components/DynamicInput";
import CheckboxList from "../components/CheckboxList";

const ComponentOne: React.FC<{ hasStringValue: boolean }> = ({
  hasStringValue,
}) => (
  <div className="border border-blue-500">
    <DynamicInput />
    {hasStringValue &&
      `is not boolean so has string value for the small component`}
  </div>
);
const ComponentTwo: React.FC<{ hasStringValue: boolean }> = ({
  hasStringValue,
}) => (
  <div className="border border-blue-500">
    <CheckboxList labels={["argos", "tu", "habitat"]} />
    {hasStringValue &&
      `is not boolean so has string value for the small component`}
  </div>
);
const ComponentThree: React.FC<{ hasStringValue: boolean }> = ({
  hasStringValue,
}) => (
  <div className="border border-blue-500">
    Content of Tab 3
    {hasStringValue &&
      `is not boolean so has string value for the small component`}
  </div>
);

//this component is the final with the value either string
const Default: React.FC<{ flagValueType: string | boolean }> = ({
  flagValueType,
}) => (
  <div className="border border-blue-500">
    `-----default value is {flagValueType}----`
  </div>
);

const TabsContent: React.FC<{ activeTab: number; flagValueType: string }> = ({
  activeTab,
  flagValueType,
}) => {
  console.log("flagValueType", flagValueType);

  // Render the component based on flagValueType so it will be either boolean|string component
  if (activeTab === 0) return `component of ${flagValueType}`;

  //this will be component that has multiple small components that most likely
  //will have initial checkbox to make them active and then value fo the small component
  //will be active or possible ot change once checkbox is active
  // as
  // [active]| brand argos|tu|habitat
  // [active]| input that validates email
  // small component if it is not boolean will has final value when above ticked conditions are met

  if (activeTab === 1)
    return (
      <>
        <ComponentOne hasStringValue={flagValueType !== "boolean"} />
        <ComponentTwo hasStringValue={flagValueType !== "boolean"} />
        <ComponentThree hasStringValue={flagValueType !== "boolean"} />
        {/* this is default value for the flag when above condition are not met*/}
        {flagValueType !== "boolean" && (
          <Default flagValueType={flagValueType} />
        )}
      </>
    );

  return null;
};

export default TabsContent;
