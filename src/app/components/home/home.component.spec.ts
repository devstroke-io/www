import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SearchComponent} from '../search/search.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Tool} from '../../models';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [HomeComponent, SearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select second tool', (done) => {
    const fakeTools = [
      new Tool({id: 1, title: 'title1', url: 'url1', keywords: ['keyword1']}),
      new Tool({id: 2, title: 'title2', url: 'url2', keywords: ['keyword2']}),
    ];
    const req1 = httpMock.expectOne(`/assets/tools.json`);
    expect(req1.request.method).toBe('GET');
    req1.flush(fakeTools);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      setTimeout(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'key': 'Right'
        }));
        const secondTool = fixture.debugElement.query(By.css('.tools .tool:nth-child(2)'));
        expect(secondTool.nativeElement.classList.contains('selected')).toBe(true);
        done();
      }, 0);
    });
  });

  it('should empty tools list', (done) => {
    const input = fixture.debugElement.query(By.css('app-search input')).nativeElement;
    input.value = 'non-existent';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const tools = fixture.debugElement.queryAll(By.css('.tool'));
      expect(tools.length).toBe(0);
      done();
    });
  });

  it('should select nothing bro', (done) => {
    const input = fixture.debugElement.query(By.css('app-search input')).nativeElement;
    input.value = 'non-existent';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'Left'
      }));
      const selectedTool = fixture.debugElement.queryAll(By.css('.tools .tool.selected'));
      expect(selectedTool.length).toBe(0);
      done();
    });
  });
});
