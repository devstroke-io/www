import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Tool} from '../../models';
import {ToolService} from '../../services';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Meta} from '@angular/platform-browser';

const MAX_TOOLS: number = 8;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public environment = environment;

  /** @var {Tool[]} tool List of tool available */
  public tools: Tool[] = [];

  /** @var {boolean} [fullList=false] True if tool list is currently expanded */
  public fullList: boolean = false;

  /** @var {boolean} [listExpandable=true] True is tool list is expendable */
  public listExpendable: boolean = true;

  /** @var {boolean} [listExpandable=true] True is tool list was expanded by user interaction */
  public manuallyExpanded: boolean = false;
  /** @var {HTMLElement} selectedTool Currently selected tool */
  private selectedTool;

  constructor(private toolService: ToolService,
              public router: Router,
              private el: ElementRef,
              private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'DevStroke, some tools to help developpers'},
      {name: 'author', content: 'Damien JARRY'},
      {name: 'keywords', content: 'devstroke,developper,help,sidekick'}
    ]);
  }

  public validateTool() {
    console.log(this.selectedTool);
    this.selectedTool.click();
  }

  public ngOnInit() {
    this.tools = [];
    const searchResults = this.toolService.findMostUsed();
    for (const result of searchResults) {
      this.tools.push(result.tool);
    }
    // @TODO: duplicate code
    this.listExpendable = this.tools.length > MAX_TOOLS;
  }

  public ngAfterViewInit() {
    const toolElements = this.getToolElements();
    this.selectTool(<HTMLElement>toolElements[0]);
  }

  public resetList() {
    console.log('RESET');
    if (!this.manuallyExpanded) {
      this.fullList = false;
    }
    this.tools = [];
    const searchResults = this.toolService.findMostUsed();
    for (const result of searchResults) {
      this.tools.push(result.tool);
    }
    // TODO: Little hack because after tools push, view is not instantly udpated
    setTimeout(() => {
      const toolElements = this.getToolElements();
      this.selectTool(<HTMLElement>toolElements[0]);
    }, 100);
    // @TODO: duplicate code
    this.listExpendable = this.tools.length > MAX_TOOLS;
  }

  public updateList(searchResults) {
    console.log('UPDATE');
    this.tools = [];
    for (const result of searchResults) {
      this.tools.push(result.tool);
    }
    // TODO: Little hack because after tools push, view is not instantly udpated
    setTimeout(() => {
      const toolElements = this.getToolElements();
      this.selectTool(<HTMLElement>toolElements[0]);
    }, 100);

    this.fullList = true;
  }

  public expandList() {
    this.manuallyExpanded = true;
    this.fullList = true;
  }

  @HostListener('document:keydown.arrowUp', ['$event'])
  @HostListener('document:keydown.arrowRight', ['$event'])
  @HostListener('document:keydown.arrowDown', ['$event'])
  @HostListener('document:keydown.arrowLeft', ['$event'])
  @HostListener('document:keydown.escape', ['$event'])
  @HostListener('document:keydown.enter', ['$event'])
  /**
   * Handle specific "keyDown" events
   * @param {KeyboardEvent} event
   * @returns void
   */
  private handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'Down': // IE11
      case 'ArrowUp':
      case 'Up': // IE11
      case 'ArrowLeft':
      case 'Left': // IE11
      case 'ArrowRight':
      case 'Right': // IE11
        event.preventDefault();
        this.moveAmongstTools(event.key);
        break;
      case 'Enter':
        this.validateTool();
        break;
      case 'Escape':
        break;
    }
  }

  /**
   * Get all tool DOM elements
   * @returns HTMLCollection
   */
  private getToolElements(): HTMLCollection {
    return this.el.nativeElement.getElementsByClassName('tool');
  }

  /**
   * Count max elements on the first line
   * @returns number | null
   */
  private countElementsByLine(): number | null {
    const toolElements = this.getToolElements();
    if (toolElements.length === 0) {
      return null;
    }
    let offsetLeft = 0,
      count = 0;
    for (let index = 0, n = toolElements.length; index < n; index++) {
      if ((<HTMLElement>toolElements[index]).offsetLeft < offsetLeft) {
        break;
      }
      count = index + 1;
      offsetLeft = (<HTMLElement>toolElements[index]).offsetLeft;
    }
    console.log(count);
    return count;
  }

  private selectTool(tool: HTMLElement) {
    this.selectedTool = tool;
    const selectedTools: any[] = Array.from(this.getToolElements())
      .filter((item: HTMLElement) => {
        return item.classList.contains('selected');
      });
    if (selectedTools.length > 0) {
      selectedTools[0].classList.remove('selected');
    }
    this.selectedTool.classList.add('selected');
  }

  /**
   * Change selected tool
   * @param {'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp'} direction
   * @returns void
   */
  private moveAmongstTools(
    direction: 'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp' /* IE11 => */ | 'Left' | 'Right' | 'Down' | 'Up'
  ): void {
    const tools = this.getToolElements();
    if (tools.length === 0) {
      return;
    }
    const toolIndex = Array.from(this.selectedTool.parentNode.children).indexOf(this.selectedTool),
      countElementsByLine = this.countElementsByLine();
    let nextIndex;
    if (direction === 'ArrowLeft' || direction === 'Left'/* IE11 */) {
      // @TODO: doesn't work as expected, doesn't take the line into consideration
      const currentLine = Math.ceil((toolIndex + 1) / countElementsByLine),
        borders = {
          min: (currentLine - 1) * countElementsByLine,
          max: (currentLine * countElementsByLine) - 1
        };
      nextIndex = toolIndex - 1;
      if (nextIndex < borders.min) {
        nextIndex = borders.max;
      }
    }
    if (direction === 'ArrowRight' || direction === 'Right') {
      const currentLine = Math.ceil((toolIndex + 1) / countElementsByLine),
        borders = {
          min: (currentLine - 1) * countElementsByLine,
          max: (currentLine * countElementsByLine) - 1
        };
      nextIndex = toolIndex + 1;
      if (nextIndex % countElementsByLine === 0) {
        nextIndex = borders.min;
      }
    }
    if (direction === 'ArrowDown' || direction === 'Down') {
      nextIndex = toolIndex + countElementsByLine;
      if (tools.length - 1 < nextIndex) {
        nextIndex = nextIndex % countElementsByLine;
      }
    }
    if (direction === 'ArrowUp' || direction === 'Up') {
      nextIndex = toolIndex - countElementsByLine;
      if (nextIndex < 0) {
        nextIndex = this.tools.length - (countElementsByLine - (toolIndex % countElementsByLine));
      }
    }
    this.selectTool(<HTMLElement>tools[nextIndex]);
    // check current line
    if (Math.ceil((nextIndex + 1) / countElementsByLine) > 2) {
      this.expandList();
    }
  }
}
