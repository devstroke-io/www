export class Tool {
  public id: number;
  public title: string;
  public url: string;
  public keywords: string[];

  public constructor(id: number, title: string, url: string, keywords: string[]) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.keywords = keywords;
  }
}
