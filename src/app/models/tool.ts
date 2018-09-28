export class Tool {
  public id: number;
  public title: string;
  public keywords: string[];

  public constructor(id: number, title: string, keywords: string[]) {
    this.id = id;
    this.title = title;
    this.keywords = keywords;
  }
}
