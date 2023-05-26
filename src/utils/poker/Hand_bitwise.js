const bitwise = require("bitwise");

const Category = {
  HIGH_CARD: 0n,
  PAIR: 1n,
  TWO_PAIR: 2n,
  THREE_OF_A_KIND: 3n,
  STRAIGHT: 4n,
  FLUSH: 5n,
  FULLHOUSE: 6n,
  FOUR_OF_A_KIND: 7n,
  STRAIGHT_FLUSH: 8n,
};
const numTo64Array = (value) => {
  const real = value
    .toString(2)
    .split("")
    .map((v, _) => parseInt(v));
  let temp = [];
  for (let index = 0; index < 64 - real.length; index++) {
    temp.push(0);
  }

  return [...temp, ...real];
};
const numTo28Array = (value) => {
  const real = value
    .toString(2)
    .split("")
    .map((v, _) => parseInt(v));
  let temp = [];
  for (let index = 0; index < 28 - real.length; index++) {
    temp.push(0);
  }

  return [...temp, ...real];
};

const andSumArray = (arrays) => {
  return arrays.reduce((prev, curr) => {
    return bitwise.bits.and(prev, curr);
  });
};

const orSumArray = (arrays) => {
  return arrays.reduce((prev, curr) => {
    return bitwise.bits.or(prev, curr);
  });
};
const rightShift = (array, i) => {
  let zeroFilterArray = [];
  for (let index = 0; index < i; index++) {
    zeroFilterArray.push(0);
  }
  for (let index = 0; index < array.length - i; index++) {
    zeroFilterArray.push(1);
  }
  return bitwise.bits.and(
    bitwise.bits.circularShiftRight(array, i),
    zeroFilterArray
  );
};
const leftShift = (array, i) => {
  let zeroFilterArray = [];
  for (let index = 0; index < array.length - i; index++) {
    zeroFilterArray.push(1);
  }
  for (let index = 0; index < i; index++) {
    zeroFilterArray.push(0);
  }
  return bitwise.bits.and(
    bitwise.bits.circularShiftLeft(array, i),
    zeroFilterArray
  );
};
const isSameBit = (array1, array2) => {
  return bitwise.buffer.xor(array1, array2).every((bit) => bit == 0);
};

const getBitCount = (array) => {
  return array.reduce((acc, cur) => acc + cur, 0);
};

const basic = [
  0, 0, 0, 0 /* 16===========================================================*/,
  0, 0, 0, 0 /* 15===========================================================*/,
  0, 0, 0, 0 /* 14===========================================================*/,
  0, 0, 0, 0 /* 13===========================================================*/,
  0, 0, 0, 0 /* 12===========================================================*/,
  0, 0, 0, 0 /* 11===========================================================*/,
  0, 0, 0, 0 /* 10===========================================================*/,
  0, 0, 0, 0 /* 9============================================================*/,
  0, 0, 0, 0 /* 8============================================================*/,
  0, 0, 0, 0 /* 7============================================================*/,
  0, 0, 0, 0 /* 6============================================================*/,
  0, 0, 0, 0 /* 5============================================================*/,
  0, 0, 0, 0 /* 4============================================================*/,
  0, 0, 0, 0 /* 3============================================================*/,
  0, 0, 0, 0 /* 2============================================================*/,
  0, 0, 0, 0 /* 1============================================================*/,
];

const oneMask = [
  0, 0, 0, 0 /* 16===========================================================*/,
  0, 0, 0, 0 /* 15===========================================================*/,
  0, 0, 0, 0 /* 14===========================================================*/,
  0, 0, 0, 0 /* 13===========================================================*/,
  0, 0, 0, 0 /* 12===========================================================*/,
  0, 0, 0, 0 /* 11===========================================================*/,
  0, 0, 0, 0 /* 10===========================================================*/,
  0, 0, 0, 0 /* 9============================================================*/,
  0, 0, 0, 0 /* 8============================================================*/,
  0, 0, 0, 0 /* 7============================================================*/,
  0, 0, 0, 0 /* 6============================================================*/,
  0, 0, 0, 0 /* 5============================================================*/,
  0, 0, 0, 0 /* 4============================================================*/,
  0, 0, 0, 0 /* 3============================================================*/,
  0, 0, 0, 0 /* 2============================================================*/,
  0, 0, 0, 1 /* 1============================================================*/,
];

