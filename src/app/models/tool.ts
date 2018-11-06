export interface ToolDefinition {
  id: number;
  title: string;
  url: string;
  keywords: string[];
}
export class Tool {
  public id: number;
  public title: string;
  public url: string;
  public keywords: string[];

  public constructor(data: ToolDefinition) {
    this.id = data.id;
    this.title = data.title;
    this.url = data.url;
    this.keywords = data.keywords;
  }
}
