import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-nginx';

declare var Prism: any;

// Prism tries to highlight the whole document on DOMContentLoad.
document.removeEventListener('DOMContentLoaded', Prism.highlightAll);

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  // public highlight(code: string, lang: string) {
  //   return Prism.highlight(code.trim(), Prism.languages[lang]);
  // }

  public highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
