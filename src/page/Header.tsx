import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderTap } from '../utils/header/header_tap';

type Section = {
  label: string;
  link: string;
};

type IntroductionTab = {
  label: string;
  mainLink?: string;
  content?: Section[];
};

const tabs: IntroductionTab[] = [
  {
    label: '홈',
    mainLink: '/',
    content: undefined,
  },
  {
    label: '홀덤 핸드 정보',
    mainLink: '/hand-range',
    content: [
      { label: '핸드순위', link: '/hand-range' },
      { label: '프리플랍 핸드', link: '/pre-flop-range' },
    ],
  },

  {
    label: 'Introduction3',
    mainLink: '/poker-cal',
    content: undefined,
  },
];
// function Header() {
//   let navigate = useNavigate();

//   return (
//     <header className="bg-black h-10">
//       <div className="flex justify-center">
//         <div className="text-gray-50 flex p-2 ">
//           <button className="mx-2" onClick={() => navigate('/')}>
//             홈
//           </button>
//           <button className="mx-2" onClick={() => navigate('/hand-range')}>
//             핸드순위
//           </button>
//           <button className="mx-2" onClick={() => navigate('/pre-flop-range')}>
//             프리플랍 핸드
//           </button>
//           <button className="mx-2" onClick={() => navigate('/poker-cal')}>
//             포커 확률 계산
//           </button>
//           <button className="mx-2" onClick={() => navigate('/')}>
//             포커 확률 계산
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
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
      {tabs[activeHeaderTab].content ? (
        <HeaderTap
          content={tabs[activeHeaderTab].content!}
          activeTab={activeHeaderTab}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
