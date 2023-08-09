import { useState } from 'react';
import './quote.css';
type QuoteOneItemProps = {
  pokerQuote: string;
  lifeQuote: string;
};
const QuoteOneItem = ({ pokerQuote, lifeQuote }: QuoteOneItemProps) => {
  const [toggle, setToggle] = useState(true);

  const onClickToggle = (isMouseIn: boolean) => (e: any) => {
    setToggle(isMouseIn);
  };

  return (
    <button
      className="oneQuote my-4"
      onMouseEnter={onClickToggle(false)}
      onMouseOut={onClickToggle(true)}
    >
      {toggle ? (
        <div className="pokerQuote">{pokerQuote}</div>
      ) : (
        <div className="lifeQuote">{lifeQuote}</div>
      )}
    </button>
  );
};

export default QuoteOneItem;
