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
      this.toastService.push('Nothing to copy !', 'Busted', 3000, {some: element.value});
      return;
    }
    try {
      element.select();
      document.execCommand('copy');
      this.toastService.push('Successful copy to clipboard', 'Yeepee', 3000, {some: element.value});
    } catch (error) {
      this.toastService.push('Failed copy to clipboard', 'Sigh...', 3000, {some: element.value});
    }
  }
}
