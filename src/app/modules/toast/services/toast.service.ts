import {Injectable} from '@angular/core';
import {Toast} from '../models/toast.model';

export interface PushData {
  message: string;
  action?: string;
  delay?: number;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts: Toast[] = [];

  constructor() {
  }

  /**
   * Add a toast in the list
   * @param {PushData} data
   */
  public push(data: PushData) {
    if (!data.delay) {
      data.delay = 2000;
    }
    const toast = new Toast();
    this.toasts.push(toast);
    toast.message = data.message;
    toast.action = data.action;
    toast.delay = data.delay;
    toast.data = data.data;
    toast.onDismiss.subscribe(() => {
      this.dismissToast(toast);
    });
    toast.start();
    return toast;
  }

  private dismissToast(toast: Toast): void {
    for (const [index, loopToast] of this.toasts.entries()) {
      if (loopToast === toast) {
        this.toasts.splice(index, 1);
      }
    }
  }
}
