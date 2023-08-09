import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Section = {
  label: string;
  link: string;
};

type HeaderTapProps = {
  content: Section[];
  activeTab: number;
};

export const HeaderTap = ({ content, activeTab }: HeaderTapProps) => {
  let navigate = useNavigate();
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  const [preHeaderTab, setPreHeaderTab] = useState(0);
  const handleClickTab = (index: number) => {
    setActiveHeaderTab(index);
  };
  useEffect(() => {
    console.log(activeTab !== preHeaderTab);
    console.log(activeTab);
    console.log(preHeaderTab);
    setPreHeaderTab(activeTab);
    if (activeTab !== preHeaderTab) {
      setActiveHeaderTab(0);
    }
  }, [activeTab]);

  return (
    <div className="flex justify-center items-center  text-gray-50 py-3">
      {content.map((tab, index) => (
        <button
          key={index}
          className={`mr-4 cursor-pointer ${
            activeHeaderTab === index ? 'pb-1 border-b-2 border-blue-500' : ''
          } text-center`}
          onClick={() => {
            handleClickTab(index);
            navigate(tab.link);
          }}
        >
          <span className="text-lg font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
