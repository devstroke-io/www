import { Injectable } from '@angular/core';
import {Tool} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private tools: Tool[] = [
    new Tool(1, 'Base64 Encode/Decode', [
      'base64',
      'encode',
      'decode'
    ]),
    new Tool(2, 'RegExp Tester', [
      'regexp',
      'regular',
      'expression',
      'tester'
    ]),
    new Tool(3, 'JWT Debugger', [
      'json',
      'web',
      'token',
      'debug',
      'decode'
    ]),
    new Tool(4, 'cURL converter', [
    ]),
    new Tool(5, 'Base64 Encode/Decode', [
      'base64',
      'encode',
      'decode'
    ]),
    new Tool(6, 'RegExp Tester', [
      'regexp',
      'regular',
      'expression',
      'tester'
    ]),
    new Tool(7, 'JWT Debugger', [
      'json',
      'web',
      'token',
      'debug',
      'decode'
    ]),
    new Tool(8, 'cURL converter', [
    ]),
    new Tool(9, 'Base64 Encode/Decode', [
      'base64',
      'encode',
      'decode'
    ]),
    new Tool(10, 'RegExp Tester', [
      'regexp',
      'regular',
      'expression',
      'tester'
    ]),
    new Tool(11, 'JWT Debugger', [
      'json',
      'web',
      'token',
      'debug',
      'decode'
    ]),
    new Tool(12, 'cURL converter', [
    ])
  ];

  public constructor() {
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
      let priority = 0;
      for (const queryWord of queryWords) {
        const containsQuery = new RegExp(queryWord, 'i'),
          startByQuery = new RegExp('^' + queryWord, 'i');
        if (startByQuery.test(tool.title)) {
          priority += 20;
          // results.push({priority: 20, tool: tool});
          // continue;
        }
        if (containsQuery.test(tool.title)) {
          priority += 10;
          // results.push({priority: 10, tool: tool});
          // continue;
        }
        for (const keyword of tool.keywords) {
          if (containsQuery.test(keyword)) {
            priority += 0.5;
          }
        }
      }
      if (priority > 0) {
        results.push({priority: priority, tool: tool});
      }
    }
    results.sort((a: any, b: any) => b.priority - a.priority);

    return results;
  }
}
