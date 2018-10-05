import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ToolService} from '../../services';

const QUERY_LENGTH_MIN = 3;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public suggestions: any[] = [];

  private initialState: boolean = true;

  @Input() showSuggestion: boolean = false;
  // to enable auto focus on typing
  @Input() autoFocus: boolean = false;
  // to enable ctrl+f and F3 override
  @Input() searchFocus: boolean = false;
  @Output() emitSuggestions: EventEmitter<any> = new EventEmitter();
  @Output() resetSearch: EventEmitter<any> = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // focus search input with F3 or ctrl+f
    if (
      this.searchFocus
      && (
        (event.key === 'f' && event.ctrlKey === true)
        || event.key === 'F3'
      )
    ) {
      event.preventDefault();
      this.el.nativeElement.querySelector('input').focus();
    }
    // if autoFocus disabled of combo ctrl+shift, abort
    if (!this.autoFocus || (event.shiftKey && event.ctrlKey)) {
      console.log('No auto-focus or shift+ctrl');
      return;
    }
    // focus search input and select all with ctrl+a
    if (event.key === 'a' && event.ctrlKey) {
      event.preventDefault();
      this.el.nativeElement.querySelector('input').focus();
      this.el.nativeElement.querySelector('input').select();
    }
    // if another combo with ctrl, abort
    if (event.ctrlKey) {
      return;
    }

    // @TODO: check printable characters only
    if (![
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'Shift',
      'Control',
      'Alt',
      'Escape', // @TODO: do something on escape ?
      'Enter', // @TODO: do something on enter ?
      'Tab', // @TODO: do something on tab ?
    ].includes(event.key)) {
      console.log(event.shiftKey, event.ctrlKey, event.key, event.char, event.charCode, event);
      this.el.nativeElement.querySelector('input').focus();
    }
  }

  constructor(private toolService: ToolService,
              private el: ElementRef) {
  }

  public ngOnInit() {
  }

  public updateSearch(query) {
    if (query.length >= QUERY_LENGTH_MIN) {
      this.initialState = false;
      const searchResults = this.toolService.findTools(query);
      if (this.showSuggestion) {
        this.suggestions = searchResults;
      }
      this.emitSuggestions.emit(searchResults);
      return;
    }

    if (!this.initialState) {
      this.resetSearch.emit();
      this.initialState = true;
      this.suggestions = [];
    }
  }
}
