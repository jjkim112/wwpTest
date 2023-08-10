import { configureStore } from "@reduxjs/toolkit";
import pubSlice from "../reducer/pubSlice";
import gameSlice from "../reducer/gameSlice";

export const store = configureStore({
  reducer: {
    pub: pubSlice.reducer,
    game: gameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
