import logo from "./logo.svg";
import "./App.css";
import HomePage from "./page/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HandRankPage from "./page/hand_rank/HandRankPage";
import PreFlopRangePage from "./page/pre_flop_range/PreFlopRangePage";
import QuotePage from "./page/quote/QuotePage";
import Header from "./page/Header";
import NotFound from "./page/404";

function App() {
  return (
    <div className="bg-white w-full h-screen my-0">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/hand-range" element={<HandRankPage />}></Route>
          <Route path="/pre-flop-range" element={<PreFlopRangePage />}></Route>
          <Route path="/quote" element={<QuotePage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
