import basic from "./basic.json";

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
const isNotCardsList = (cards) => {
  var flag = false;
  for (let index = 0; index < cards.length; index++) {
    if (!isCard(cards[index])) {
      flag = true;
      break;
    }
  }

  return flag;
};
const multipleInArray = (arr, values) => {
  return values.every((value) => {
    return arr.includes(value);
  });
};
const removeItemOnce = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const getFamilyFrom = (hands, communityCards) => {
  //if (isNotCardsList(hands) || isNotCardsList(communityCards)) return "";

  const { rank, cards } = calculatePokerRank([...hands, ...communityCards]);

  return { rank, cards };
};

const isExist = (cards) => {
  try {
    return cards.length > 0;
  } catch (e) {
    console.log(e);
  }
  return false;
};
/**
 * get 7 cards and return rank and 5 cards
 * { rank: ??, cards: ?? }
 */
const calculatePokerRank = (getCards) => {
  const ranks = "23456789tjqka";
  const cards = getCards.sort(
    (a, b) => ranks.indexOf(b[1]) - ranks.indexOf(a[1])
  );
  const numbers = getCards.map((card, _) => card[1]);

  const valueCounts = numbers.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});

  const straightNumbers = getStraightCards(numbers);
  // console.log(`[${isExist(straightCards) ? "o" : "x"}] straight`);

  const flushCards = getFlushCards(cards);
  // console.log(`[${isExist(flushCards) ? "o" : "x"}] flush`);

  //== Straight Flush ==//
  if (isExist(straightNumbers) && isExist(flushCards)) {
    // TODO 몇개 없으니깐 일단 넘겨봐.
    return;
    const flagList = straightNumbers.filter((card, i) => {
      if (card[0] === straightNumbers[0][0]) return true;
      return false;
    });
    if (flagList.length == 5) {
      if (straightNumbers[0][1] === "a") {
        return {
          rank: FamilyRank.RoyalStraightFlush,
          cards: straightNumbers,
        };
      }
      return {
        rank: FamilyRank.StraightFlush,
        cards: straightNumbers,
      };
    }
  }

  //== Four Cards ==//
  const fourNumbers = getFourCards(numbers, valueCounts);
  // console.log(`[${isExist(fourCards.length) ? "o" : "x"}] four cards`);

  if (isExist(fourNumbers)) {
    return {
      rank: FamilyRank.FourCard,
      cards: fourNumbers.map((num, _) => {
        const card = cards.find((c) => c[1] == num);
        removeItemOnce(cards, card);
        return card;
      }),
    };
  }

  //== Full House ==//
  const fullHouseNumbers = getFullHouseCards(valueCounts);
  // console.log(`[${isExist(fullHouseCards) ? "o" : "x"}] full house`);

  if (isExist(fullHouseNumbers)) {
    return {
      rank: FamilyRank.FullHouse,
      cards: fullHouseNumbers.map((num, _) => {
        const card = cards.find((card) => card[1] === num);
        removeItemOnce(cards, card);
        return card;
      }),
    };
  }

  //== Flush ==//
  if (isExist(flushCards)) {
    return {
      rank: FamilyRank.Flush,
      cards: flushCards,
    };
  }

  //== Straight ==//
  if (isExist(straightNumbers)) {
    return {
      rank: FamilyRank.Straight,
      cards: straightNumbers.map((num) => {
        return cards.find((card) => card[1] === num);
      }),
    };
  }

  //== Three Of A Kind ==//
  const threeOfAKindCards = getThreeOfAKindCards(cards, valueCounts);
  // console.log(`[${isExist(threeOfAKindCards) ? "o" : "x"}] three of a kind`);

  if (isExist(threeOfAKindCards)) {
    return {
      rank: FamilyRank.ThreeOfAKind,
      cards: threeOfAKindCards,
    };
  }

  //== Two Pair ==//
  const twoPairCards = getTwoPairCards(cards, valueCounts);
  // console.log(`[${isExist(twoPairCards) ? "o" : "x"}] two pair`);

  if (isExist(twoPairCards)) {
    return {
      rank: FamilyRank.TwoPair,
      cards: twoPairCards,
    };
  }

  //== One Pair ==//
  const onePairCards = getOnePairCards(cards, valueCounts);
  // console.log(`[${isExist(onePairCards) ? "o" : "x"}] one pair`);

  if (isExist(onePairCards)) {
    return {
      rank: FamilyRank.OnePair,
      cards: onePairCards,
    };
  }

  return {
    rank: FamilyRank.highCards,
    cards: cards.slice(0, 5),
  };
};

