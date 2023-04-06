import { useState } from "react";
import "./quote.css";

const QuoteOneItem = (props) => {
  const [toggle, setToggle] = useState(true);

  const onClickToggle = (isMouseIn) => (e) => {
    setToggle(isMouseIn);
  };

  return (
    <button
      className="oneQuote my-4"
      onMouseEnter={onClickToggle(false)}
      onMouseOut={onClickToggle(true)}
    >
      {toggle ? (
        <div className="pokerQuote">{props.pokerQuote}</div>
      ) : (
        <div className="lifeQuote">{props.lifeQuote}</div>
      )}
    </button>
  );
};

export default QuoteOneItem;
