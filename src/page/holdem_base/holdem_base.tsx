import { useNavigate } from 'react-router-dom';
import PokerCalPage from '../poker_cal/PokerCalPage';
import QuotePage from '../quote/QuotePage';
import { HeaderTap } from '../../utils/header/header_tap';
import { useState } from 'react';
import PreFlopRangePage from '../pre_flop_range/PreFlopRangePage';
import HandRankPage from '../hand_rank/HandRankPage';
import { type } from 'os';
import HomePage from '../home/HomePage';
import HandRankings from './poker_hand_rankings/HandRankings';
type Section = {
  label: string;
};

function HoldemBase() {
  const tabs: Section[] = [
    {
      label: '핸드 순위',
    },
    {
      label: '프리플랍 핸드',
    },
    {
      label: '포커(족보) 랭킹',
    },
  ];
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  return (
    <div>
      <HeaderTap content={tabs} activeTab={setActiveHeaderTab} />
      <HoldemBaseSel sel={`${tabs[activeHeaderTab].label}`}></HoldemBaseSel>
    </div>
  );
}
type selProps = {
  sel: string;
};

export function HoldemBaseSel({ sel }: selProps): JSX.Element {
  console.log(sel);

  switch (sel) {
    case '핸드 순위':
      return <HandRankPage></HandRankPage>;

    case '프리플랍 핸드':
      return <PreFlopRangePage></PreFlopRangePage>;
    case '포커(족보) 랭킹':
      return <HandRankings></HandRankings>;

    default:
      return <div>페이지 없습니다</div>;
  }
}

export default HoldemBase;
