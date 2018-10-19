import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stylish-textarea',
  templateUrl: './stylish-textarea.component.html',
  styleUrls: ['./stylish-textarea.component.scss']
})
export class StylishTextareaComponent implements OnInit {

  public fieldValue;
  public fakeFieldValue;
  public onBrowserChange = StylishTextareaComponent.onBrowserChange;
  @Output() public change: EventEmitter<string> = new EventEmitter();
  @Output() public focus: EventEmitter<void> = new EventEmitter();
  @Output() public blur: EventEmitter<void> = new EventEmitter();
  @Input() public transformer;
  private field: HTMLTextAreaElement;
  private fakeField: HTMLDivElement;

  public static onBrowserChange(event) {
    event.stopPropagation();
  }

  public constructor(private el: ElementRef) {
  }

  get value() {
    return this.fieldValue;
  }

  @Input() set value(v) {
    if (v !== this.fieldValue) {
      this.fieldValue = v;
      this.onChange(v);
    }
  }

  public ngOnInit() {
    this.field = <HTMLTextAreaElement> this.el.nativeElement.querySelector('textarea');
    this.fakeField = <HTMLDivElement> this.el.nativeElement.querySelector('div');
    if (!this.transformer) {
      this.transformer = value => value;
    }
  }

  public onChange(value) {
    this.fakeFieldValue = this.transformer(value);
    this.change.emit(value);
  }

  public onBlur() {
    this.blur.emit();
  }

  public onFocus() {
    this.focus.emit();
  }

  public onScroll() {
    this.fakeField.scrollTop = this.field.scrollTop;
  }
}
