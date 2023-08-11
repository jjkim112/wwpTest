export class OpenDay {
  day: string;
  games: string[];
  constructor(day: string, games: string[]) {
    this.day = day;
    this.games = games;
  }
  get toMap() {
    return {
      day: this.day,
      games: this.games,
    };
  }

  static fromData(data: any): OpenDay {
    try {
      const day = data['day'];
      const games = data['games'];

      return new OpenDay(day, games);
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return new OpenDay('', []);
    }
  }
}
