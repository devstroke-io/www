import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Base64ToolComponent} from './base64-tool.component';
import {FormsModule} from '@angular/forms';

describe('Base64ToolComponent', () => {
  let component: Base64ToolComponent;
  let fixture: ComponentFixture<Base64ToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Base64ToolComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Base64ToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
