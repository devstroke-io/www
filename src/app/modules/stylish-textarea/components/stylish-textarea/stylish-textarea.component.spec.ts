import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylishTextareaComponent } from './stylish-textarea.component';
import {FormsModule} from '@angular/forms';

describe('StylishTextareaComponent', () => {
  let component: StylishTextareaComponent;
  let fixture: ComponentFixture<StylishTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
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
