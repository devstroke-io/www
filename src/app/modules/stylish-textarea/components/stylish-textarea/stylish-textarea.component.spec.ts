import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylishTextareaComponent } from './stylish-textarea.component';

describe('StylishTextareaComponent', () => {
  let component: StylishTextareaComponent;
  let fixture: ComponentFixture<StylishTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylishTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylishTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
