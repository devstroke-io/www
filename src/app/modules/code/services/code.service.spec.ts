import {TestBed} from '@angular/core/testing';
import {CodeService} from './code.service';
import {Component, OnInit, PLATFORM_ID} from '@angular/core';
import {CodeDirective} from '../directives/code.directive';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <div class="container">
      <pre><code class="language-sh">echo 'toto'</code></pre>
    </div>`
})
class TestCodeComponent implements OnInit {
  constructor(private codeService: CodeService) {
  }

  ngOnInit() {
    this.codeService.highlightAll();
  }
}


describe('CodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCodeComponent, CodeDirective],
      providers: [
        {provide: PLATFORM_ID, useValue: 'browser'},
      ],
    });
  });

  it('should be created', () => {
    const service: CodeService = TestBed.get(CodeService);
    expect(service).toBeTruthy();
  });

  it('should add a class to the "pre" tag', () => {
    TestBed.overrideProvider(PLATFORM_ID, {useValue: 'browser'});
    const fixture = TestBed.createComponent(TestCodeComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('.container pre.language-sh'));
    expect(element.length).toBe(1);
  });

  it('should not add a class to the "pre" tag', () => {
    TestBed.overrideProvider(PLATFORM_ID, {useValue: 'server'});
    const fixture = TestBed.createComponent(TestCodeComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('.container pre.language-sh'));
    expect(element.length).toBe(0);
  });
});
