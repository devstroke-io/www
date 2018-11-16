import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeDirective} from './directives/code.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CodeDirective],
  exports: [CodeDirective]
})
export class CodeModule {
}
