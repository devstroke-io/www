import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastService} from './services/toast.service';
import {ToastComponent} from './components/toast/toast.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
  providers: [ToastService]
})
export class ToastModule {
}
