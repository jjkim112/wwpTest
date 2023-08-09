const Card = require("./Card"); // Card 클래스 불러오기

class CardList extends Array {
  constructor(...cards) {
    super(...cards);
  }

  static valueOf(str) {
    const listPattern = /[0-9TJQKA][cdhs]/g;
    return new CardList(...(str.match(listPattern)?.map(Card.valueOf) ?? []));
  }

  toString() {
    return "[" + this.join(", ") + "]";
  }
}

module.exports = CardList;