/**
 * 포카드, 풀하우스, 트리플, 투페어 는 이 함수에 들어오지 않음!
 */
const getOnePairCards = (sortedCards, valueCounts) => {
  const ranks = "23456789tjqka";
  const numberList = sortedCards.map((card, i) => card[1]);

  // is there same 2 number
  if (Object.values(valueCounts).find((value) => value == 2)) {
    let pairNums = [];
    for (let index = 0; index < Object.keys(valueCounts).length; index++) {
      if (valueCounts[Object.keys(valueCounts)[index]] == 2) {
        pairNums.push(Object.keys(valueCounts)[index]);
      }
    }
    if (pairNums.length == 1) {
      const pairCards = sortedCards.filter((card, i) => {
        if (card[1] === pairNums[0]) return true;
        return false;
      });
      let remainNum = 3;
      const highCards = sortedCards.filter((card, i) => {
        if (card[1] === pairNums[0]) return false;
        if (remainNum > 0) {
          remainNum--;
          return true;
        }
        return false;
      });
      return [...pairCards, ...highCards];
    }
  }
  return [];
};

/**
 * 포카드, 풀하우스, 트리플 은 이 함수에 들어오지 않음!
 */
const getTwoPairCards = (sortedCards, valueCounts) => {
  const ranks = "23456789tjqka";
  const numberList = sortedCards.map((card, i) => card[1]);

  // is there same 2 number
  if (Object.values(valueCounts).find((value) => value == 2)) {
    let pairNums = [];
    for (let index = 0; index < Object.keys(valueCounts).length; index++) {
      if (valueCounts[Object.keys(valueCounts)[index]] == 2) {
        pairNums.push(Object.keys(valueCounts)[index]);
      }
    }
    if (pairNums.length >= 2) {
      const sortedPairNums = pairNums.sort(
        (a, b) => ranks.indexOf(b) - ranks.indexOf(a)
      );
      const firstPairCards = sortedCards.filter((card, i) => {
        if (card[1] === sortedPairNums[0]) return true;
        return false;
      });
      const secondPairCards = sortedCards.filter((card, i) => {
        if (card[1] === sortedPairNums[1]) return true;
        return false;
      });
      let remainNum = 1;
      const highCards = sortedCards.filter((card, i) => {
        if (card[1] === sortedPairNums[0] || card[1] === sortedPairNums[1])
          return false;
        if (remainNum > 0) {
          remainNum--;
          return true;
        }
        return false;
      });
      return [...firstPairCards, ...secondPairCards, ...highCards];
    }
  }
  return [];
};

/**
 * 포카드, 풀하우스는 이 함수에 들어오지 않음!
 */
const getThreeOfAKindCards = (sortedCards, valueCounts) => {
  const numberList = sortedCards.map((card, i) => card[1]);
  if (valueCounts.length > 5) {
    return [];
  }

  // is there same 3 number
  if (Object.values(valueCounts).find((value) => value == 3)) {
    const number =
      Object.keys(valueCounts)[Object.values(valueCounts).indexOf(3)];
    const threeCards = sortedCards.filter((card, i) => {
      if (card[1] === number) return true;
      return false;
    });
    let remainCard = 2;
    const highCards = sortedCards.filter((card, i) => {
      if (card[1] === number) return false;
      if (remainCard > 0) {
        remainCard--;
        return true;
      }
      return false;
    });
    return [...threeCards, ...highCards];
  }
  return [];
};

/**
 * 포카드는 이 함수에 들어오지 않음!
 */
