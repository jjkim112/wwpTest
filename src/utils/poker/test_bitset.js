const Card = require("./Card");
const CardList = require("./CardList");
const CardSet = require("./CardSet");
const Hand = require("./Hand_bitwise");
const BitSet = require("bitset");

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

const a = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

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
  0, 0, 0, 1 /* 6============================================================*/,
  0, 0, 0, 0 /* 5============================================================*/,
  0, 0, 0, 1 /* 4============================================================*/,
  0, 0, 0, 0 /* 3============================================================*/,
  0, 0, 0, 1 /* 2============================================================*/,
  0, 0, 0, 0 /* 1============================================================*/,
];

const printBitwiseAs64Bit = (array) => {
  let str = "";
  let a = 0;
  for (let index = 0; index < array.length; index++) {
    if (a == 4) {
      str += " ";
      a = 0;
    }
    str += array[index];
    a++;
  }
  console.log(str);
};

// printBitwiseAs64Bit(bitwise.bits.circularShiftLeft(basic, 2));

const numToArray = (value) => {
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
// console.log(basic);
// console.log(numToArray(10));

console.log(bs.toArray()); // 1
// const time = Date.now();
// console.log(`${Date.now()}`);
// for (let index = 0; index < 5000000; index++) {
//   const cardMask = BigInt(0x1101000211111n);
//   const eval = Hand.fastEval(cardMask);
// }
// console.log(`${(Date.now() - time) / 1000} s`);
