import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Tool} from '../../models';
import {DomMoveService, ToolService} from '../../services';
import {environment} from '../../../environments/environment';
import {Meta} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {IconDefinition as BrandIconDefinition, faLinkedinIn, faGithub} from '@fortawesome/free-brands-svg-icons';
import {IconDefinition as SolidIconDefinition, faDesktop} from '@fortawesome/free-solid-svg-icons';

const MAX_TOOLS: number = 8;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private static arrows: {
    down: string[],
    up: string[],
    left: string[],
    right: string[]
  } = {
    down: [
      'ArrowDown',
      'Down'
    ],
    up: [
      'ArrowUp',
      'Up'
    ],
    left: [
      'ArrowLeft',
      'Left',
    ],
    right: [
      'ArrowRight',
      'Right'
    ]
  };
  public environment = environment;
  /** @var {Tool[]} tool List of tool available */
  public tools: Tool[] = [];
  /** @var {boolean} [fullList=false] True if tool list is currently expanded */
  public fullList: boolean = false;
  /** @var {boolean} [listExpandable=true] True is tool list is expendable */
  public listExpendable: boolean = true;
  /** @var {boolean} [listExpandable=true] True is tool list was expanded by user interaction */
  public manuallyExpanded: boolean = false;
  public faLinkedIn: BrandIconDefinition = faLinkedinIn;
  public faGithub: BrandIconDefinition = faGithub;
  public faDesktop: SolidIconDefinition = faDesktop;
  /** @var {HTMLElement} selectedTool Currently selected tool */
  private selectedTool;

  private loadToolsSubscription: Subscription;

  constructor(private toolService: ToolService,
              private el: ElementRef,
              private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'DevStroke, some tools to help developers'},
      {name: 'author', content: 'Damien JARRY'},
      {name: 'keywords', content: 'devstroke,developer,help,sidekick'}
    ]);
  }

  private static capitalizeFirstLetter(string: string): string {
    return string[0].toUpperCase() + string.substr(1);
  }

  public validateTool() {
    this.selectedTool.click();
  }

  public ngOnInit() {
    this.loadToolsSubscription = this.toolService.findMostUsed()
      .subscribe({
        error: error => {
          console.log('ERROR', error);
        },
        next: tools => {
          this.updateToolsList(tools);
          this.listExpendable = this.tools.length > MAX_TOOLS;
        }
      });
    // @TODO: Remove keyboard event listener on destroy
  }

  public ngOnDestroy() {
    this.loadToolsSubscription.unsubscribe();
  }

  public resetList() {
    if (!this.manuallyExpanded) {
      this.fullList = false;
    }
    this.toolService.findMostUsed().subscribe({
      next: searchResults => {
        this.updateToolsList(searchResults);
        this.listExpendable = this.tools.length > MAX_TOOLS;
      },
      error: error => {
        console.log('ERROR');
      }
    });
  }

  public updateFromSearch(searchResults) {
    this.updateToolsList(searchResults);
    this.fullList = true;
  }

  public expandList() {
    this.manuallyExpanded = true;
    this.fullList = true;
  }

  private updateToolsList(searchResults) {
    this.tools = [];
    for (const result of searchResults) {
      this.tools.push(result.tool);
    }
    // TODO: Little hack because after tools push, view is not instantly updated
    setTimeout(() => {
      const toolElements = this.getToolElements();
      if (toolElements.length > 0) {
        this.selectTool(<HTMLElement>toolElements[0]);
      }
    }, 0);
  }

  @HostListener('document:keydown', ['$event'])
  /**
   * Handle specific "keyDown" events
   * @param {KeyboardEvent} event
   * @returns void
   */
  private handleKeyboardEvent(event: KeyboardEvent): void {
    for (const [direction, keys] of Object.entries(HomeComponent.arrows)) {
      if (keys.includes(event.key)) {
        event.preventDefault();
        this.moveAmongstTools(direction);
        return;
      }
    }
    if (event.key === 'Enter') {
      this.validateTool();
    }
  }

  /**
   * Get all tool DOM elements
   * @returns HTMLCollection
   */
  private getToolElements(): HTMLCollection {
    return this.el.nativeElement.getElementsByClassName('tool');
  }

  private selectTool(tool: HTMLElement): void {
    if (!tool) {
      return;
    }
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
   * @param {'left' | 'right' | 'down' | 'up'} direction
   * @returns void
   */
  private moveAmongstTools(
    direction: string
  ): void {
    const tools = this.getToolElements();
    if (tools.length === 0) {
      return;
    }
    const currentToolIndex = Array.from(this.selectedTool.parentNode.children).indexOf(this.selectedTool);
    const nextIndex = DomMoveService['move' + HomeComponent.capitalizeFirstLetter(direction)](tools, currentToolIndex);
    this.moveTo(nextIndex);
  }

  private moveTo(index: number): void {
    const tools = this.getToolElements();
    const countElementsByLine = DomMoveService.countElementsByLine(tools);
    this.selectTool(<HTMLElement>tools[index]);
    // check current line
    if (Math.ceil((index + 1) / countElementsByLine) > 2) {
      this.expandList();
    }
  }
}
