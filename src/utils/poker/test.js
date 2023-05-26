const Card = require("./Card");
const CardList = require("./CardList");
const CardSet = require("./CardSet");
const Hand = require("./Hand_origin");
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

const printFamily = (value) => {
  const familyIndex = value >> 24n;
  const filterMask = 0xfn;
  const cardList = [
    (value & (filterMask << 16n)) >> 16n,
    (value & (filterMask << 12n)) >> 12n,
    (value & (filterMask << 8n)) >> 8n,
    (value & (filterMask << 4n)) >> 4n,
    (value & (filterMask << 0n)) >> 0n,
  ];
  let family = "high";
  switch (familyIndex) {
    case 8n:
      family = "straight flush";
      break;
    case 7n:
      family = "four";
      break;
    case 6n:
      family = "full house";
      break;
    case 5n:
      family = "flush";
      break;
    case 4n:
      family = "straight";
      break;
    case 3n:
      family = "tripple";
      break;
    case 2n:
      family = "two pair";
      break;
    case 1n:
      family = "one pair";
      break;
  }
  function transToCard(cardIndex) {
    let card = "2";
    switch (cardIndex) {
      case 14n:
        card = "A";
        break;
      case 13n:
        card = "K";
        break;
      case 12n:
        card = "Q";
        break;
      case 11n:
        card = "J";
        break;
      case 10n:
        card = "10";
        break;
      case 9n:
        card = "9";
        break;
      case 8n:
        card = "8";
        break;
      case 7n:
        card = "7";
        break;
      case 6n:
        card = "6";
        break;
      case 5n:
        card = "5";
        break;
      case 4n:
        card = "4";
        break;
      case 3n:
        card = "3";
        break;
      case 2n:
        card = "2";
        break;
    }
    return card;
  }

  console.log(`${family} - ${cardList.map((v, _) => transToCard(v))}`);
};

const cardMask = BigInt(0x1111040200002n);
const eval = Hand.fastEval(cardMask);

// Hand.printBigInt(eval);
// printFamily(eval);
// const HIGH_CARD = bitwise.bits.circularShiftLeft(0b1010, 1);
// const PAIR = bitwise.bits.circularShiftLeft(0b1010, 1);
// const TWO_PAIR = BigInt(Category.TWO_PAIR) << 24n;
// const THREE_OF_A_KIND = BigInt(Category.THREE_OF_A_KIND) << 24n;
// const STRAIGHT = BigInt(Category.STRAIGHT) << 24n;
// const FLUSH = BigInt(Category.FLUSH) << 24n;
// const FULLHOUSE = BigInt(Category.FULLHOUSE) << 24n;
// const FOUR_OF_A_KIND = BigInt(Category.FOUR_OF_A_KIND) << 24n;
// const STRAIGHT_FLUSH = BigInt(Category.STRAIGHT_FLUSH) << 24n;
// const ACE_LOW_STRAIGHT = 0x5432en;

// const basic64Array = Array(64).map((_, __) => 0);
// basic64Array[63] = 1;
// console.log(bitwise.bits.circularShiftLeft(basic64Array, 2));

const time = Date.now();
console.log(`${Date.now()}`);
const cc = BigInt(0x1101000211111n);
printFamily(Hand.fastEval(cc));

// for (let index = 0; index < 5000000; index++) {
//   const cardMask = BigInt(0x1101000211111n);
//   const eval = Hand.fastEval(cardMask);
// }
console.log(`${(Date.now() - time) / 1000} s`);
