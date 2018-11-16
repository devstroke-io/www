import {TestBed, getTestBed} from '@angular/core/testing';

import {ToolService} from './tool.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {Tool} from '../models';

describe('ToolService', () => {
  let injector: TestBed;
  let service: ToolService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ToolService]
    });
    injector = getTestBed();
    service = injector.get(ToolService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loadTools', () => {
    it('should return an Observable<Tool[]>', () => {
      const fakeTools = [
        new Tool({
          id: 1,
          title: 'title1',
          url: 'url1',
          keywords: ['keyword1']
        }),
        new Tool({
          id: 2,
          title: 'title2',
          url: 'url2',
          keywords: ['keyword2']
        }),
      ];

      service.loadTools().subscribe((tools: Tool[]) => {
        expect(tools.length).toBe(2);
        expect(tools).toEqual(fakeTools);
      });

      const req = httpMock.expectOne(`/assets/tools.json`);
      expect(req.request.method).toBe('GET');
      req.flush(fakeTools);
    });

    it('should return an Observable<Tool[]> from cache', () => {
      const fakeTools = [
        new Tool({
          id: 1,
          title: 'title1',
          url: 'url1',
          keywords: ['keyword1']
        }),
        new Tool({
          id: 2,
          title: 'title2',
          url: 'url2',
          keywords: ['keyword2']
        }),
      ];

      service.loadTools().subscribe((tools: Tool[]) => {
        expect(tools.length).toBe(2);
        expect(tools).toEqual(fakeTools);
      });
      const req = httpMock.expectOne(`/assets/tools.json`);
      expect(req.request.method).toBe('GET');
      req.flush(fakeTools);

      service.loadTools().subscribe((tools: Tool[]) => {
        expect(tools.length).toBe(2);
        expect(tools).toEqual(fakeTools);
      });
    });

    it('should emit an error', () => {
      const mockErrorResponse = {
        status: 404, statusText: 'Bad Request'
      };
      const data = 'Invalid request parameters';

      service.loadTools().subscribe({
        error: error => {
          expect(error.error).toBe(data);
        }
      });

      const req = httpMock.expectOne(`/assets/tools.json`);
      expect(req.request.method).toBe('GET');
      req.flush(data, mockErrorResponse);
    });
  });

  describe('#findMostUsed', () => {
    it('should return an Observable<{priority: number, tool: Tool}[]>', () => {
      const fakeTools = [
        new Tool({id: 1, title: 'title1', url: 'url1', keywords: ['keyword1']}),
        new Tool({id: 2, title: 'title2', url: 'url2', keywords: ['keyword2']}),
      ];
      const fakeResults = [
        {priority: 10, tool: new Tool({id: 1, title: 'title1', url: 'url1', keywords: ['keyword1']})},
        {priority: 10, tool: new Tool({id: 2, title: 'title2', url: 'url2', keywords: ['keyword2']})},
      ];

      service.findMostUsed(false).subscribe((tools: {priority: number, tool: Tool}[]) => {
        expect(tools.length).toBe(2);
        expect(tools).toEqual(fakeResults);
      });

      const req = httpMock.expectOne(`/assets/tools.json`);
      expect(req.request.method).toBe('GET');
      req.flush(fakeTools);
    });

    it('should emit an error', () => {
      const mockErrorResponse = {
        status: 404, statusText: 'Bad Request'
      };
      const data = 'Invalid request parameters';

      service.findMostUsed().subscribe({
        error: error => {
          expect(error.error).toBe(data);
        }
      });

      const req = httpMock.expectOne(`/assets/tools.json`);
      expect(req.request.method).toBe('GET');
      req.flush(data, mockErrorResponse);
    });
  });

  describe('#findTools', () => {
    it('should return an Observable<{priority: number, tool: Tool}[]>', () => {
      const fakeTools = [
        new Tool({id: 1, title: 'title1', url: 'url1', keywords: ['keyword1']}),
        new Tool({id: 2, title: 'title2', url: 'url2', keywords: ['keyword2']}),
      ];
      const fakeResults1 = [
        {priority: 30, tool: new Tool({id: 1, title: 'title1', url: 'url1', keywords: ['keyword1']})},
      ];
      const fakeResults2 = [
        {priority: 0.5, tool: new Tool({id: 1, title: 'title1', url: 'url1', keywords: ['keyword1']})},
        {priority: 0.5, tool: new Tool({id: 2, title: 'title2', url: 'url2', keywords: ['keyword2']})},
      ];
      service.findTools('title1', false).subscribe((tools: {priority: number, tool: Tool}[]) => {
        expect(tools.length).toBe(1);
        expect(tools).toEqual(fakeResults1);
      });
      const req1 = httpMock.expectOne(`/assets/tools.json`);
      expect(req1.request.method).toBe('GET');
      req1.flush(fakeTools);

      service.findTools('keyword', true).subscribe((tools: {priority: number, tool: Tool}[]) => {
        expect(tools.length).toBe(2);
        expect(tools).toEqual(fakeResults2);
      });
      const req2 = httpMock.expectOne(`/assets/tools.json`);
      expect(req2.request.method).toBe('GET');
      req2.flush(fakeTools);
    });

    it('should emit an error', () => {
      const mockErrorResponse = {
        status: 404, statusText: 'Bad Request'
      };
      const data = 'Invalid request parameters';

      service.findTools('title1').subscribe({
        error: error => {
          expect(error.error).toBe(data);
        }
      });

      const req = httpMock.expectOne(`/assets/tools.json`);
      expect(req.request.method).toBe('GET');
      req.flush(data, mockErrorResponse);
    });
  });
});
