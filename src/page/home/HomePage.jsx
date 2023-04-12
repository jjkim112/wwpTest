import { useNavigate } from "react-router-dom";
import PokerCalPage from "../poker_cal/PokerCalPage";

function HomePage(props) {
  const {} = props;

  return (
    <div
      className="min-w-screen min-h-screen bg-red-800 flex-col justify-center items-center"
      style={{
        backgroundImage: `url("/assets/images/background.png")`,
        backgroundSize: "contain",
        backgroundPosition: "center center",
      }}
    >
      <HomeTitle />
      <BtnHandRank />
      <BtnPreFlopRange />
      <BtnQuote />
      <BtnPokerCalPage />
    </div>
  );
}

const HomeTitle = () => {
  return (
    <img
      className="w-4/5 mb-12 pt-12 mx-auto"
      src="/assets/images/wp_title.gif"
    />
  );
};
const BtnHandRank = () => {
  return <BasicBtn name="핸드 순위" route="/hand-range" />;
};
const BtnPreFlopRange = () => {
  return <BasicBtn name={"프리플랍 핸드 레인지"} route="/pre-flop-range" />;
};
const BtnQuote = () => {
  return <BasicBtn name="포커 명언" route="/quote" />;
};
const BtnPokerCalPage = () => {
  return <BasicBtn name="포커 계산기" route="/poker-cal" />;
};

const BasicBtn = (props) => {
  let navigate = useNavigate();
  const movePage = (route) => {
    navigate(route);
  };

  return (
    <button
      className="block hover:bg-red-200 shadow-xl rounded-full bg-white 
     border-2 border-gray-400 cursor-pointer px-4 py-2 mx-auto my-8"
      onClick={
        props.route != null
          ? () => {
              movePage(props.route);
            }
          : null
      }
    >
      {props.name ?? ""}
    </button>
  );
};

export default HomePage;
