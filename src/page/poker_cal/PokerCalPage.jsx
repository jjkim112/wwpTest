import { useEffect, useState } from "react";
import basic from "../../utils/basic.json";
import { getFamilyFrom, getNumWhichWin } from "../../utils/poker_func";
import { json } from "react-router-dom";
import Card from "../../component/Card";

const posiCard = {
  sa: 0,
  s2: 1,
  s3: 2,
  s4: 3,
  s5: 4,
  s6: 5,
  s7: 6,
  s8: 7,
  s9: 8,
  st: 9,
  sj: 10,
  sq: 11,
  sk: 12,
  da: 13,
  d2: 14,
  d3: 15,
  d4: 16,
  d5: 17,
  d6: 18,
  d7: 19,
  d8: 20,
  d9: 21,
  dt: 22,
  dj: 23,
  dq: 24,
  dk: 25,
  ca: 26,
  c2: 27,
  c3: 28,
  c4: 29,
  c5: 30,
  c6: 31,
  c7: 32,
  c8: 33,
  c9: 34,
  ct: 35,
  cj: 36,
  cq: 37,
  ck: 38,
  ha: 39,
  h2: 40,
  h3: 41,
  h4: 42,
  h5: 43,
  h6: 44,
  h7: 45,
  h8: 46,
  h9: 47,
  ht: 48,
  hj: 49,
  hq: 50,
  hk: 51,
};
const wholeCard = [
  "sa",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "st",
  "sj",
  "sq",
  "sk",
  "da",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "dt",
  "dj",
  "dq",
  "dk",
  "ca",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ct",
  "cj",
  "cq",
  "ck",
  "ha",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h7",
  "h8",
  "h9",
  "ht",
  "hj",
  "hq",
  "..",
];
const isCard = (value) => {
  // c2, dt, ha, s9 : true,  s1, tt, eq : false
  if (
    value.length == 2 &&
    basic.shapeList.includes(value[0]) &&
    basic.numList.includes(value[1])
  ) {
    return true;
  }
  return false;
};

const cardLength = (communityCards) => {
  var len = 0;
  for (let index = 0; index < communityCards.length; index++) {
    if (isCard(communityCards[index])) {
      len++;
    }
  }
  return len;
};

const isRealHand = (hand) => {
  if (hand.length == 2) {
    if (isCard(hand[0]) && isCard(hand[1])) {
      return true;
    }
  }
  return false;
};
const getRealHands = (hands) => {
  return hands.filter((hand, _) => {
    return isRealHand(hand);
  });
};

