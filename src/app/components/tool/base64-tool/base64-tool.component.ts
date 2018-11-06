import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../modules/toast/services/toast.service';

@Component({
  selector: 'app-base64-tool',
  templateUrl: './base64-tool.component.html',
  styleUrls: ['./base64-tool.component.scss']
})
export class Base64ToolComponent implements OnInit {

  public encoded: string;

  public decoded: string;

  public copyEnabled: boolean = false;

  public invalidEncoded: boolean = false;

  private toasts = {
    empty: {
      message: 'Nothing to copy !',
      action: 'Busted'
    },
    success: {
      message: 'Successful copy to clipboard',
      action: 'Yeepee'
    },
    fail: {
      message: 'Failed copy to clipboard',
      action: 'Sigh...'
    }
  };

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.copyEnabled = document.queryCommandSupported('copy');
  }

  public updateEncoded(event: InputEvent) {
    this.invalidEncoded = false;
    const target = <HTMLInputElement> event.target;
    try {
      this.decoded = atob(target.value);
    } catch (e) {
      this.decoded = '';
      this.invalidEncoded = true;
    }
  }

  public updateDecoded(event: InputEvent) {
    const target = <HTMLInputElement> event.target;
    this.encoded = btoa(target.value);
  }

  public copyToClipboard(element: HTMLInputElement) {
    if (!element.value) {
      this.toast('empty');
      return;
    }
    try {
      element.select();
      document.execCommand('copy');
      this.toast('success');
    } catch (error) {
      this.toast('fail');
    }
  }

  private toast(type) {
    if (type in Object.keys(this.toasts)) {
      this.toastService.push({
        message: this.toasts[type].message,
        action: this.toasts[type].action,
        delay: 3000
      });
    }
  }
}
