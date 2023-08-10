import { Pub } from "../../../domain/Pub.model";
import { useState, useEffect } from "react";

import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { DataService } from "../../../data/DataService";
import { refreshGames } from "../../../reducer/gameSlice";
import { Game } from "../../../domain/Game.model";

export function HoldemPubOnePage(
  pub: Pub,
  games: Game[],
  setEmptyFunc: Function
) {
  return (
    <div>
      <div>ID : {pub.id}</div>
      <button
        onClick={() => {
          setEmptyFunc();
        }}
      >
        전체 보기
      </button>
      {games.map((game, i) => {
        return (
          <div>
            <div>Game</div>
            <div>{game.entry}</div>
            <div>{game.players.toString()}</div>
          </div>
        );
      })}
    </div>
  );
}
