export class GameTemplate {
  readonly id: string;
  info: string;
  subTitle: string;
  title: string;

  constructor(id: string, info: string, subTitle: string, title: string) {
    this.id = id;
    this.info = info;
    this.subTitle = subTitle;
    this.title = title;
  }

  get toMap() {
    return {
      id: this.id,
      info: this.info,
      subTitle: this.subTitle,
      title: this.title,
    };
  }
  static fromData(data: any): GameTemplate {
    try {
      const id: string = data["id"];
      const info: string = data["info"];
      const subTitle: string = data["subTitle"];
      const title: string = data["title"];

      return new GameTemplate(id, info, subTitle, title);
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return new GameTemplate("", "", "", "");
    }
  }
}
