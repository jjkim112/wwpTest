import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils/misc/wait";
import { Pub } from "../domain/Pub.model";
import { DataService } from "../data/DataService";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../domain/Game.model";

export interface GameState {
  games: Game[];
  loading: boolean;
}

const initialState: GameState = {
  games: [],
  loading: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameLoadingStart: (state) => {
      state.loading = true;
    },
    gameLoadingEnd: (state) => {
      state.loading = false;
    },
    refreshGames: (state, action: PayloadAction<Game[]>) => {
      // TODO 합쳐지는 방식으로 고쳐야함.
      state.games = action.payload;
    },
  },
});

export const { gameLoadingStart, gameLoadingEnd, refreshGames } =
  gameSlice.actions;
export default gameSlice;
