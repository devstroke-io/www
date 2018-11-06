import {Injectable} from '@angular/core';
import {Tool} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private tools: Tool[] = [
    new Tool({id: 1, title: 'Base64 Encode/Decode', url: 'base64-encode-decode', keywords: [
      'base64',
      'encode',
      'decode'
    ]}),
    new Tool({id: 2, title: 'RegExp Tester', url: 'regexp-tester', keywords: [
      'regexp',
      'regular',
      'expression',
      'tester'
    ]}),
    new Tool({id: 3, title: 'JWT Debugger', url: 'jwt-debugger', keywords: [
      'json',
      'web',
      'token',
      'debug',
      'decode'
    ]}),
    new Tool({id: 4, title: 'cURL converter', url: 'curl-converter', keywords: []})
  ];

  private static getToolPriority(tool: Tool, queryWords: string[]): number {
    let priority = 0;
    for (const queryWord of queryWords) {
      const containsQuery = new RegExp(queryWord, 'i'),
        startByQuery = new RegExp('^' + queryWord, 'i');
      if (startByQuery.test(tool.title)) {
        priority += 20;
      }
      if (containsQuery.test(tool.title)) {
        priority += 10;
      }
      for (const keyword of tool.keywords) {
        priority += ToolService.getKeywordPriority(keyword, queryWords);
      }
    }
    return priority;
  }

  private static getKeywordPriority(keyword: string, queryWords: string[]): number {
    let priority = 0;
    for (const queryWord of queryWords) {
      const containsQuery = new RegExp(queryWord, 'i');
      if (containsQuery.test(keyword)) {
        priority += 0.5;
      }
    }
    return priority;
  }

  public getAll(): Tool[] {
    return this.tools;
  }

  public findMostUsed(): any[] {
    // @TODO: implement this
    const results = [];
    for (const tool of this.tools) {
      results.push({
        priority: 10,
        tool: tool
      });
    }
    results.sort((a: any, b: any) => b.priority - a.priority);

    return results;
  }

  public findTools(query: string): any[] {
    const results = [],
      queryWords = query.split(/\s+/).filter(n => n);

    for (const tool of this.tools) {
      const priority = ToolService.getToolPriority(tool, queryWords);
      if (priority > 0) {
        results.push({priority: priority, tool: tool});
      }
    }
    results.sort((a: any, b: any) => b.priority - a.priority);

    return results;
  }

  public getByUrl(url: string): Tool {
    for (const tool of this.tools) {
      if (tool.url === url) {
        return tool;
      }
    }
  }
}
