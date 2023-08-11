import { Timestamp } from "firebase/firestore";
export class UserGameData {
  date: Date;
  entry: number;
  gameTempId: string;
  prize: number;
  rank: number;

  constructor(
    date: Date,
    entry: number,
    gameTempId: string,
    prize: number,
    rank: number
  ) {
    this.date = date;
    this.entry = entry;
    this.gameTempId = gameTempId;
    this.prize = prize;
    this.rank = rank;
  }

  get toMap() {
    return {
      date: this.date,
      entry: this.entry,
      gameTempId: this.gameTempId,
      prize: this.prize,
      rank: this.rank,
    };
  }
  static fromData(data: any): UserGameData {
    try {
      const date = (data["date"] as Timestamp).toDate();
      const entry: number = data["entry"];
      const gameTempId: string = data["gameTempId"];
      const prize: number = data["prize"];
      const rank: number = data["rank"];

      return new UserGameData(date, entry, gameTempId, prize, rank);
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return new UserGameData(new Date(0), 0, "", 0, 0);
    }
  }
}
