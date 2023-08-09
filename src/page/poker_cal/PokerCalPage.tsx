import { useContext, useEffect, useRef, useState } from 'react';
import basic from '../../utils/basic.json';
import { getResult } from '../../utils/poker_func';
import { json } from 'react-router-dom';
import Card from '../../component/Card';
import './style.css';
import CardSetDialog from './CardSetDialog';

const shapes: any = {
  s: '♠️',
  d: '♦️',
  c: '♣️',
  h: '♥️',
};

const numbers: any = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  t: '10',
  j: 'J',
  q: 'Q',
  k: 'K',
  a: 'A',
};
const wholeCard: any = [
  'sa',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
  's8',
  's9',
  'st',
  'sj',
  'sq',
  'sk',
  'da',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd9',
  'dt',
  'dj',
  'dq',
  'dk',
  'ca',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'c7',
  'c8',
  'c9',
  'ct',
  'cj',
  'cq',
  'ck',
  'ha',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h7',
  'h8',
  'h9',
  'ht',
  'hj',
  'hq',
  'hk',
];

class OnePlayer {
  hand: any;
  constructor(hand: any) {
    this.hand = hand;
  }
}
class detailInfo {
  hand: any;
  wins: any;
  ties: any;
  constructor(hand: any, wins: any, ties: any) {
    this.hand = hand;
    this.wins = wins;
    this.ties = ties;
  }
}

