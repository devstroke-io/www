import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtDebuggerComponent } from './jwt-debugger.component';

describe('JwtDebuggerComponent', () => {
  let component: JwtDebuggerComponent;
  let fixture: ComponentFixture<JwtDebuggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtDebuggerComponent ]
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
