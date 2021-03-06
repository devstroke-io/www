import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolComponent} from './tool.component';
import {SearchComponent} from '../search/search.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ToolComponent', () => {
  let component: ToolComponent;
  let fixture: ComponentFixture<ToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ToolComponent, SearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
