import { useState } from "react";
import basic from "../../component/basic.json";
import Card from "../../component/Card";
import CardSetDialog from "../../component/CardSetDialog";
import handData from "./hand_data.json";

const HandRankInput = () => {
  var [isSuited, setIsSuited] = useState(false);

  var [modalOpen, setModalOpen] = useState(false);
  var [selCard, setSelCard] = useState(0);

  var [cards, setCards] = useState(["", ""]);

  var [rank, setRank] = useState(0);

  const isCard = (card) => {
    // c2, dt, ha, s9 : true,  s1, tt, eq : false
    if (
      card.length == 2 &&
      basic.shapeList.includes(card[0]) &&
      basic.numList.includes(card[1])
    ) {
      return true;
    }
    return false;
  };

  const clickCard = (index) => {
    setSelCard(index);
    setModalOpen(true);
  };

  const isPocket = () => {
    // pocket check
    var tempNum = "";
    var isPocket = false;
    for (let i = 0; i < cards.length; i++) {
      if (!isCard(cards[i])) break;
      const num = cards[i].charAt(1);

      if (tempNum == "") {
        tempNum = num;
      } else {
        if (tempNum === num) {
          isPocket = true;
          break;
        }
      }
    }
    return isPocket;
  };

  const getOriginCard = () => {
    const card = cards[selCard];
    if (!isCard(card)) {
      return "";
    }

    return card.charAt(1);
  };

  const setCardFunc = (cardNumber) => {
    setCards((prevCards) => {
      if (isCard(prevCards[1 - selCard])) {
        const otherNum = prevCards[1 - selCard].charAt(1);
        if (otherNum === cardNumber) {
          prevCards[0] = `s${cardNumber}`;
          prevCards[1] = `d${cardNumber}`;
          setIsSuited(false);
          updateRank(prevCards[0], prevCards[1]);
          return prevCards;
        }
      }

      if (selCard === 0) {
        prevCards[selCard] = `s${cardNumber}`;
      } else if (selCard == 1) {
        if (isSuited) {
          prevCards[selCard] = `s${cardNumber}`;
        } else {
          prevCards[selCard] = `d${cardNumber}`;
        }
      }

      updateRank(prevCards[0], prevCards[1], isSuited);
      return prevCards;
    });
  };

  const suitCardChange = (isSuitedValue) => {
    if (isPocket()) return;

    setIsSuited(isSuitedValue);
    setCards((prev) => {
      if (isSuitedValue) {
        prev[0] = isCard(prev[0]) ? `s${prev[0].charAt(1)}` : "";
        prev[1] = isCard(prev[1]) ? `s${prev[1].charAt(1)}` : "";
      } else {
        prev[0] = isCard(prev[0]) ? `s${prev[0].charAt(1)}` : "";
        prev[1] = isCard(prev[1]) ? `d${prev[1].charAt(1)}` : "";
      }
      updateRank(prev[0], prev[1]);

      return prev;
    });
  };

  const transToRealCardText = (value) => {
    var cardText = value;
    var numIndex1 = basic.numList.indexOf(cardText.charAt(0));
    var numIndex2 = basic.numList.indexOf(cardText.charAt(1));

    if (numIndex1 == 0) {
      numIndex1 = 13;
    }
    if (numIndex2 == 0) {
      numIndex2 = 13;
    }
    if (numIndex1 < numIndex2) {
      cardText = `${cardText.charAt(1)}${cardText.charAt(0)}${value.charAt(2)}`;
    }
    return cardText;
  };

  const updateRank = (card1, card2) => {
    if (isCard(card1) && isCard(card2)) {
      var cardsText = "";
      if (isPocket()) {
        const num = card1.charAt(1);
        cardsText = `${num}${num}p`;
      } else {
        cardsText = `${card1.charAt(1)}${card2.charAt(1)}${
          card1.charAt(0) === card2.charAt(0) ? "s" : "o"
        }`;
      }

      cardsText = transToRealCardText(cardsText);

      var percentage = "0";
      for (let i = 0; i < handData.length; i++) {
        if (handData[i].card === cardsText) {
          percentage = handData[i].sum;
          break;
        }
      }
      setRank(parseFloat(percentage).toFixed(2));
    }
  };

  return (
    <div>
      <div className="flex-col items-center">
        <div className="flex justify-center gap-2 mt-10">
          {cards.map((v, i) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => {
                  clickCard(i);
                }}
                key={i}
              >
                <Card card={v} />
              </div>
            );
          })}
        </div>
        <TypeSel isSuited={isSuited} setIsSuited={suitCardChange} />
        <ResultRank rank={rank} />
      </div>
      {modalOpen && (
        <CardSetDialog
          setCardFunc={setCardFunc}
          setModalOpen={setModalOpen}
          origin={getOriginCard()}
        />
      )}
    </div>
  );
};

const TypeSel = (props) => {
  return (
    <div className="flex justify-center py-2">
      <BasicBtn
        name="suited"
        isSel={props.isSuited ?? false}
        onClick={() => {
          props.setIsSuited(true);
        }}
      />
      <BasicBtn
        name="off-suit"
        isSel={!props.isSuited ?? false}
        onClick={() => {
          props.setIsSuited(false);
        }}
      />
    </div>
  );
};

const BasicBtn = (props) => {
  return (
    <button
      className={
        props.isSel
          ? "block mx-2 bg-blue-200 rounded-xl border-2 border-yellow-200 cursor-pointer px-2 py-1"
          : "block mx-2 hover:bg-blue-200 rounded-xl border-2 border-gray-100 cursor-pointer px-2 py-1"
      }
      onClick={props.onClick ?? null}
    >
      {props.name ?? ""}
    </button>
  );
};

const ResultRank = (props) => {
  return (
    <div className="flex justify-center text-2xl font-bold">
      상위 {props.rank} % 핸드
    </div>
  );
};

export default HandRankInput;
