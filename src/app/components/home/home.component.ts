import { Component, OnInit } from '@angular/core';
import {Tool} from '../../models';
import {ToolService} from '../../services';

const MAX_TOOLS: number = 8;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public tools: Tool[] = [];

  public fullList: boolean = false;

  public listExpendable: boolean = true;

  public manuallyExpanded: boolean = false;

  constructor(private toolService: ToolService) { }

  public ngOnInit() {
    this.tools = [];
    const searchResults = this.toolService.findMostUsed();
    for (const result of searchResults) {
      this.tools.push(result.tool);
    }
    // @TODO: duplicate code
    this.listExpendable = this.tools.length > MAX_TOOLS;
  }

  public resetList() {
    if (!this.manuallyExpanded) {
      this.fullList = false;
    }
    // @TODO: duplicate code
    this.listExpendable = this.tools.length > MAX_TOOLS;
    this.tools = [];
    const searchResults = this.toolService.findMostUsed();
    for (const result of searchResults) {
      this.tools.push(result.tool);
    }
  }

  public updateList(searchResults) {
    this.tools = [];
    for (const result of searchResults) {
      this.tools.push(result.tool);
    }
    this.fullList = true;
  }

  public expandList() {
    this.manuallyExpanded = true;
    this.fullList = true;
  }
}
