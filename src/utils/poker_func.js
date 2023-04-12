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

const getFamilyFrom = (hands, communityCards) => {
  if (isNotCardsList(hands) || isNotCardsList(communityCards)) return "";

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

  const straightCards = getStraightCards(cards);
  // console.log(`[${isExist(straightCards) ? "o" : "x"}] straight`);

  const flushCards = getFlushCards(cards);
  // console.log(`[${isExist(flushCards) ? "o" : "x"}] flush`);

  //== Straight Flush ==//
  if (isExist(straightCards) && isExist(flushCards)) {
    const flagList = straightCards.filter((card, i) => {
      if (card[0] === straightCards[0][0]) return true;
      return false;
    });
    if (flagList.length == 5) {
      if (straightCards[0][1] === "a") {
        return {
          rank: FamilyRank.RoyalStraightFlush,
          cards: straightCards,
        };
      }
      return {
        rank: FamilyRank.StraightFlush,
        cards: straightCards,
      };
    }
  }

  //== Four Cards ==//
  const fourCards = getFourCards(cards);
  // console.log(`[${isExist(fourCards.length) ? "o" : "x"}] four cards`);

  if (isExist(fourCards)) {
    return {
      rank: FamilyRank.FourCard,
      cards: fourCards,
    };
  }

  //== Full House ==//
  const fullHouseCards = getFullHouseCards(cards);
  // console.log(`[${isExist(fullHouseCards) ? "o" : "x"}] full house`);

  if (isExist(fullHouseCards)) {
    return {
      rank: FamilyRank.FullHouse,
      cards: fullHouseCards,
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
  if (isExist(straightCards)) {
    return {
      rank: FamilyRank.Straight,
      cards: straightCards,
    };
  }

  //== Three Of A Kind ==//
  const threeOfAKindCards = getThreeOfAKindCards(cards);
  // console.log(`[${isExist(threeOfAKindCards) ? "o" : "x"}] three of a kind`);

  if (isExist(threeOfAKindCards)) {
    return {
      rank: FamilyRank.ThreeOfAKind,
      cards: threeOfAKindCards,
    };
  }

  //== Two Pair ==//
  const twoPairCards = getTwoPairCards(cards);
  // console.log(`[${isExist(twoPairCards) ? "o" : "x"}] two pair`);

  if (isExist(twoPairCards)) {
    return {
      rank: FamilyRank.TwoPair,
      cards: twoPairCards,
    };
  }

  //== One Pair ==//
  const onePairCards = getOnePairCards(cards);
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
const getOnePairCards = (sortedCards) => {
  const ranks = "23456789tjqka";
  const numberList = sortedCards.map((card, i) => card[1]);
  const valueCounts = numberList.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});

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
const getTwoPairCards = (sortedCards) => {
  const ranks = "23456789tjqka";
  const numberList = sortedCards.map((card, i) => card[1]);
  const valueCounts = numberList.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});

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
const getThreeOfAKindCards = (sortedCards) => {
  const numberList = sortedCards.map((card, i) => card[1]);
  const numberSetList = new Set(numberList);
  if (numberSetList.size > 5) {
    return [];
  }
  const valueCounts = numberList.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});

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
const getFullHouseCards = (sortedCards) => {
  const ranks = "23456789tjqka";
  const numberList = sortedCards.map((card, i) => card[1]);
  const numberSetList = new Set(numberList);
  if (numberSetList.size > 4) {
    return [];
  }
  const valueCounts = numberList.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
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
      const highThreeCards = sortedCards.filter((card) => {
        if (card[1] === sortedThreeNums[0]) return true;
        return false;
      });
      const lowThreeCards = sortedCards.filter((card) => {
        if (card[1] === sortedThreeNums[1]) return true;
        return false;
      });
      return [...highThreeCards, ...lowThreeCards].slice(0, 5);
    }
    // 1 set same 3 number
    else {
      const threeCards = sortedCards.filter((card) => {
        if (card[1] === threeNums[0]) return true;
        return false;
      });
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
          const pairCards = sortedCards.filter((card) => {
            if (card[1] === sortedPairNums[0]) return true;
            return false;
          });
          return [...threeCards, ...pairCards];
        }
        // 1 set same 2 number
        else if (pairNums.length == 1) {
          const pairCards = sortedCards.filter((card) => {
            if (card[1] === pairNums[0]) return true;
            return false;
          });
          return [...threeCards, ...pairCards];
        }
      }
    }
  }
  return [];
};

