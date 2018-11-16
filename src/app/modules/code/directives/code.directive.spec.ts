import {Component, DebugElement, ElementRef} from '@angular/core';
import {CodeDirective} from './code.directive';
import {CodeService} from '../services/code.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <div class="container">
      <div appCode lang="sh">echo 'toto'</div>
    </div>`
})
class TestCodeComponent {
}

describe('CodeDirective', () => {
  let component: TestCodeComponent;
  let fixture: ComponentFixture<TestCodeComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCodeComponent, CodeDirective]
    });
    fixture = TestBed.createComponent(TestCodeComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('.container > div'));
  });

  it('should create an instance', () => {
    const directive = new CodeDirective(new CodeService({}), new ElementRef({}));
    expect(directive).toBeTruthy();
  });

  it('should create a "pre" tag', (done) => {
    fixture.detectChanges();
    expect(element.nativeElement.style.display).toBe('none');
    // @TODO: use ChangeDetectorRef
    setTimeout(() => {
      expect(element.nativeElement.parentNode.getElementsByTagName('pre').length).toBe(1);
      done();
    }, 0);
  });
});
