import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils/misc/wait";
import { Pub } from "../domain/Pub.model";
import { DataService } from "../data/DataService";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PubState {
  pubs: Pub[];
  loading: boolean;
}

const initialState: PubState = {
  pubs: [],
  loading: false,
};

export const pubSlice = createSlice({
  name: "pub",
  initialState,
  reducers: {
    pubLoadingStart: (state) => {
      state.loading = true;
    },
    pubLoadingEnd: (state) => {
      state.loading = false;
    },
    refreshWholePub: (state, action: PayloadAction<Pub[]>) => {
      state.pubs = action.payload;
    },
  },
});

export const { pubLoadingStart, pubLoadingEnd, refreshWholePub } =
  pubSlice.actions;
export default pubSlice;
