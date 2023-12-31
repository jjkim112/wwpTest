import { Game, GamePlayerThumb } from "../domain/Game.model";
import { GameTemplate } from "../domain/GameTemplate.model";
import { Pub } from "../domain/Pub.model";
import { User } from "../domain/User.model";
import { FirebasePub } from "./firebase/FirebasePub";
import { FirebaseUser } from "./firebase/FirebaseUser";

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
      const nowDate = Date.now();
      const isSuccess = await FirebasePub.addNewGame(pubId, newId, {
        id: newId,
        pubId: pubId,
        gameTempId: gameTempId,
        entry: entry,
        date: nowDate,
        players: players,
      });

      // TODO 같이 움직여야하는 데이터들은 transaction 에 담아 한번에 처리가능하도록 함수 짜보기
      let isSucessUser = false;
      if (isSuccess) {
        isSucessUser = await FirebaseUser.updateUsersWithGame(
          players,
          newId,
          pubId,
          gameTempId,
          entry,
          new Date(nowDate)
        );
      }

      return isSuccess && isSucessUser;
    } catch (e) {
      console.log(`[DataService] addGame e: ${e}`);
      return false;
    }
  };

  static fetchWholeUser = async (): Promise<User[]> => {
    try {
      const users = await FirebaseUser.getWholeUserData();
      return users;
    } catch (e) {
      console.log(`[DataService] fetchWholeUser e: ${e}`);
      return [];
    }
  };
}
