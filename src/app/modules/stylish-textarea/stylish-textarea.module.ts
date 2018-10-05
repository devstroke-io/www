import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StylishTextareaComponent} from './components/stylish-textarea/stylish-textarea.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [StylishTextareaComponent],
  declarations: [StylishTextareaComponent]
})
export class StylishTextareaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StylishTextareaModule,
      providers: []
    };
  }
}
