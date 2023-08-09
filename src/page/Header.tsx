import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderTap } from '../utils/header/header_tap';

type IntroductionTab = {
  label: string;
  mainLink?: string;
};

const tabs: IntroductionTab[] = [
  {
    label: '홈',
    mainLink: '/',
  },
  {
    label: '홀덤 핸드 정보',
    mainLink: '/holdem-base',
  },

  {
    label: '포커 계산기',
    mainLink: '/poker-cal',
  },
];

export const Header = () => {
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  let navigate = useNavigate();
  const handleClickHeaderTab = (index: number) => {
    setActiveHeaderTab(index);
  };

  return (
    <div className="bg-slate-800">
      <div className="flex flex-col justify-center items-center bg-black pt-2 ">
        <div className="flex mb-4  text-gray-50  ">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`mr-4 cursor-pointer ${
                activeHeaderTab === index
                  ? 'pb-1 border-b-2 border-blue-500'
                  : ''
              } text-center`}
              onClick={() => {
                handleClickHeaderTab(index);
                navigate(tab.mainLink!);
              }}
            >
              <span className="text-lg font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
