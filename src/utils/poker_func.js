import basic from "./basic.json";
import { TexasHoldem } from "poker-odds-calc";

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

const transToFormValue = (listCards) => {
  const numTemp = "23456789tjqka";
  const numForm = "23456789TJQKA";
  var result = [];
  for (let index = 0; index < listCards.length; index++) {
    const value = listCards[index];
    if (isCard(value)) {
      const shape = value[0];
      const num = value[1];

      result.push(`${numForm[numTemp.indexOf(num)]}${shape}`);
    }
  }

  return result;
};
const transToOriginStr = (handStr) => {
  const numOrigin = "23456789tjqka";
  const numForm = "23456789TJQKA";
  var result = "";
  for (let index = 0; index < handStr.length; index += 2) {
    const num = handStr[index];
    const shape = handStr[index + 1];

    result += `${shape}${numOrigin[numForm.indexOf(num)]}`;
  }

  return result;
};

const getResult = (hands, communityCards) => {
  const Table = new TexasHoldem();
  hands.forEach((v) => {
    const playerHand = transToFormValue(v);
    if (playerHand.length == 2) {
      Table.addPlayer(playerHand);
    }
  });

  const formCommunitCards = transToFormValue(communityCards);
  if (formCommunitCards.length != 0) {
    Table.setBoard(formCommunitCards);
  }

  const now = Date.now();
  const Result = Table.limit(100000).calculate();
  // console.log(`${(Date.now() - now) / 1000} s`);

  var winList = [];

  Result.getPlayers().forEach((player) => {
    winList.push({
      hands: transToOriginStr(player.getHand()),
      wins: player.getWinsPercentage(),
      ties: player.getTiesPercentage(),
    });
  });

  return winList;
};

export { getResult };
