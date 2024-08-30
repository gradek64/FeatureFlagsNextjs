'use client'

import React from 'react';
import DynamicInput from '../components/DynamicInput';
import CheckboxList from '../components/CheckboxList';



const ComponentOne: React.FC = () => <div><DynamicInput/></div>;
const ComponentTwo: React.FC = () => <div><CheckboxList labels={['argos', 'tu', 'habitat']} /></div>;
const ComponentThree: React.FC = () => <div>Content of Tab 3</div>;

const Default: React.FC = () => <div>Content of Tab 3</div>;

const TabsContent: React.FC<{ activeTab: number, flagValueType:string }> = ({ activeTab,flagValueType }) => {
  

    // Render the component based on the active tab
    switch (flagValueType) {
      case 'boolean':
        return activeTab === 0 ? <ComponentOne /> : null
      case 'string':
        return activeTab === 1 ? <ComponentTwo /> : null
      case 'number':
        return activeTab === 2 ? <ComponentThree /> : null
      default:
        return <Default />
    }
  };

export default TabsContent
