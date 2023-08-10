import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './page/home/HomePage';
import QuotePage from './page/quote/QuotePage';
import PokerCalPage from './page/poker_cal/PokerCalPage';
import NotFound from './page/404';
import { Header } from './page/Header';
import HoldemBase from './page/holdem_base/holdem_base';
import HoldemPubListPage from './page/holdem_pub/HoldemPubListPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* <Route path="/hand-range" element={<HandRankPage />}></Route>
        <Route path="/pre-flop-range" element={<PreFlopRangePage />}></Route> */}
        <Route path="/holdem-base" element={<HoldemBase />}></Route>
        <Route path="/quote" element={<QuotePage />}></Route>
        <Route path="/poker-cal" element={<PokerCalPage />}></Route>
        <Route path="/holdem-pub" element={<HoldemPubListPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
