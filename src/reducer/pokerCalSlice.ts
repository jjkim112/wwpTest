import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const wholeCard: string[] = [
  "sa",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "st",
  "sj",
  "sq",
  "sk",
  "da",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "dt",
  "dj",
  "dq",
  "dk",
  "ca",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ct",
  "cj",
  "cq",
  "ck",
  "ha",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h7",
  "h8",
  "h9",
  "ht",
  "hj",
  "hq",
  "hk",
];

const isCard = (value: string): boolean => {
  return wholeCard.includes(value);
};
const isRealHand = (hand: string[]): boolean => {
  if (hand.length == 2) {
    if (isCard(hand[0]) && isCard(hand[1])) {
      return true;
    }
  }
  return false;
};

export class OnePlayer {
  hand: string[];
  constructor(hand: string[]) {
    this.hand = hand;
  }
  get clone() {
    return new OnePlayer(Array.from(this.hand));
  }
}

export interface PokerCalState {
  remainCards: string[];
  players: OnePlayer[];
  communityCards: string[];
}

const initialState: PokerCalState = {
  remainCards: Array.from(wholeCard),
  players: [new OnePlayer(["", ""]), new OnePlayer(["", ""])],
  communityCards: ["", "", "", "", ""],
};

export const pokerCalSlice = createSlice({
  name: "pokerCal",
  initialState,
  reducers: {
    updatePlayerCards: (state, action: PayloadAction<OnePlayer[]>) => {
      for (const onePlayer of state.players) {
        if (isCard(onePlayer.hand[0])) {
          state.remainCards.push(onePlayer.hand[0]);
        }
        if (isCard(onePlayer.hand[1])) {
          state.remainCards.push(onePlayer.hand[1]);
        }
      }

      for (const onePlayer of action.payload) {
        if (isCard(onePlayer.hand[0])) {
          const index = state.remainCards.indexOf(onePlayer.hand[0]);
          if (index !== -1) {
            state.remainCards.splice(index, 1);
          }
        }
        if (isCard(onePlayer.hand[1])) {
          const index = state.remainCards.indexOf(onePlayer.hand[1]);
          if (index !== -1) {
            state.remainCards.splice(index, 1);
          }
        }
      }

      state.players = action.payload;
    },
    updateCommunitCards: (state, action: PayloadAction<string[]>) => {
      for (const cardTemp of state.communityCards) {
        if (isCard(cardTemp)) {
          state.remainCards.push(cardTemp);
        }
      }

      for (const cardTemp of action.payload) {
        if (isCard(cardTemp)) {
          const index = state.remainCards.indexOf(cardTemp);
          if (index !== -1) {
            state.remainCards.splice(index, 1);
          }
        }
      }
      state.communityCards = action.payload;
    },
    refreshPokerCal: (state) => {
      state.remainCards = initialState.remainCards;
      state.players = initialState.players;
      state.communityCards = initialState.communityCards;
    },
  },
});

export const { updatePlayerCards, updateCommunitCards, refreshPokerCal } =
  pokerCalSlice.actions;
export default pokerCalSlice;
