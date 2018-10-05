import {Component, ElementRef, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-jwt-debugger',
  templateUrl: './jwt-debugger.component.html',
  styleUrls: ['./jwt-debugger.component.scss']
})
export class JwtDebuggerComponent implements OnInit {
  public decodedHeader;

  public decodedPayload;

  public transformer = JwtDebuggerComponent.transformer;

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {
  }

  public static transformer(value) {
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\r\n|\r|\n/g, '<br>')
      .replace(
        /^([^\.]+)?((\.)([^\.]+))?((\.)(.*))?/gi,
        '<span class="header">$1</span>$3<span class="payload">$4</span>$6<span class="signature">$7</span>'
      );
  }

  public ngOnInit() {
  }

  public onChange(value) {
    console.log('CHANGE', value);
    const parts = value.split('.');
    let header, payload, signature;
    parts.push(parts.splice(3 - 1).join('.'));
    [header, payload, signature] = parts;
    // decode header
    let decodeHeaderError = null;
    try {
      this.decodedHeader = atob(header);
    } catch (error) {
      this.decodedHeader = null;
      decodeHeaderError = 'bad_base64';
    }
    try {
      this.decodedHeader = JSON.parse(this.decodedHeader);
    } catch (error) {
      this.decodedHeader = null;
      decodeHeaderError = 'bad_json';
    }
    if (this.decodedHeader) {
      this.decodedHeader = JSON.stringify(this.decodedHeader, null, '  ');
    }
    // decode payload
    let decodePayloadError = null;
    try {
      this.decodedPayload = atob(payload);
    } catch (error) {
      this.decodedPayload = null;
      decodePayloadError = 'bad_base64';
    }
    try {
      this.decodedPayload = JSON.parse(this.decodedPayload);
    } catch (error) {
      this.decodedPayload = null;
      decodePayloadError = 'bad_json';
    }
    if (this.decodedPayload) {
      this.decodedPayload = JSON.stringify(this.decodedPayload, null, '  ');
    }
  }
}
