import {TestBed} from '@angular/core/testing';
import {AppLoadModule} from './app-load.module';
import {APP_INITIALIZER} from '@angular/core';
import {ToastModule} from '../toast/toast.module';

describe(`AppLoadModule`, () => {
  let appLoadModule: AppLoadModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppLoadModule]
    });
  });

  beforeEach(() => {
    appLoadModule = new ToastModule();
  });

  it('should create an instance', () => {
    expect(appLoadModule).toBeTruthy();
  });

  it('should append a promise on APP_INITIALIZER', () => {
    const appInitializer = TestBed.get(APP_INITIALIZER);
    const promise = appInitializer[appInitializer.length - 1]();
    promise.then((data: boolean) => {
      expect(typeof data).toBe('boolean');
    });
    expect(typeof promise.then).toBe('function');
  });
});