const getFourCards = (sortedCards) => {
  const numberList = sortedCards.map((card, i) => card[1]);
  const numberSetList = new Set(numberList);
  if (numberSetList.size > 4) {
    return [];
  }
  const valueCounts = numberList.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});

  if (Object.values(valueCounts).includes(4)) {
    const number = Object.keys(valueCounts).find(
      (key) => valueCounts[key] === 4
    );
    const fourCards = sortedCards.filter((card) => {
      if (card[1] === number) {
        return true;
      }
      return false;
    });
    let remainCard = 1; // four card
    const highCards = sortedCards.filter((card) => {
      if (card[1] === number) {
        return false;
      }
      if (remainCard > 0) {
        remainCard--;
        return true;
      }
      return false;
    });
    return [...fourCards, ...highCards];
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
const getStraightCards = (sortedCards) => {
  const ranks = "23456789tjqka";
  const numberSetList = new Set(sortedCards.map((card, i) => card[1]));
  if (numberSetList.size >= 5) {
    const numberList = Array.from(numberSetList);
    let straightNums = [];
    let straightCards = [];
    for (let i = 0; i < numberList.length - 4; i++) {
      if (numberList[i] === ranks[ranks.indexOf(numberList[i + 4]) + 4]) {
        straightNums = numberList.slice(i, i + 5);
        break;
      }
    }
    if (straightNums.length == 5) {
      let tempList = [];
      for (let i = 0; i < 5; i++) {
        const nowCards = sortedCards.filter((card, _) => {
          if (card[1] == straightNums[i]) return true;
          return false;
        });
        if (nowCards.length > 0) {
          tempList.push(nowCards[0]);
        }
      }

      if (tempList.length == 5) {
        straightCards = tempList;
      }
    }
    if (
      straightCards.length == 0 &&
      multipleInArray(numberList, ["a", "2", "3", "4", "5"])
    ) {
      straightCards = getBottomStraight(sortedCards);
    }
    return straightCards;
  }
  return [];
};
const getBottomStraight = (cards) => {
  const numList = cards.map((v, i) => v[1]);
  var indexList = [];

  if (numList.includes("a")) {
    indexList.push(numList.indexOf("a"));
  }
  if (numList.includes("2")) {
    indexList.push(numList.indexOf("2"));
  }
  if (numList.includes("3")) {
    indexList.push(numList.indexOf("3"));
  }
  if (numList.includes("4")) {
    indexList.push(numList.indexOf("4"));
  }
  if (numList.includes("5")) {
    indexList.push(numList.indexOf("5"));
  }
  if (indexList.length == 5) {
    return indexList.map((index, i) => cards[index]).reverse();
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
const getWinNumsFromOld = (hands, listCommunityCards) => {
  var tempList = [];

  for (let index = 0; index < listCommunityCards.length; index++) {
    tempList.push(getWinners(hands, listCommunityCards[index]));
  }
  return tempList;
};
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
        tempList[j].tie += winners[j];
      } else {
        tempList[j].win += winners[j];
      }
    }
  }
  return tempList.map((v, _) => {
    return {
      win:
        v.win == 0 ? 0 : ((100 * v.win) / listCommunityCards.length).toFixed(1),
      tie:
        v.tie == 0 ? 0 : ((100 * v.tie) / listCommunityCards.length).toFixed(1),
    };
  });
};

/**
 * input : hand 들의 리스트, 특정 커뮤니티 카드
 * output : 어떤 핸드가 이겼는지
 *          1. [1, 0, 0, 1, 0] (chop)
 *          2. [0, 1, 0, 0, 0]
 */
const getWinners = (hands, communityCards) => {
  const rankList = hands.map((v, i) => {
    const value = getFamilyFrom(v, communityCards);
    return {
      rank: value.rank,
      numbers: value.cards.map((card, _) => card[1]),
    };
  });
  const rank = [
    FamilyRank.High,
    FamilyRank.OnePair,
    FamilyRank.TwoPair,
    FamilyRank.ThreeOfAKind,
    FamilyRank.Straight,
    FamilyRank.Flush,
    FamilyRank.FullHouse,
    FamilyRank.FourCard,
    FamilyRank.StraightFlush,
    FamilyRank.RoyalStraightFlush,
  ];

  let maxRank = 0;
  const rankIndex = rankList.map((_, __) => 0);
  for (let index = 0; index < rankList.length; index++) {
    const iRank = rank.indexOf(rankList[index].rank);
    rankIndex[index] = iRank;
    if (iRank > maxRank) {
      maxRank = iRank;
    }
  }

  let maxData = [];
  for (let index = 0; index < rankIndex.length; index++) {
    if (rankIndex[index] === maxRank) {
      if (isSameOrHigh(rankList[index].numbers, maxData)) {
        maxData = rankList[index].numbers;
      } else {
        rankIndex[index] = 0;
      }
    }
  }

  return rankIndex.map((v, i) => {
    if (v === maxRank) return 1;
    return 0;
  });
};

const isSameOrHigh = (compareData, originData) => {
  const numberRanks = "23456789tjqka";
  if (originData.length == 0) return true;
  for (let i = 0; i < originData.length; i++) {
    if (
      numberRanks.indexOf(compareData[i]) < numberRanks.indexOf(originData[i])
    ) {
      return false;
    }
  }
  return true;
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
