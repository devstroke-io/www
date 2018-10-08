import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtDebuggerComponent } from './jwt-debugger.component';
import {StylishTextareaModule} from '../../../modules/stylish-textarea/stylish-textarea.module';

describe('JwtDebuggerComponent', () => {
  let component: JwtDebuggerComponent;
  let fixture: ComponentFixture<JwtDebuggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtDebuggerComponent ],
      imports: [StylishTextareaModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtDebuggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