const isCard = (value: any) => {
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

const isRealHand = (hand: any) => {
  if (hand.length == 2) {
    if (isCard(hand[0]) && isCard(hand[1])) {
      return true;
    }
  }
  return false;
};
const getRealHands = (hands: any) => {
  return hands.filter((hand: any, _: any) => {
    return isRealHand(hand);
  });
};

let prevHash = '';
var setCardFunc = () => {}; // dialog props

const PokerCalPage = () => {
  const toCardHash = (cardArray: any) => {
    return cardArray.reduce((prev: any, curr: any) => {
      // TODO
      // card 값 serialization 하기. 저장하기.
      // 같은 가드 패들의 값이 들어오면, 저 함수를 돌리지마!
      return prev + curr;
    });
  };
  const [selPlayers, setSelPlayers] = useState([
    new OnePlayer(['s5', 'da']),
    new OnePlayer(['h5', 'ha']),
    new OnePlayer(['d2', 'dk']),
    new OnePlayer(['c2', 'ck']),
  ]);
  const [communityCards, setCommunityCards] = useState(['', '', '', '', '']);
  const [handDetails, setHandDetails] = useState([]);

  var [dialogOpen, setDialogOpen] = useState(false);
  var [pickCards, setPickCards] = useState([
    's5',
    'da',
    'h5',
    'ha',
    'd2',
    'dk',
    'c2',
    'ck',
  ]);

  var [dialogSelCard, setDialogSelCard] = useState('');

  var dialogInputSetFunc = (func: any) => {
    setCardFunc = func;
  };

  const getHandDetail = (hand: any) => {
    var v = new detailInfo(hand, 0, 0);
    const handDetailsListFlat = handDetails.map(
      (value: any, _: any) => value.hand
    );
    const playerHandStr = hand[0] + hand[1];
    if (handDetailsListFlat.includes(playerHandStr)) {
      const temp: any = handDetails[handDetailsListFlat.indexOf(playerHandStr)];
      v = new detailInfo(temp.hands, temp.wins, temp.ties);
    }
    return v;
  };

  const refreshHandDetails = () => {
    const realHands = getRealHands(selPlayers.map((v, i) => v.hand));
    // console.log("prev= " + prevHash);
    const cardSerialize = [
      ...realHands.reduce((p: any, c: any) => [...p, ...c]),
      ...communityCards,
    ];
    var process = 0;
    for (let index = 0; index < communityCards.length; index++) {
      const cardStr = communityCards[index];
      if (isCard(cardStr)) {
        process++;
      } else {
        break;
      }
    }
    if (!(process == 0 || process == 3 || process == 4 || process == 5)) {
      return;
    }
    for (let index = 0; index < process; index++) {
      if (!isCard(communityCards[index])) {
        return;
      }
    }

    // console.log(cardSerialize);
    // console.log(toCardHash(cardSerialize));
    if (toCardHash(cardSerialize) != prevHash) {
      prevHash = toCardHash(cardSerialize);
      // console.log("prev= " + prevHash);
      const list = getResult(realHands, communityCards);
      setHandDetails(
        list.map((v: any, i: any) => {
          return new detailInfo(v.hands, v.wins, v.ties);
        })
      );
    }
  };

  useEffect(() => {
    // refreshHandDetails(); // 이게 실행되고, useState가 업데이트 됨!!
    setTimeout(() => {
      refreshHandDetails();
    });
  }, [communityCards, selPlayers]);

  useEffect(() => {
    // console.log(selPlayers);
  }, [selPlayers]);

  useEffect(() => {
    // console.log(handDetails);
  }, [handDetails]);

  return (
    <div className="container mx-auto">
      <div className="top flex flex-col justify-center">
        <div className="text-center text-4xl my-4">포커 계산기</div>
        <div className="text-center text-2xl my-4">커뮤니티 카드</div>
        <CommunityCardPart
          communityCards={communityCards}
          clickFunc={(cardValue: any, cardIndex: any) => {
            setDialogSelCard(cardValue);
            dialogInputSetFunc((targetCard: any) => {
              var delCard = '';
              var addCard = '';
              if (targetCard == cardValue) {
                delCard = targetCard;
              } else {
                delCard = cardValue;
                addCard = targetCard;
              }

              setCommunityCards((prevCommunityCards) => {
                var temp = [...prevCommunityCards];
                if (targetCard == cardValue) {
                  temp[cardIndex] = '';
                } else {
                  temp[cardIndex] = targetCard;
                }
                return temp;
              });

              setPickCards((prevPickCards) => {
                var index = -1;
                if (delCard != '') {
                  index = prevPickCards.indexOf(delCard);
                  if (index > -1) {
                    prevPickCards.splice(index, 1);
                  }
                }
                index = -1;
                if (addCard != '') {
                  prevPickCards.push(addCard);
                }
                return prevPickCards;
              });
            });
            setDialogOpen(true);
          }}
        />
      </div>
      <div className="middle px-8">
        {selPlayers.map((v, i) => {
          const detail = getHandDetail(v.hand);
          return (
            <OnePlayerPart
              player={v}
              key={`${i}_${v.hand}`}
              detail={detail}
              clickFunc={(cardValue: any, handIndex: any) => {
                setDialogSelCard(cardValue);
                dialogInputSetFunc((targetCard: any) => {
                  var delCard = '';
                  var addCard = '';
                  if (targetCard == cardValue) {
                    delCard = targetCard;
                  } else {
                    delCard = cardValue;
                    addCard = targetCard;
                  }
                  setSelPlayers((prevPlayers) => {
                    var temp = [...prevPlayers];
                    if (targetCard == cardValue) {
                      temp[i].hand[handIndex] = '';
                    } else {
                      temp[i].hand[handIndex] = targetCard;
                    }
                    return temp;
                  });
                  setPickCards((prevPickCards) => {
                    var index = -1;
                    if (delCard != '') {
                      index = prevPickCards.indexOf(delCard);
                      if (index > -1) {
                        prevPickCards.splice(index, 1);
                      }
                    }
                    index = -1;
                    if (addCard != '') {
                      prevPickCards.push(addCard);
                    }
                    return prevPickCards;
                  });
                });
                setDialogOpen(true);
              }}
              delFunc={() => {
                console.log('del func');
                const card1 = selPlayers[i].hand[0];
                const card2 = selPlayers[i].hand[1];

                setSelPlayers((prevPlayers) => {
                  var temp = [...prevPlayers];
                  temp.splice(i, 1);
                  return temp;
                });
                setPickCards((prevPickCards) => {
                  var temp = [...prevPickCards];
                  var index = -1;
                  if (card1 != '') {
                    index = prevPickCards.indexOf(card1);
                    if (index > -1) {
                      prevPickCards.splice(index, 1);
                    }
                  }
                  if (card2 != '') {
                    index = prevPickCards.indexOf(card2);
                    if (index > -1) {
                      prevPickCards.splice(index, 1);
                    }
                  }
                  return temp;
                });
              }}
            />
          );
        })}
      </div>

      <div className="bottom">
        <ActionPart
          setSelPlayers={setSelPlayers}
          setCommunityCards={setCommunityCards}
        />
      </div>
      {dialogOpen && (
        <CardSetDialog
          cardSetFunc={setCardFunc}
          setDialogOpen={setDialogOpen}
          pickCards={pickCards}
          selCard={dialogSelCard}
        />
      )}
    </div>
  );
};

const CommunityCardPart = ({ communityCards, clickFunc }: any) => {
  return (
    <div className="flex">
      {communityCards.map((v: any, i: any) => {
        return (
          <div className="mx-2" key={`${v}_${i}`}>
            <OneCardDiv
              card={v}
              cardClickFunc={() => {
                clickFunc(v, i);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const ActionPart = ({ setSelPlayers, setCommunityCards }: any) => {
  return (
    <div className="flex">
      <div
        className="border-2 w-24 h-12"
        onClick={() => {
          setSelPlayers((prev: any) => {
            var temp = [...prev];
            temp.push(new OnePlayer(['', '']));
            return temp;
          });
        }}
      >
        추가
      </div>
      <div className="mx-8"></div>
      <div className="border-2 w-24 h-12">리셋</div>
    </div>
  );
};

const OnePlayerPart = ({ player, detail, clickFunc, delFunc }: any) => {
  return (
    <div className="flex items-center">
      <div className="w-36 mx-4 my-2 flex justify-center items-center rounded-xl">
        <OneCardDiv
          card={player.hand[0]}
          cardClickFunc={() => {
            clickFunc(player.hand[0], 0);
          }}
        />
        <div className="mx-1"></div>
        <OneCardDiv
          card={player.hand[1]}
          cardClickFunc={() => {
            clickFunc(player.hand[1], 1);
          }}
        />
      </div>
      <div className="w-36 h-12 bg-red-300 items-center flex flex-col">
        <div>win: {detail.wins}</div>
        <div>tie: {detail.ties}</div>
      </div>
      <div
        className="ml-4 border-2 border-black hover:cursor-pointer"
        onClick={delFunc}
      >
        삭제버튼
      </div>
    </div>
  );
};

const OneCardDiv = ({ card, cardClickFunc }: any) => {
  return (
    <div
      className="hover:cursor-pointer"
      onClick={(event) => {
        cardClickFunc();
        // setClickedDiv(event.target);
        // const shape = "s";
        // const num = "t";
        // event.target.src = `/assets/images/card/${shape}${num}.png`;
        // event.target.style.border = "1px solid red";
        // event.target.style.border = "none";
      }}
    >
      <Card card={isCard(card) ? card : ''} width="80px" height="120px" />
    </div>
  );
};

export default PokerCalPage;
