'use client'

import React, { useState } from 'react';

interface TabsProps {
  tabs: {
    label: string;
    component: React.ReactNode;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);


  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default Tabs;
