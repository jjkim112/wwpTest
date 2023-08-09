class Card {
  static Suit = {
    SPADE: { letter: "s" },
    HEART: { letter: "h" },
    DIAMOND: { letter: "d" },
    CLUB: { letter: "c" },
    size: 4,
  };

  static Rank = {
    ACE: { letter: "A", value: 14 },
    KING: { letter: "K", value: 13 },
    QUEEN: { letter: "Q", value: 12 },
    JACK: { letter: "J", value: 11 },
    TEN: { letter: "T", value: 10 },
    NINE: { letter: "9", value: 9 },
    EIGHT: { letter: "8", value: 8 },
    SEVEN: { letter: "7", value: 7 },
    SIX: { letter: "6", value: 6 },
    FIVE: { letter: "5", value: 5 },
    FOUR: { letter: "4", value: 4 },
    THREE: { letter: "3", value: 3 },
    DUECE: { letter: "2", value: 2 },
    size: 13,
  };

  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getSuit() {
    return this.suit;
  }

  getRank() {
    return this.rank;
  }

  rankValue() {
    return this.rank.value;
  }

  intValue() {
    const rankIndex = Object.values(Card.Rank).indexOf(this.rank);
    const suitIndex = Object.values(Card.Suit).indexOf(this.suit);
    return rankIndex * Card.Suit.size + suitIndex;
  }

  longValue() {
    return BigInt(1) << BigInt(this.intValue());
  }

  compareTo(other) {
    return this.intValue() - other.intValue();
  }

  toString() {
    return this.rank.letter + this.suit.letter;
  }

  static protoDeck = [];

  static initializeProtoDeck() {
    for (let rankName in Card.Rank) {
      const rank = Card.Rank[rankName];
      for (let suitName in Card.Suit) {
        const suit = Card.Suit[suitName];
        Card.protoDeck.push(new Card(rank, suit));
      }
    }
  }

  static valueOf(index) {
    if (index < 0 || index >= Card.protoDeck.length) {
      throw new Error("Invalid card; index=" + index);
    }
    return Card.protoDeck[index];
  }

  static valueOfBigint(num) {
    let index;
    if (num === 0n) {
      index = 0;
    } else {
      index = num.toString(2).length - 1;
    }
    if (index < 0 || index >= Card.protoDeck.length) {
      throw new Error("Invalid card; num=" + num);
    }
    return Card.valueOf(index);
  }

  static valueOf(rank, suit) {
    const index = new Card(rank, suit).intValue();
    return Card.valueOf(index);
  }

  static valueOfStr(cardStr) {
    if (cardStr.length != 2) {
      throw new Error("Invalid card format");
    }
    const rank = Card.Rank[cardStr[0]];
    const suit = Card.Suit[cardStr[1]];
    return Card.valueOf(rank, suit);
  }

  static newDeck() {
    return [...Card.protoDeck];
  }
}

// 초기화
Card.initializeProtoDeck();

module.exports = Card;
