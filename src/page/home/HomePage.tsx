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
