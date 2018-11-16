import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Base64ToolComponent} from './base64-tool.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

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

  it('should bind the "encode" input to the correct property', () => {
    fixture.detectChanges();
    const textareaDecoded = fixture.debugElement.queryAll(By.css('.container textarea'))[1],
      textareaDecodedElement = textareaDecoded.nativeElement;
    textareaDecodedElement.value = 'test';
    textareaDecodedElement.dispatchEvent(new Event('input'));
    expect(component.decoded).toBe('test');
  });

  it('should bind the "decode" input to the correct property', () => {
    fixture.detectChanges();
    const textareaEncoded = fixture.debugElement.queryAll(By.css('.container textarea'))[0],
      textareaEncodedElement = textareaEncoded.nativeElement;
    textareaEncodedElement.value = 'dGVzdA==';
    textareaEncodedElement.dispatchEvent(new Event('input'));
    expect(component.encoded).toBe('dGVzdA==');
  });

  it('should call the updateDecoded method', () => {
    spyOn(component, 'updateDecoded');
    fixture.detectChanges();
    const textareaDecoded = fixture.debugElement.queryAll(By.css('.container textarea'))[1],
      textareaDecodedElement = textareaDecoded.nativeElement;
    textareaDecodedElement.value = 'test';
    textareaDecodedElement.dispatchEvent(new Event('input'));
    expect(component.updateDecoded).toHaveBeenCalled();
  });

  it('should call the updateEncoded method', () => {
    spyOn(component, 'updateEncoded');
    fixture.detectChanges();
    const textareaEncoded = fixture.debugElement.queryAll(By.css('.container textarea'))[0],
      textareaEncodedElement = textareaEncoded.nativeElement;
    textareaEncodedElement.value = 'dGVzdA==';
    textareaEncodedElement.dispatchEvent(new Event('input'));
    expect(component.updateEncoded).toHaveBeenCalled();
  });

  it('should encode in base64', (done) => {
    fixture.detectChanges();
    const [textareaEncoded, textareaDecoded] = fixture.debugElement.queryAll(By.css('.container textarea')),
      textareaDecodedElement = textareaDecoded.nativeElement,
      textareaEncodedElement = textareaEncoded.nativeElement;
    textareaDecodedElement.value = 'test';
    textareaDecodedElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(textareaEncodedElement.value).toBe('dGVzdA==');
      done();
    });
  });

  it('should decode from base64', (done) => {
    fixture.detectChanges();
    const [textareaEncoded, textareaDecoded] = fixture.debugElement.queryAll(By.css('.container textarea')),
      textareaDecodedElement = textareaDecoded.nativeElement,
      textareaEncodedElement = textareaEncoded.nativeElement;
    textareaEncodedElement.value = 'dGVzdA==';
    textareaEncodedElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(textareaDecodedElement.value).toBe('test');
      done();
    });
  });

  it('should not decode from base64', (done) => {
    fixture.detectChanges();
    const [textareaEncoded, textareaDecoded] = fixture.debugElement.queryAll(By.css('.container textarea')),
      textareaDecodedElement = textareaDecoded.nativeElement,
      textareaEncodedElement = textareaEncoded.nativeElement;
    textareaEncodedElement.value = 'test that fails';
    textareaEncodedElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(textareaDecodedElement.value).toBe('');
      done();
    });
  });

  it('should fail to decode from base64', (done) => {
    fixture.detectChanges();
    const textareaEncoded = fixture.debugElement.queryAll(By.css('.container textarea'))[0],
      textareaEncodedElement = textareaEncoded.nativeElement;
    textareaEncodedElement.value = 'test that fails';
    textareaEncodedElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.invalidEncoded).toBe(true);
      done();
    });
  });

  it('should call copyToClipboard method (A)', () => {
    spyOn(component, 'copyToClipboard');
    fixture.detectChanges();
    const buttonA = fixture.debugElement.queryAll(By.css('.container button'))[0],
      buttonAElement = buttonA.nativeElement;
    buttonAElement.dispatchEvent(new Event('click'));
    expect(component.copyToClipboard).toHaveBeenCalled();
  });

  it('should call copyToClipboard method (B)', () => {
    spyOn(component, 'copyToClipboard');
    fixture.detectChanges();
    const buttonB = fixture.debugElement.queryAll(By.css('.container button'))[1],
      buttonBElement = buttonB.nativeElement;
    buttonBElement.dispatchEvent(new Event('click'));
    expect(component.copyToClipboard).toHaveBeenCalled();
  });

  it('should abort copy to clipboard', () => {
    spyOn(document, 'execCommand');
    fixture.detectChanges();
    const buttonA = fixture.debugElement.queryAll(By.css('.container button'))[1],
      buttonAElement = buttonA.nativeElement;
    buttonAElement.dispatchEvent(new Event('click'));
    expect(document.execCommand).not.toHaveBeenCalled();
  });

  it('should fail copy to clipboard', () => {
    spyOn(document, 'execCommand');
    fixture.detectChanges();
    const textareaDecoded = fixture.debugElement.queryAll(By.css('.container textarea'))[1],
      textareaDecodedElement = textareaDecoded.nativeElement,
      buttonA = fixture.debugElement.queryAll(By.css('.container button'))[1],
      buttonAElement = buttonA.nativeElement;
    spyOn(textareaDecodedElement, 'select').and.callFake(() => {
      throw new Error('fake error');
    });
    textareaDecodedElement.value = 'test';
    buttonAElement.dispatchEvent(new Event('click'));
    expect(document.execCommand).not.toHaveBeenCalled();
  });

  it('should call execute copy to clipboard', () => {
    spyOn(document, 'execCommand');
    fixture.detectChanges();
    const textareaDecoded = fixture.debugElement.queryAll(By.css('.container textarea'))[1],
      textareaDecodedElement = textareaDecoded.nativeElement,
      buttonA = fixture.debugElement.queryAll(By.css('.container button'))[1],
      buttonAElement = buttonA.nativeElement;
    textareaDecodedElement.value = 'test';
    buttonAElement.dispatchEvent(new Event('click'));
    expect(document.execCommand).toHaveBeenCalled();
  });
});
