import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils/misc/wait";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../domain/Game.model";
import { User } from "../domain/User.model";

export interface PubCustomRankUser {
  id: string;
  totalPrize: number;
  howManyMoneyIn: number;
  howManyFirstRank: number;
}

export interface UserState {
  users: User[];
  customUsers: PubCustomRankUser[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  customUsers: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoadingStart: (state) => {
      state.loading = true;
    },
    userLoadingEnd: (state) => {
      state.loading = false;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    refreshWithPubId: (state, action: PayloadAction<string>) => {
      const pubId = action.payload;
      if (pubId !== "") {
        let tempList: PubCustomRankUser[] = [];
        for (const user of state.users) {
          let totalPrize = 0;
          let howManyMoneyIn = 0;
          let howManyFirstRank = 0;
          for (const game of user.games) {
            if (game.pubId === pubId) {
              totalPrize += game.datas.prize;
              if (game.datas.prize > 0) {
                howManyMoneyIn++;
              }
              if (game.datas.rank === 1) {
                howManyFirstRank++;
              }
            }
          }
          tempList.push({
            id: user.id,
            totalPrize: totalPrize,
            howManyMoneyIn: howManyMoneyIn,
            howManyFirstRank: howManyFirstRank,
          });
        }
        tempList.sort((a, b) => b.totalPrize - a.totalPrize);
        state.customUsers = tempList;
      }
    },
  },
});

export const { userLoadingStart, userLoadingEnd, setUsers, refreshWithPubId } =
  userSlice.actions;
export default userSlice;
