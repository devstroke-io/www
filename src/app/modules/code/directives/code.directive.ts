import {Directive, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import {CodeService} from '../services/code.service';

@Directive({
  selector: '[appCode]'
})
export class CodeDirective implements OnInit {

  @HostBinding('style.display') hostDisplay: string = 'none';
  @Input() lang = '';

  constructor(private codeService: CodeService,
              private el: ElementRef) {
  }

  private static stringAsDom(str: string) {
    const div = document.createElement('div');
    div.innerHTML = str.trim();
    return div.firstChild;
  }

  ngOnInit() {
    const data = this.el.nativeElement.innerHTML;
    let content = `<pre class="line-numbers">`;
    content += `<code class="language-${this.lang}">${data}</code>`;
    content += `</pre>`;
    this.el.nativeElement.parentNode.insertBefore(CodeDirective.stringAsDom(content), this.el.nativeElement.nextSibling);
    // @TODO: use ChangeDetectorRef
  }
}
