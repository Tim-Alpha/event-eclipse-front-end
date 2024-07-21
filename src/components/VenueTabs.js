import React, { useState } from 'react';
import './VenueTabs.css';

const VenueTabs = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="venue-tabs">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`tab ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children.map((child) =>
          React.cloneElement(child, { isActive: child.props.name === activeTab })
        )}
      </div>
    </div>
  );
};

export default VenueTabs;
