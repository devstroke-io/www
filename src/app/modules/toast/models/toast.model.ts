import {v4 as uuid} from 'uuid';
import {EventEmitter} from '@angular/core';

export class Toast {
  public uuid: string;
  public message: string;
  public action: string;
  public delay: number;
  public data: any;
  public onDismiss: EventEmitter<any> = new EventEmitter();

  private dismissed: boolean = false;
  private timer: number;

  constructor() {
    this.uuid = uuid();
  }

  public start() {
    this.timer = window.setTimeout(() => {
      this.dismiss();
    }, this.delay);
  }

  public onAction() {
    this.dismiss();
  }

  public dismiss() {
    if (!this.dismissed) {
      this.dismissed = true;
      this.onDismiss.next(this.data);
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }
}