const getFullHouseCards = (valueCounts) => {
  const ranks = "23456789tjqka";
  if (valueCounts.length > 4) {
    return [];
  }
  // is there same 3 number
  if (Object.values(valueCounts).find((value) => value == 3)) {
    let threeNums = [];
    for (let index = 0; index < Object.keys(valueCounts).length; index++) {
      if (valueCounts[Object.keys(valueCounts)[index]] == 3) {
        threeNums.push(Object.keys(valueCounts)[index]);
      }
    }

    // 2 set same 3 number
    if (threeNums.length == 2) {
      const sortedThreeNums = threeNums.sort(
        (a, b) => ranks.indexOf(b) - ranks.indexOf(a)
      );
      return [
        sortedThreeNums[0],
        sortedThreeNums[0],
        sortedThreeNums[0],
        sortedThreeNums[1],
        sortedThreeNums[1],
      ];
    }
    // 1 set same 3 number
    else {
      // find other pairs
      if (Object.values(valueCounts).find((value) => value == 2)) {
        let pairNums = [];
        for (let index = 0; index < Object.keys(valueCounts).length; index++) {
          if (valueCounts[Object.keys(valueCounts)[index]] == 2) {
            pairNums.push(Object.keys(valueCounts)[index]);
          }
        }
        // 2 set same 2 number
        if (pairNums.length == 2) {
          const sortedPairNums = pairNums.sort(
            (a, b) => ranks.indexOf(b) - ranks.indexOf(a)
          );
          return [
            threeNums[0],
            threeNums[0],
            threeNums[0],
            sortedPairNums[0],
            sortedPairNums[0],
          ];
        }
        // 1 set same 2 number
        else if (pairNums.length == 1) {
          return [
            threeNums[0],
            threeNums[0],
            threeNums[0],
            pairNums[0],
            pairNums[0],
          ];
        }
      }
    }
  }
  return [];
};

const getFourCards = (numbers, valueCounts) => {
  if (valueCounts.length > 4) {
    return [];
  }

  if (Object.values(valueCounts).includes(4)) {
    const number = Object.keys(valueCounts).find(
      (key) => valueCounts[key] === 4
    );
    const highNumber = numbers.find((n) => n !== number);
    return [number, number, number, number, highNumber];
  }
  return [];
};

const getFlushCards = (sortedCards) => {
  const suitedShapeCard = sortedCards.find(
    (card) => sortedCards.filter((sCard) => sCard[0] === card[0]).length >= 5
  );

  if (suitedShapeCard) {
    return sortedCards
      .filter((card) => card[0] === suitedShapeCard[0])
      .slice(0, 5);
  }
  return [];
};
const getStraightCards = (numbers) => {
  const ranks = "23456789tjqka";
  const numberSetList = new Set(numbers.map((card, i) => card[1]));
  if (numberSetList.size >= 5) {
    const numberList = Array.from(numberSetList);
    let straightNums = [];
    for (let i = 0; i < numberList.length - 4; i++) {
      if (numberList[i] === ranks[ranks.indexOf(numberList[i + 4]) + 4]) {
        straightNums = numberList.slice(i, i + 5);
        break;
      }
    }
    if (
      straightNums.length == 0 &&
      multipleInArray(numberList, ["a", "2", "3", "4", "5"])
    ) {
      straightNums = ["5", "4", "3", "2", "a"];
    }
    return straightNums;
  }
  return [];
};

/**
 * hands : [['sa','sk'], ['ha','hk'], ['da','dk'], ['ca','ck']]
 * communityCards : ['d2','d3','d4','','']
 */
const getNumWhichWin = (hands, communityCards) => {
  var winList = [];

  if (cardLength(communityCards) == 5) {
    winList = getWinNumsFrom(hands, [communityCards]);
  } else {
    const potentialCommunityCards = getPotentialCommunityCards(
      hands,
      communityCards
    );
    console.log("* getPotentialCommunityCards Length!*");
    console.log(potentialCommunityCards.length);
    const time = Date.now();
    winList = getWinNumsFrom(hands, potentialCommunityCards);
    console.log("== time ==");
    console.log(`${(Date.now() - time) / 1000}s`);
  }

  return winList;
};

