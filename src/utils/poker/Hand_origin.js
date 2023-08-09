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
class Hand {
  static STRAIGHT_FLUSH_MASK = 0x11111n;
  static ACE_LOW_STRAIGHT_FLUSH_MASK = 0x1111000000001n;
  static SUIT_MASK = 0x1111111111111n;

  static RANK_MASK = 0xfn;

  static HIGH_CARD = BigInt(Category.HIGH_CARD) << 24n;
  static PAIR = BigInt(Category.PAIR) << 24n;
  static TWO_PAIR = BigInt(Category.TWO_PAIR) << 24n;
  static THREE_OF_A_KIND = BigInt(Category.THREE_OF_A_KIND) << 24n;
  static STRAIGHT = BigInt(Category.STRAIGHT) << 24n;
  static FLUSH = BigInt(Category.FLUSH) << 24n;
  static FULLHOUSE = BigInt(Category.FULLHOUSE) << 24n;
  static FOUR_OF_A_KIND = BigInt(Category.FOUR_OF_A_KIND) << 24n;
  static STRAIGHT_FLUSH = BigInt(Category.STRAIGHT_FLUSH) << 24n;
  static ACE_LOW_STRAIGHT = 0x5432en;

  // 우측에서부터 비트 체크해서 처음으로 나오게 되는 1의 위치를 반환
  // 0일때는 -1 반환
  static nextSetBit(i, fromIndex) {
    let mask = 0x1n << BigInt(fromIndex);
    for (let j = fromIndex; j < 64; j++, mask <<= 1n) {
      if (BigInt(i) & mask) {
        return j;
      }
    }
    return -1;
  }
  static getBitCount(n) {
    let count = BigInt(0);
    while (n != 0) {
      count += n & 1n;
      n >>= 1n;
    }
    return count;
  }

  static encodeRanks(rankMask, n) {
    let value = BigInt(0);

    for (
      let i = Hand.nextSetBit(rankMask, 0), c = 0;
      i >= 0 && c < n;
      i = Hand.nextSetBit(rankMask, i + 1), c++
    ) {
      value <<= 4n;
      value |= BigInt(14 - Math.floor(i / 4));
    }
    return value;
  }

  compareTo(o) {
    return o.handValue - this.handValue;
  }

