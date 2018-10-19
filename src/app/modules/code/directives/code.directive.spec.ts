import {ElementRef} from '@angular/core';
import {CodeDirective} from './code.directive';
import {CodeService} from '../services/code.service';

describe('CodeDirective', () => {
  it('should create an instance', () => {
  const directive = new CodeDirective(new CodeService({}), new ElementRef({}));
    expect(directive).toBeTruthy();
  });
});
