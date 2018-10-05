import {Injectable} from '@angular/core';
import {Toast} from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts = [];

  constructor() {
  }

  /**
   * Add a toast in the list
   * @param {string} message
   * @param {string} [action=null]
   * @param {number} [delay=2000]
   * @param {any} [data=null]
   */
  public push(message: string, action: string = null, delay: number = 2000, data: any = null) {
    const toast = new Toast();
    this.toasts.push(toast);
    toast.message = message;
    toast.action = action;
    toast.delay = delay;
    toast.data = data;
    toast.onDismiss.subscribe(() => {
      for (const [index, loopToast] of this.toasts.entries()) {
        if (loopToast === toast) {
          this.toasts.splice(index, 1);
        }
      }
    });
    toast.start();
    return toast;
  }
}
