import {Component, OnInit} from '@angular/core';
import {PushData, ToastService} from '../../../modules/toast/services/toast.service';

const TOAST_EMPTY: PushData = {
  message: 'Nothing to copy !',
  action: 'Busted'
};
const TOAST_SUCCESS: PushData = {
  message: 'Successful copy to clipboard',
  action: 'Yeepee'
};
const TOAST_FAIL: PushData = {
  message: 'Failed copy to clipboard',
  action: 'Sigh...'
};

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

  constructor(private toastService: ToastService) {
  }

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
      this.toast(TOAST_EMPTY);
      return;
    }
    try {
      element.select();
      document.execCommand('copy');
      this.toast(TOAST_SUCCESS);
    } catch (error) {
      this.toast(TOAST_FAIL);
    }
  }

  private toast(toast: PushData) {
    this.toastService.push({
      message: toast.message,
      action: toast.action,
      delay: 3000
    });
  }
}
