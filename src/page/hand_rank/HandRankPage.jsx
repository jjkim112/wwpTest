import { useState } from "react";
import HandRankInput from "./HandRankInput";
import HandRankSlider from "./HandRankSlider";

const HandRankPage = () => {
  var [isInput, setIsInput] = useState(true);

  return (
    <div className="flex-col">
      <TopBar isInput={isInput} setIsInput={setIsInput} />
      {isInput ? <HandRankInput /> : <HandRankSlider />}
    </div>
  );
};

const TopBar = (props) => {
  return (
    <header className="flex justify-center py-2">
      <BasicBtn
        name="Hand 입력"
        isSel={props.isInput ?? false}
        onClick={() => {
          props.setIsInput(true);
        }}
      />
      <BasicBtn
        name="Hand 상위%"
        isSel={!props.isInput ?? false}
        onClick={() => {
          props.setIsInput(false);
        }}
      />
    </header>
  );
};

const BasicBtn = (props) => {
  return (
    <button
      className={
        props.isSel
          ? "block mx-2 bg-red-200 shadow-xl rounded-full border-2 border-gray-400 cursor-pointer px-2 py-1"
          : "block mx-2 hover:bg-red-200 shadow-xl rounded-full bg-white       border-2 border-gray-400 cursor-pointer px-2 py-1"
      }
      onClick={props.onClick ?? null}
    >
      {props.name ?? ""}
    </button>
  );
};

export default HandRankPage;