const getWholeCard = () => {
  var cardList = [];
  for (let index = 0; index < basic.numList.length; index++) {
    const num = basic.numList[index];
    for (
      let shapeIndex = 0;
      shapeIndex < basic.shapeList.length;
      shapeIndex++
    ) {
      cardList.push(`${basic.shapeList[shapeIndex]}${num}`);
    }
  }
  return cardList;
};

const getPotentialCommunityCards = (hands, communityCards) => {
  var cardList = getWholeCard();

  var remainCards = cardList.filter((card) => {
    // check in communityCards
    if (communityCards.includes(card)) {
      return false;
    }
    // check in someone's hand
    for (let index = 0; index < hands.length; index++) {
      const oneHand = hands[index];
      if (oneHand.includes(card)) {
        return false;
      }
    }
    return true;
  });

  const realCommunitCards = transRealCards(communityCards);
  const remainCardNum = 5 - realCommunitCards.length;
  const remainCardPushList = getNCardsEnable(remainCards, remainCardNum);

  return remainCardPushList.map((cards, i) => {
    return [...realCommunitCards, ...cards];
  });
};
/**
 * communit cards 같이 빈 카드가 있을 수 있을때, 그거 지워줌.
 */
const transRealCards = (cards) => {
  const list = cards.filter((card) => {
    if (isCard(card)) return true;
    return false;
  });
  return list;
};

/**
 * input : 가능한 모든 카드 리스트 (cards), 골라야 하는 카드 수 (n)
 * output : 나올 수 있는 모든 n 콤보들의 list
 */
const getNCardsEnable = (cards, n) => {
  const combinations = [];

  function pickCards(start, pickedCards) {
    if (pickedCards.length === n) {
      combinations.push(pickedCards);
      return;
    }

    for (let i = start; i < cards.length; i++) {
      pickCards(i + 1, [...pickedCards, cards[i]]);
    }
  }

  pickCards(0, []);

  return combinations;
};

/**
 * input : ['sa','s2','h3', '', ''] 커뮤니티 카드 정보
 * output : 실제 카드 숫자
 */
const cardLength = (communityCards) => {
  var len = 0;
  for (let index = 0; index < communityCards.length; index++) {
    if (isCard(communityCards[index])) {
      len++;
    }
  }
  return len;
};

/**
 * input : hand 들의 리스트, 커뮤니티 카드 리스트
 * output : 커뮤니티 카드 리스트 길이의 {어떤 핸드가 이겼는지}
 *          [
 *            [1, 0, 0, 1, 0], (chop)
 *            [0, 1, 0, 0, 0],
 *            ....
 *          ]
 */
const getWinNumsFrom = (hands, listCommunityCards) => {
  var tempList = hands.map((v, i) => {
    return {
      win: 0,
      tie: 0,
    };
  });

  for (let index = 0; index < listCommunityCards.length; index++) {
    const winners = getWinners(hands, listCommunityCards[index]);
    const winnersList = winners.filter((v, i) => {
      if (v == 1) return true;
      return false;
    });
    for (let j = 0; j < tempList.length; j++) {
      if (winnersList.length > 1) {
        tempList[j].tie += winners[0];
      } else {
        tempList[j].win += winners[0];
      }
    }
  }
  return tempList;
};

/**
 * input : hand 들의 리스트, 특정 커뮤니티 카드
 * output : 어떤 핸드가 이겼는지
 *          1. [1, 0, 0, 1, 0] (chop)
 *          2. [0, 1, 0, 0, 0]
 */
const getWinners = (hands, communityCards) => {
  const rankList = hands.map((v, i) => {
    return getFamilyFrom(v, communityCards);
  });
  // << TODO >>
  // rank 비교후. 반환
  // [ 1, 0, 1 ] (비길경우)
  // [ 1, 0, 0 ]
  return hands.map((v, i) => 1);
};

/**
 * 족보 순위
 */
const FamilyRank = {
  High: "High",
  OnePair: "OnePair",
  TwoPair: "TwoPair",
  ThreeOfAKind: "ThreeOfAKind",
  Straight: "Straight",
  Flush: "Flush",
  FullHouse: "FullHouse",
  FourCard: "FourCard",
  StraightFlush: "StraightFlush",
  RoyalStraightFlush: "RoyalStraightFlush",
};

export { getFamilyFrom, getNumWhichWin };
