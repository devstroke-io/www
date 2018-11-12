import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {By} from '@angular/platform-browser';
import {Tool} from '../../models';
import {ToolService} from '../../services';

class MockToolService {
  findTools(query: string): any[] {
    return query === 'existent' ? [
      {priority: 10, tool: new Tool({id: 1, title: 'Base64 Encode/Decode', url: 'base64-encode-decode', keywords: [
            'base64',
            'encode',
            'decode'
          ]})},
      {priority: 5, tool: new Tool({id: 2, title: 'RegExp Tester', url: 'regexp-tester', keywords: [
            'regexp',
            'regular',
            'expression',
            'tester'
          ]})}
    ] : [];
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        FontAwesomeModule
      ],
      declarations: [SearchComponent]
    })
      .overrideComponent(SearchComponent, {
      set: {
        providers: [
          { provide: ToolService, useValue: new MockToolService() }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select input content', (done) => {
    component.autoFocus = true;

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'non-existent';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'a',
      'ctrlKey': true
    }));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(input.selectionEnd - input.selectionStart).toBe(input.value.length);
      expect(input.selectionStart).toBe(0);
      done();
    });
  });

  it('should select nothing', (done) => {
    component.autoFocus = false;

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'non-existent';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'a',
      'ctrlKey': true
    }));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(input.selectionEnd - input.selectionStart).toBe(0);
      expect(input.selectionStart).toBe(input.value.length);
      done();
    });
  });

  it ('should focus input (ctrl+f)', (done) => {
    component.searchFocus = true;

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'f',
      'ctrlKey': true
    }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(document.activeElement).toBe(input);
      done();
    });
  });

  it ('should focus input (printable char)', (done) => {
    component.autoFocus = true;

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'a'
    }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(document.activeElement).toBe(input);
      done();
    });
  });

  it ('should not focus input', (done) => {
    component.searchFocus = false;

    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'f',
      'ctrlKey': true
    }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(document.activeElement).toBe(document.body);
      done();
    });
  });

  it ('should not do anything', () => {
    component.searchFocus = true;
    component.autoFocus = false;

    let output = component.handleKeyboardEvent(new KeyboardEvent('keydown', {
      'key': 'f',
      'ctrlKey': true,
      'shiftKey': true
    }));
    expect(output).toBe(undefined);

    component.autoFocus = true;
    output = component.handleKeyboardEvent(new KeyboardEvent('keydown', {
      'key': 'f',
      'ctrlKey': true,
      'shiftKey': true
    }));
    expect(output).toBe(undefined);

    component.autoFocus = true;
    output = component.handleKeyboardEvent(new KeyboardEvent('keydown', {
      'key': 'z',
      'ctrlKey': true
    }));
    expect(output).toBe(undefined);

    component.autoFocus = false;
    output = component.handleKeyboardEvent(new KeyboardEvent('keydown', {
      'key': 'a'
    }));
    expect(output).toBe(undefined);

    component.autoFocus = true;
    output = component.handleKeyboardEvent(new KeyboardEvent('keydown', {
      'key': 'Escape'
    }));
    expect(output).toBe(undefined);
  });

  it ('should find then reset suggestions', () => {
    component.showSuggestion = true;
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'ab';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.suggestions.length).toBe(0);

    input.value = 'existent';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.suggestions.length).toBe(2);

    input.value = 'ab';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.suggestions.length).toBe(0);
  });
});
