import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {CodeService} from '../../modules/code/services/code.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit, AfterViewInit {

  constructor(private codeService: CodeService) { }

  ngOnInit() {
  }

  /**
   * Highlight blog post when it's ready
   */
  ngAfterViewInit() {
    this.codeService.highlightAll();
  }
}
