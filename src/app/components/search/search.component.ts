import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() emitSuggestions: EventEmitter<any> = new EventEmitter();
  @Output() resetSearch: EventEmitter<any> = new EventEmitter();

  constructor(private toolService: ToolService) {
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
