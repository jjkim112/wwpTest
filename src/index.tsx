import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import QuotePage from "./page/quote/QuotePage";
import PokerCalPage from "./page/poker_cal/PokerCalPage";
import NotFound from "./page/404";
import { Header } from "./page/Header";
import HoldemBase from "./page/holdem_base/holdem_base";
import { HoldemPubPage } from "./page/holdem_pub/HoldemPubPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import firebase from "firebase/compat/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          {/* <Route path="/hand-range" element={<HandRankPage />}></Route>
        <Route path="/pre-flop-range" element={<PreFlopRangePage />}></Route> */}
          <Route path="/holdem-base" element={<HoldemBase />}></Route>
          <Route path="/quote" element={<QuotePage />}></Route>
          <Route path="/poker-cal" element={<PokerCalPage />}></Route>
          <Route path="/holdem-pub" element={<HoldemPubPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