const PokerCalPage = () => {
  const [clickedDiv, setClickedDiv] = useState(null);

  const [remainCards, setRemainCards] = useState(
    wholeCard.map((v, _) => {
      return {
        card: v,
      };
    })
  );
  const [selHands, setSelHands] = useState([
    ["", ""],
    ["s5", "da"],
    ["", ""],
    ["h5", "ha"],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["d2", "dk"],
  ]);
  const [ranks, setRanks] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [communityCards, setCommunityCards] = useState([
    "sk",
    "s2",
    "s3",
    "",
    "",
  ]);

  useEffect(() => {
    const realHands = getRealHands(selHands);
    if (realHands.length >= 2 && cardLength(communityCards) >= 3) {
      const list = getNumWhichWin(realHands, communityCards);
      const tempRanks = selHands.map((v, _) => {
        if (isRealHand(v)) {
          return list.pop();
        }
        return {};
      });
      console.log(tempRanks);
      setRanks(tempRanks);
    }
    // console.log(list);
    // const { rank, cards } = getFamilyFrom(
    //   ["s5", "da"],
    //   ["sk", "s2", "s3", "d4", "d7"]
    // );
    // console.log({ rank, cards });
  }, [communityCards, selHands]);

  return (
    <div className="flex flex-col items-center h-full">
      <div className="mx-auto text-center text-4xl my-4">
        포커 계산기 (n-way)
      </div>
      <div className="flex">
        <div className="grid grid-cols-5">
          <div></div>
          <OneSeat
            hand={selHands[0]}
            rank={ranks[0]}
            setClickedDiv={setClickedDiv}
          />
          <OneSeat
            hand={selHands[1]}
            rank={ranks[1]}
            setClickedDiv={setClickedDiv}
          />
          <OneSeat
            hand={selHands[2]}
            rank={ranks[2]}
            setClickedDiv={setClickedDiv}
          />
          <div></div>
          <OneSeat
            hand={selHands[3]}
            rank={ranks[3]}
            setClickedDiv={setClickedDiv}
          />
          <div className="col-span-3 row-span-2">
            <CardTable
              communityCards={communityCards}
              setCommunitCards={setCommunityCards}
              setClickedDiv={setClickedDiv}
            />
          </div>
          <OneSeat
            hand={selHands[4]}
            rank={ranks[4]}
            setClickedDiv={setClickedDiv}
          />
          <OneSeat
            hand={selHands[5]}
            rank={ranks[5]}
            setClickedDiv={setClickedDiv}
          />
          <OneSeat
            hand={selHands[6]}
            rank={ranks[6]}
            setClickedDiv={setClickedDiv}
          />
          <div></div>
          <OneSeat
            hand={selHands[7]}
            rank={ranks[7]}
            setClickedDiv={setClickedDiv}
          />
          <OneSeat
            hand={selHands[8]}
            rank={ranks[8]}
            setClickedDiv={setClickedDiv}
          />
          <OneSeat
            hand={selHands[9]}
            rank={ranks[9]}
            setClickedDiv={setClickedDiv}
          />
          <div></div>
        </div>

        <CardSelPart
          remainCards={remainCards}
          setRemainCards={setRemainCards}
        />
      </div>
    </div>
  );
};
const CardSelPart = ({ clickCardFunc, remainCards, setRemainCards }) => {
  return (
    <div className="flex">
      <div className="flex flex-col mr-2">
        {remainCards.slice(0, 13).map((v, i) => {
          return <PickCard card={v.card} />;
          // return <Card key={i} card={v.card} width="36px" />;
        })}
      </div>
      <div className="flex flex-col mr-2">
        {remainCards.slice(13, 26).map((v, i) => {
          return <PickCard card={v.card} />;
          // return <Card key={i} card={v.card} width="36px" />;
        })}
      </div>
      <div className="flex flex-col mr-2">
        {remainCards.slice(26, 39).map((v, i) => {
          return <PickCard card={v.card} />;
          // return <Card key={i} card={v.card} width="36px" />;
        })}
      </div>
      <div className="flex flex-col mr-2">
        {remainCards.slice(39, 52).map((v, i) => {
          return <PickCard card={v.card} />;
          // return <Card key={i} card={v.card} width="36px" />;
        })}
      </div>
    </div>
  );
};
const shapes = {
  s: "♠️",
  d: "♦️",
  c: "♣️",
  h: "♥️",
};
const numbers = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  t: "10",
  j: "J",
  q: "Q",
  k: "K",
  a: "A",
};
const PickCard = ({ card }) => {
  return (
    <div className="w-8 h-12 relative border-2 rounded-sm cursor-pointer">
      {isCard(card) ? (
        <>
          <div
            className={`absolute top-0 left-0 ${
              card[0] == "d" || card[0] == "h" ? "text-red-500" : null
            }`}
          >
            {shapes[card[0]]}
          </div>
          <div
            className={`absolute right-0 bottom-0 text-xl ${
              card[0] == "d" || card[0] == "h" ? "text-red-500" : null
            }`}
          >
            {numbers[card[1]]}
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-300">
            x
          </div>
        </>
      )}
    </div>
  );
};
const CardTable = ({ communityCards, setCommunitCards }) => {
  return (
    <div className="relative flex justify-center items-center top-1/2 -translate-y-1/2 gap-1">
      {communityCards.map((card, i) => {
        return <Card key={i} card={card} width="80px" height="120px" />;
      })}
    </div>
  );
};
const OneSeat = ({ hand, rank, setClickedDiv }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-24 mx-4 flex justify-center items-center rounded-xl">
        <div
          onClick={(event) => {
            setClickedDiv(event.target);
            const shape = "s";
            const num = "t";
            event.target.src = `/assets/images/card/${shape}${num}.png`;
            event.target.style.border = "1px solid red";
            event.target.style.border = "none";
          }}
        >
          <Card
            card={isRealHand(hand) ? hand[0] : ""}
            width="60px"
            height="90px"
          />
        </div>

        <div className="mx-1"></div>
        <Card
          card={isRealHand(hand) ? hand[1] : ""}
          width="60px"
          height="90px"
        />
      </div>
      <div className="w-36 h-12 bg-red-300 items-center flex flex-col">
        {Object.keys(rank).length == 0 ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <div>win: {rank.win}</div>
            <div>tie: {rank.tie}</div>
          </>
        )}
      </div>
    </div>
  );
};

const TypeSel = ({ selPosition, setSelPosition }) => {
  return <div className="flex justify-center gap-4"></div>;
};

const OneTypeBtn = ({ isSel, content, onClick }) => {
  return (
    <div
      className={
        isSel
          ? "block mx-2 bg-red-200 shadow-xl rounded-full border-2 border-gray-400 cursor-pointer px-2 py-1"
          : "block mx-2 hover:bg-red-200 shadow-xl rounded-full bg-white       border-2 border-gray-400 cursor-pointer px-2 py-1"
      }
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default PokerCalPage;
