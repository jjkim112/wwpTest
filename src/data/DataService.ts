import { Game, GamePlayerThumb } from "../domain/Game.model";
import { GameTemplate } from "../domain/GameTemplate.model";
import { Pub } from "../domain/Pub.model";
import { FirebasePub } from "./firebase/FirebasePub";

export class DataService {
  static addPub = async (
    name: string,
    phone: string,
    address: string,
    lat: number,
    lon: number,
    links: Object[],
    photos: string[],
    days: Object,
    templates: GameTemplate[]
  ): Promise<boolean> => {
    try {
      const newId = `${Date.now()}_${name}`;
      const isSuccess = await FirebasePub.addNewPub(newId, {
        id: newId,
        name: name,
        phone: phone,
        address: address,
        lat: lat,
        lon: lon,
        links: links,
        photos: photos,
        days: days,
        templates: templates,
      });
      return isSuccess;
    } catch (e) {
      return false;
    }
  };

  static fetchWholePub = async (): Promise<Pub[]> => {
    try {
      const pubs = await FirebasePub.getWholePubData();
      return pubs;
    } catch (e) {
      console.log(`[DataService] fetchWholePub e: ${e}`);
      return [];
    }
  };

  static fetchGamesInfo = async (pubId: string): Promise<Game[]> => {
    try {
      const games = await FirebasePub.getWholeGamesData(pubId);
      return games;
    } catch (e) {
      console.log(`[DataService] fetchWholePub e: ${e}`);
      return [];
    }
  };

  static updatePubInfo = async (pubId: string): Promise<boolean> => {
    try {
      const isSuccess = await FirebasePub.updatePub(pubId, {
        name: "wwp 제주 지점!",
      });
      return isSuccess;
    } catch (e) {
      return false;
    }
  };

  static addGame = async (
    pubId: string,
    gameTempId: string,
    entry: number,
    players: GamePlayerThumb[]
  ): Promise<boolean> => {
    try {
      const newId = `${Date.now()}_${gameTempId}`;
      const isSuccess = await FirebasePub.addNewGame(pubId, newId, {
        id: newId,
        pubId: pubId,
        gameTempId: gameTempId,
        entry: entry,
        date: Date.now(),
        players: players,
      });
      return isSuccess;
    } catch (e) {
      console.log(`[DataService] addGame e: ${e}`);
      return false;
    }
  };
}
