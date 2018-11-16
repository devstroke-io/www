import {Injectable} from '@angular/core';
import {Tool, ToolDefinition} from '../models';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscriber, TeardownLogic} from 'rxjs';

const TOOLS_FILE = '/assets/tools.json';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  public tools: Tool[] = [];

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

  private static _findMostUsedResults(data: Tool[]): { priority: number, tool: Tool }[] {
    const results: { priority: number, tool: Tool }[] = [];
    for (const tool of data) {
      results.push({
        priority: 10,
        tool: tool
      });
    }
    results.sort((a: any, b: any) => b.priority - a.priority);
    return results;
  }

  private static _findToolsResults(data: Tool[], query: string): { priority: number, tool: Tool }[] {
    const results: { priority: number, tool: Tool }[] = [],
      queryWords = query.split(/\s+/).filter(n => n);

    for (const tool of data) {
      const priority = ToolService.getToolPriority(tool, queryWords);
      if (priority > 0) {
        results.push({priority: priority, tool: tool});
      }
    }
    results.sort((a: any, b: any) => b.priority - a.priority);
    return results;
  }

  constructor(private http: HttpClient) {
  }

  public loadTools(forceRefresh: boolean = false): Observable<Tool[]> {
    return new Observable(observer => {
      if (!forceRefresh && this.tools.length !== 0) {
        return this._loadToolsStatic(observer);
      }
      return this._loadToolsFresh(observer);
    });
  }

  public findMostUsed(forceRefresh: boolean = false): Observable<{ priority: number, tool: Tool }[]> {
    // @TODO: implement this
    return new Observable(observer => {
      const subscription = this.loadTools(forceRefresh).subscribe({
        next: (data: Tool[]) => {
          const results = ToolService._findMostUsedResults(data);
          observer.next(results);
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    });
  }

  public findTools(query: string, forceRefresh: boolean = false): Observable<{ priority: number, tool: Tool }[]> {
    return new Observable(observer => {
      const subscription = this.loadTools(forceRefresh).subscribe({
        next: (data: Tool[]) => {
          const results = ToolService._findToolsResults(data, query);
          observer.next(results);
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    });
  }

  private _loadToolsStatic(observer: Subscriber<Tool[]>): TeardownLogic {
    observer.next(this.tools);
    observer.complete();
    return {
      unsubscribe() {
      }
    };
  }

  private _loadToolsFresh(observer: Subscriber<Tool[]>): TeardownLogic {
    const request = this.http.get(TOOLS_FILE).subscribe({
      next: (data: ToolDefinition[]) => {
        this.tools = [];
        for (const rawTool of data) {
          this.tools.push(new Tool(rawTool));
        }
        observer.next(this.tools);
        observer.complete();
      },
      error: (error) => {
        observer.error(error);
      }
    });
    return {
      unsubscribe() {
        request.unsubscribe();
      }
    };
  }
}