  // static fastEval(cardSet) {
  // let cardMask = cardSet.bigIntValue();
  static fastEval(intValue) {
    let cardMask = intValue;

    let spades = cardMask & Hand.SUIT_MASK;
    let hearts = (cardMask >> 1n) & Hand.SUIT_MASK;
    let diamonds = (cardMask >> 2n) & Hand.SUIT_MASK;
    let clubs = (cardMask >> 3n) & Hand.SUIT_MASK;
    let ranks = spades | hearts | diamonds | clubs;

    // Straight flush
    for (let i = 0; i <= 8; ++i) {
      let handMask = Hand.STRAIGHT_FLUSH_MASK << (BigInt(i) << 2n);
      if ((spades & handMask) === handMask) {
        return Hand.STRAIGHT_FLUSH | Hand.encodeRanks(handMask, 5);
      }
      if ((hearts & handMask) === handMask) {
        return Hand.STRAIGHT_FLUSH | Hand.encodeRanks(handMask, 5);
      }
      if ((diamonds & handMask) === handMask) {
        return Hand.STRAIGHT_FLUSH | Hand.encodeRanks(handMask, 5);
      }
      if ((clubs & handMask) === handMask) {
        return Hand.STRAIGHT_FLUSH | Hand.encodeRanks(handMask, 5);
      }
    }

    // Ace low straight flush
    if (
      (spades & Hand.ACE_LOW_STRAIGHT_FLUSH_MASK) ===
      Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
    ) {
      return Hand.STRAIGHT_FLUSH | Hand.ACE_LOW_STRAIGHT;
    }
    if (
      (hearts & Hand.ACE_LOW_STRAIGHT_FLUSH_MASK) ===
      Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
    ) {
      return Hand.STRAIGHT_FLUSH | Hand.ACE_LOW_STRAIGHT;
    }
    if (
      (diamonds & Hand.ACE_LOW_STRAIGHT_FLUSH_MASK) ===
      Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
    ) {
      return Hand.STRAIGHT_FLUSH | Hand.ACE_LOW_STRAIGHT;
    }
    if (
      (clubs & Hand.ACE_LOW_STRAIGHT_FLUSH_MASK) ===
      Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
    ) {
      return Hand.STRAIGHT_FLUSH | Hand.ACE_LOW_STRAIGHT;
    }
    // console.log("스티플 x");

    // Four of a kind
    let fourOfAKind = spades & hearts & diamonds & clubs;

    if (fourOfAKind != 0) {
      let kicker = Hand.encodeRanks(ranks & ~fourOfAKind, 1);
      let fourOfAKindRank = Hand.encodeRanks(fourOfAKind, 1);
      return (
        Hand.FOUR_OF_A_KIND |
        (fourOfAKindRank << 16n) |
        (fourOfAKindRank << 12n) |
        (fourOfAKindRank << 8n) |
        (fourOfAKindRank << 4n) |
        kicker
      );
    }
    // console.log("포카드 x");

    // Fullhouse
    let triples =
      (clubs & diamonds & hearts) |
      (clubs & diamonds & spades) |
      (clubs & hearts & spades) |
      (diamonds & hearts & spades);
    let tripleRank = triples == 0n ? 0n : BigInt(Hand.encodeRanks(triples, 1));
    let sets =
      (clubs & diamonds) |
      (clubs & hearts) |
      (clubs & spades) |
      (diamonds & hearts) |
      (diamonds & spades) |
      (hearts & spades);
    let setCount = Hand.getBitCount(sets);
    if (triples != 0 && setCount >= 2) {
      let topPairRank = Hand.encodeRanks(sets & ~triples, 1);
      return (
        Hand.FULLHOUSE |
        (tripleRank << 16n) |
        (tripleRank << 12n) |
        (tripleRank << 8n) |
        (topPairRank << 4n) |
        topPairRank
      );
    }
    // console.log("풀하우스 x");

    // Flush
    if (Hand.getBitCount(spades) >= 5) {
      return Hand.FLUSH | Hand.encodeRanks(spades, 5);
    }
    if (Hand.getBitCount(hearts) >= 5) {
      return Hand.FLUSH | Hand.encodeRanks(hearts, 5);
    }
    if (Hand.getBitCount(diamonds) >= 5) {
      return Hand.FLUSH | Hand.encodeRanks(diamonds, 5);
    }
    if (Hand.getBitCount(clubs) >= 5) {
      return Hand.FLUSH | Hand.encodeRanks(clubs, 5);
    }
    // console.log("플러시 x");

    // Straight
    for (let i = 0; i <= 8; ++i) {
      let handMask = Hand.STRAIGHT_FLUSH_MASK << (BigInt(i) << 2n);
      if ((ranks & handMask) === handMask) {
        return Hand.STRAIGHT | Hand.encodeRanks(handMask, 5);
      }
    }
    if (
      (ranks & Hand.ACE_LOW_STRAIGHT_FLUSH_MASK) ===
      Hand.ACE_LOW_STRAIGHT_FLUSH_MASK
    ) {
      return Hand.STRAIGHT | Hand.ACE_LOW_STRAIGHT;
    }
    // console.log("스트레이트 x");

    // Three of kind
    if (triples != 0) {
      let kickers = ranks & ~triples;
      return (
        Hand.THREE_OF_A_KIND |
        (tripleRank << 16n) |
        (tripleRank << 12n) |
        (tripleRank << 8n) |
        Hand.encodeRanks(kickers, 2)
      );
    }
    // console.log("트리플 x");

    // Two pair
    if (setCount > 1) {
      let pairs = Hand.encodeRanks(sets, 2);
      let topPairRank = pairs >> 4n;
      let secondPairRank = pairs & 0xfn;
      let topPair = BigInt.asUintN(
        64,
        BigInt(1) << BigInt(Hand.nextSetBit(sets, 0))
      );
      sets &= ~topPair;
      let secondPair = BigInt.asUintN(
        64,
        BigInt(1) << BigInt(Hand.nextSetBit(sets, 0))
      );
      let kickers = ranks & ~topPair & ~secondPair;
      return (
        Hand.TWO_PAIR |
        (topPairRank << 16n) |
        (topPairRank << 12n) |
        (secondPairRank << 8n) |
        (secondPairRank << 4n) |
        Hand.encodeRanks(kickers, 1)
      );
    }
    // console.log("투페어 x");

    // Pair
    if (setCount == 1) {
      let pair = Hand.encodeRanks(sets, 1);
      let kickers = ranks & ~sets;
      return (
        Hand.PAIR | (pair << 16n) | (pair << 12n) | Hand.encodeRanks(kickers, 3)
      );
    }
    // console.log("페어 x");

    // High Card
    return Hand.HIGH_CARD | Hand.encodeRanks(ranks, 5);
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
