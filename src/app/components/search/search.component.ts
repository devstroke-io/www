import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {IconDefinition, faSearch} from '@fortawesome/free-solid-svg-icons';
import {ToolService} from '../../services';

const QUERY_LENGTH_MIN = 3;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public faSearch: IconDefinition = faSearch;
  public suggestions: any[] = [];
  @Input() showLogo: boolean = false;
  @Input() showSuggestion: boolean = false;
  // to enable auto focus on typing
  @Input() autoFocus: boolean = false;
  // to enable ctrl+f and F3 override
  @Input() searchFocus: boolean = false;
  @Output() emitSuggestions: EventEmitter<any> = new EventEmitter();
  @Output() resetSearch: EventEmitter<any> = new EventEmitter();
  private initialState: boolean = true;
  private nonPrintableChars: string[] = [
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
  ];

  constructor(private toolService: ToolService,
              private el: ElementRef) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // focus search input with F3 or ctrl+f
    if (this.searchFocus && ((event.key === 'f' && event.ctrlKey === true) || event.key === 'F3')) {
      return this.handleCtrlF(event);
    }
    // if autoFocus disabled of combo ctrl+shift, abort
    if (!this.autoFocus || (event.shiftKey && event.ctrlKey)) {
      return;
    }
    // focus search input and select all with ctrl+a
    if (event.key === 'a' && event.ctrlKey) {
      return this.handleCtrlA(event);
    }
    // if another combo with ctrl, abort
    if (event.ctrlKey) {
      return;
    }
    // only treat printable chars
    if (!this.nonPrintableChars.includes(event.key)) {
      (<HTMLInputElement>this.el.nativeElement.querySelector('input')).focus();
    }
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

  private handleCtrlA(event: KeyboardEvent): void {
    event.preventDefault();
    const searchField: HTMLInputElement = this.el.nativeElement.querySelector('input');
    searchField.focus();
    searchField.select();
  }

  private handleCtrlF(event: KeyboardEvent): void {
    event.preventDefault();
    const searchField: HTMLInputElement = this.el.nativeElement.querySelector('input');
    searchField.focus();
  }
}
