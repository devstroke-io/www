import {TestBed} from '@angular/core/testing';
import {AppLoadService} from './app-load.service';

class MockImageFail {
  public onerror: Function;
  private _src: string;

  set src(src) {
    this._src = src;
    if (this.onerror) {
      this.onerror();
    }
  }
}

describe('AppLoadService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: 'Image', useValue: Image}]
    });
  });

  it('should be created', () => {
    const service = TestBed.get(AppLoadService);
    expect(service).toBeTruthy();
  });

  it('should resolve with webP', (done) => {
    const service = TestBed.get(AppLoadService);
    service.initializeApp().then((supportWebP) => {
      expect(supportWebP).toBe(true);
      done();
    });
  });

  it('should not resolve without webP (A)', (done) => {
    TestBed.overrideProvider('Image', {useValue: undefined});
    const service = TestBed.get(AppLoadService);
    service.initializeApp().then((supportWebP) => {
      expect(supportWebP).toBe(false);
      done();
    });
  });

  it('should not resolve without webP (B)', (done) => {
    TestBed.overrideProvider('Image', {useValue: MockImageFail});
    const service = TestBed.get(AppLoadService);
    service.initializeApp().then((supportWebP) => {
      expect(supportWebP).toBe(false);
      done();
    });
  });
});
