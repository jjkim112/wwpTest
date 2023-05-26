class CardSet {
  constructor(value = 0) {
    this.set = BigInt(value);
  }

  add(card) {
    this.set |= BigInt(1) << BigInt(card.id);
  }

  addAll(cards) {
    for (const card of cards) {
      this.add(card);
    }
  }

  contains(card) {
    return !!(this.set & (BigInt(1) << BigInt(card.id)));
  }

  intersect(cardSet) {
    this.set &= cardSet.set;
  }

  subtract(cardSet) {
    this.set &= ~cardSet.set;
  }

  union(cardSet) {
    this.set |= cardSet.set;
  }

  size() {
    let count = 0;
    for (let i = 0; i < 64; i++) {
      if (this.set & (BigInt(1) << BigInt(i))) {
        count++;
      }
    }
    return count;
  }

  toString() {
    let str = "";
    for (let i = 0; i < 64; i++) {
      if (this.set & (BigInt(1) << BigInt(i))) {
        str += i + ", ";
      }
    }
    if (str.length === 0) {
      return "[]";
    } else {
      return "[" + str.slice(0, -2) + "]";
    }
  }

  bigIntValue() {
    return this.set;
  }

  toList() {
    const list = [];
    for (let i = 0; i < 64; i++) {
      if (this.set & (BigInt(1) << BigInt(i))) {
        list.push(new Card(i));
      }
    }
    return new CardList(list);
  }
}

module.exports = CardSet;