class Hand {
  static STRAIGHT_FLUSH_MASK = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
  ];
  static ACE_LOW_STRAIGHT_FLUSH_MASK = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  ];
  static SUIT_MASK = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
  ];

  static RANK_MASK = 0xfn;

  static HIGH_CARD = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static PAIR = [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static TWO_PAIR = [
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static THREE_OF_A_KIND = [
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static STRAIGHT = [
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static FLUSH = [
    0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static FULLHOUSE = [
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static FOUR_OF_A_KIND = [
    0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static STRAIGHT_FLUSH = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];
  static ACE_LOW_STRAIGHT = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1,
    1, 1, 0,
  ];

  // 우측에서부터 비트 체크해서 처음으로 나오게 되는 1의 위치를 반환
  // 0일때는 -1 반환
  static nextSetBit(array, fromIndex) {
    for (let index = fromIndex; index < array.length; index++) {
      if (array[array.length - index - 1] != 0) {
        return index;
      }
    }
    return -1;
  }

  static encodeRanks(rankArray, n) {
    let value = [];
    for (let index = 0; index < 28; index++) {
      value.push(0);
    }

    for (
      let i = Hand.nextSetBit(rankArray, 0), c = 0;
      i >= 0 && c < n;
      i = Hand.nextSetBit(rankArray, i + 1), c++
    ) {
      value = leftShift(value, 4);
      value = orSumArray([value, numTo28Array(14 - Math.floor(i / 4))]);
    }

    return value;
  }

  static fastEval(intValue) {
    let cardArray = intValue;

    // let spades = bitwise.bits.and(cardArray, Hand.SUIT_MASK);
    // let hearts = bitwise.bits.and(rightShift(cardArray, 1), Hand.SUIT_MASK);
    // let diamonds = bitwise.bits.and(rightShift(cardArray, 2), Hand.SUIT_MASK);
    // let clubs = bitwise.bits.and(rightShift(cardArray, 3), Hand.SUIT_MASK);
    let spades = andSumArray([cardArray, Hand.SUIT_MASK]);
    let hearts = andSumArray([rightShift(cardArray, 1), Hand.SUIT_MASK]);
    let diamonds = andSumArray([rightShift(cardArray, 2), Hand.SUIT_MASK]);
    let clubs = andSumArray([rightShift(cardArray, 3), Hand.SUIT_MASK]);

    let ranks = orSumArray([spades, hearts, diamonds, clubs]);

    // Straight flush
    for (let i = 0; i <= 8; ++i) {
      let handMask = leftShift(Hand.STRAIGHT_FLUSH_MASK, 4 * i);
      if (isSameBit(bitwise.bits.and(spades, handMask), handMask)) {
        return bitwise.bits.or(
          Hand.STRAIGHT_FLUSH,
          Hand.encodeRanks(handMask, 5)
        );
      }
      if (isSameBit(bitwise.bits.and(hearts, handMask), handMask)) {
        return bitwise.bits.or(
          Hand.STRAIGHT_FLUSH,
          Hand.encodeRanks(handMask, 5)
        );
      }
      if (isSameBit(bitwise.bits.and(diamonds, handMask), handMask)) {
        return bitwise.bits.or(
          Hand.STRAIGHT_FLUSH,
          Hand.encodeRanks(handMask, 5)
        );
      }
      if (isSameBit(bitwise.bits.and(clubs, handMask), handMask)) {
        return bitwise.bits.or(
          Hand.STRAIGHT_FLUSH,
          Hand.encodeRanks(handMask, 5)
        );
      }
    }

    // Ace low straight flush

    if (
      isSameBit(
        bitwise.bits.and(spades, Hand.ACE_LOW_STRAIGHT_FLUSH_MASK),
        Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
      )
    ) {
      return bitwise.bits.or(Hand.STRAIGHT_FLUSH, Hand.ACE_LOW_STRAIGHT);
    }
    if (
      isSameBit(
        bitwise.bits.and(hearts, Hand.ACE_LOW_STRAIGHT_FLUSH_MASK),
        Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
      )
    ) {
      return bitwise.bits.or(Hand.STRAIGHT_FLUSH, Hand.ACE_LOW_STRAIGHT);
    }
    if (
      isSameBit(
        bitwise.bits.and(diamonds, Hand.ACE_LOW_STRAIGHT_FLUSH_MASK),
        Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
      )
    ) {
      return bitwise.bits.or(Hand.STRAIGHT_FLUSH, Hand.ACE_LOW_STRAIGHT);
    }
    if (
      isSameBit(
        bitwise.bits.and(clubs, Hand.ACE_LOW_STRAIGHT_FLUSH_MASK),
        Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
      )
    ) {
      return bitwise.bits.or(Hand.STRAIGHT_FLUSH, Hand.ACE_LOW_STRAIGHT);
    }

    // console.log("스티플 x");

    // Four of a kind
    let fourOfAKind = andSumArray([spades, hearts, diamonds, clubs]);

    if (getBitCount(fourOfAKind) != 0) {
      let kicker = Hand.encodeRanks(
        bitwise.bits.and(ranks, bitwise.buffer.not(fourOfAKind)),
        1
      );
      let fourOfAKindRank = Hand.encodeRanks(fourOfAKind, 1);
      return orSumArray([
        Hand.FOUR_OF_A_KIND,
        leftShift(fourOfAKindRank, 16),
        leftShift(fourOfAKindRank, 12),
        leftShift(fourOfAKindRank, 8),
        leftShift(fourOfAKindRank, 4),
        kicker,
      ]);
    }
    // console.log("포카드 x");

    // Fullhouse
    let triples = orSumArray([
      andSumArray([clubs, diamonds, hearts]),
      andSumArray([clubs, diamonds, spades]),
      andSumArray([clubs, hearts, spades]),
      andSumArray([diamonds, hearts, spades]),
    ]);

    let tripleRank =
      getBitCount(triples) == 0
        ? numTo28Array(0)
        : Hand.encodeRanks(triples, 1);
    let sets = orSumArray([
      bitwise.bits.and(clubs, diamonds),
      bitwise.bits.and(clubs, hearts),
      bitwise.bits.and(clubs, spades),
      bitwise.bits.and(diamonds, hearts),
      bitwise.bits.and(diamonds, spades),
      bitwise.bits.and(hearts, spades),
    ]);
    let setCount = getBitCount(sets);
    if (getBitCount(triples) != 0 && setCount >= 2) {
      let topPairRank = Hand.encodeRanks(
        bitwise.bits.and(sets, bitwise.buffer.not(triples)),
        1
      );
      return orSumArray([
        Hand.FULLHOUSE,
        leftShift(tripleRank, 16),
        leftShift(tripleRank, 12),
        leftShift(tripleRank, 8),
        leftShift(topPairRank, 4),
        topPairRank,
      ]);
    }
    // console.log("풀하우스 x");

    // Flush
    if (getBitCount(spades) >= 5) {
      return bitwise.bits.or(Hand.FLUSH, Hand.encodeRanks(spades, 5));
    }
    if (getBitCount(hearts) >= 5) {
      return bitwise.bits.or(Hand.FLUSH, Hand.encodeRanks(hearts, 5));
    }
    if (getBitCount(diamonds) >= 5) {
      return bitwise.bits.or(Hand.FLUSH, Hand.encodeRanks(diamonds, 5));
    }
    if (getBitCount(clubs) >= 5) {
      return bitwise.bits.or(Hand.FLUSH, Hand.encodeRanks(clubs, 5));
    }
    // console.log("플러시 x");

    // Straight
    for (let i = 0; i <= 8; ++i) {
      let handMask = leftShift(Hand.STRAIGHT_FLUSH_MASK, 4 * i);
      if (isSameBit(bitwise.bits.and(ranks, handMask), handMask)) {
        return bitwise.bits.or(Hand.STRAIGHT, Hand.encodeRanks(handMask, 5));
      }
    }
    if (
      isSameBit(
        bitwise.bits.and(ranks, Hand.ACE_LOW_STRAIGHT_FLUSH_MASK),
        Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
      )
    ) {
      return bitwise.bits.or(Hand.STRAIGHT, Hand.ACE_LOW_STRAIGHT);
    }
    // console.log("스트레이트 x");

    // Three of kind
    if (getBitCount(triples) != 0) {
      let kickers = bitwise.bits.and(ranks, bitwise.buffer.not(triples));
      return orSumArray([
        Hand.THREE_OF_A_KIND,
        leftShift(tripleRank, 16),
        leftShift(tripleRank, 12),
        leftShift(tripleRank, 8),
        Hand.encodeRanks(kickers, 2),
      ]);
    }
    // console.log("트리플 x");

    // Two pair
    if (setCount > 1) {
      console.log("aaaaaaa");
      let pairs = Hand.encodeRanks(sets, 2);
      let topPairRank = rightShift(pairs, 4);
      let secondPairRank = bitwise.bits.and(pairs, numTo28Array(15));

      let topPair = leftShift(numTo64Array(1), Hand.nextSetBit(sets, 0));
      sets = bitwise.bits.and(sets, bitwise.buffer.not(topPair));

      let secondPair = leftShift(numTo64Array(1), Hand.nextSetBit(sets, 0));
      let kickers = andSumArray([
        ranks,
        bitwise.buffer.not(topPair),
        bitwise.buffer.not(secondPair),
      ]);
      return orSumArray([
        Hand.TWO_PAIR,
        leftShift(topPairRank, 16),
        leftShift(topPairRank, 12),
        leftShift(secondPairRank, 8),
        leftShift(secondPairRank, 4),
        Hand.encodeRanks(kickers, 1),
      ]);
    }
    // console.log("투페어 x");

    // Pair
    if (setCount == 1) {
      let pair = Hand.encodeRanks(sets, 1);
      let kickers = bitwise.bits.and(ranks, bitwise.buffer.not(sets));
      return orSumArray([
        Hand.PAIR,
        leftShift(pair, 16),
        leftShift(pair, 12),
        Hand.encodeRanks(kickers, 3),
      ]);
    }
    // console.log("페어 x");

    // High Card
    return bitwise.bits.or(Hand.HIGH_CARD, Hand.encodeRanks(ranks, 5));
  }
  static printBigInt(value) {
    const binaryString = value.toString(2).padStart(64, "0");
    let a = "";
    // 1비트씩 분리하여 출력
    let b = 0;
    for (let i = 0; i < binaryString.length; i++) {
      if (b == 4) {
        a += " " + binaryString[i];
        b = 0;
      } else {
        a += binaryString[i];
      }
      b++;
    }
    console.log(a);
  }
}

module.exports = Hand;
