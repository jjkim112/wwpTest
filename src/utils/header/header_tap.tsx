import React, { useState, useEffect } from 'react';

type Section = {
  label: string;
};

type HeaderTapProps = {
  content: Section[];
  activeTab: React.Dispatch<React.SetStateAction<number>>;
};

export const HeaderTap = ({ content, activeTab }: HeaderTapProps) => {
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  const handleClickTab = (index: number) => {
    activeTab(index);
    setActiveHeaderTab(index);
  };

  return (
    <div>
      {content ? (
        <div className="flex justify-center  text-gray-50 py-3 ">
          {content.map((tab, index) => (
            <button
              key={index}
              className={`mr-4 cursor-pointer ${
                activeHeaderTab === index
                  ? 'pb-1 border-b-2 border-blue-500'
                  : ''
              } text-center `}
              onClick={() => {
                handleClickTab(index);
              }}
            >
              <span className="text-lg font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
