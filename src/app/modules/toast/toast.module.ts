import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

// @TODO: Why ?
// export * from './service/toast.service';

import {ToastService} from './services/toast.service';
import {ToastComponent} from './components/toast/toast.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
  providers: [ToastService]
})
export class ToastModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [ToastService]
    };
  }
}
