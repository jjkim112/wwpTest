import { useNavigate } from 'react-router-dom';
import PokerCalPage from '../poker_cal/PokerCalPage';
import QuotePage from '../quote/QuotePage';

function HomePage() {
  return (
    <div
      className="min-w-screen min-h-screen bg-red-800 flex-col justify-center items-center"
      style={{
        backgroundImage: `url("/assets/images/background.png")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <HomeTitle />
      <QuotePage />
    </div>
  );
}

const HomeTitle = () => {
  return (
    <img
      className="w-4/5 mb-12 pt-12 mx-auto"
      src="/assets/images/wp_title.gif"
      alt=""
    />
  );
};
const BtnHandRank = () => {
  return <BasicBtn name="핸드 순위" route="/hand-range" />;
};
const BtnPreFlopRange = () => {
  return <BasicBtn name="프리플랍 핸드 레인지" route="/pre-flop-range" />;
};
const BtnQuote = () => {
  return <BasicBtn name="포커 명언" route="/quote" />;
};
const BtnPokerCalPage = () => {
  return <BasicBtn name="포커 계산기" route="/poker-cal" />;
};
type BasicBtnProps = {
  name: string;
  route: string;
};
const BasicBtn = ({ name, route }: BasicBtnProps) => {
  let navigate = useNavigate();
  const movePage = (route: string) => {
    navigate(route);
  };

  return (
    <button
      className="block hover:bg-red-200 shadow-xl rounded-full bg-white 
     border-2 border-gray-400 cursor-pointer px-4 py-2 mx-auto my-8"
      onClick={() => {
        movePage(route);
      }}
    >
      {name ?? ''}
    </button>
  );
};

export default HomePage;
