import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import pubSlice from "../reducer/pubSlice";
import gameSlice from "../reducer/gameSlice";
import pokerCalSlice from "../reducer/pokerCalSlice";

export const store = configureStore({
  reducer: {
    pub: pubSlice.reducer,
    game: gameSlice.reducer,
    pokerCal: pokerCalSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
