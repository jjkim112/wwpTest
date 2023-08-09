import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/home/HomePage';
import HandRankPage from './page/hand_rank/HandRankPage';
import PreFlopRangePage from './page/pre_flop_range/PreFlopRangePage';
import QuotePage from './page/quote/QuotePage';
import PokerCalPage from './page/poker_cal/PokerCalPage';
import NotFound from './page/404';
import { Header } from './page/Header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/hand-range" element={<HandRankPage />}></Route>
        <Route path="/pre-flop-range" element={<PreFlopRangePage />}></Route>
        <Route path="/quote" element={<QuotePage />}></Route>
        <Route path="/poker-cal" element={<PokerCalPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
