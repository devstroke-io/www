import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });

  it('should create a toast', () => {
    const service: ToastService = TestBed.get(ToastService);
    const currentToastsLength = service.toasts.length;
    service.push({
      message: 'test',
      action: 'test_action',
      delay: 3000,
      data: 'test_data'
    });
    expect(service.toasts.length).toBe(currentToastsLength + 1);
  });

  it('should create a toast with delay = 2000', () => {
    const service: ToastService = TestBed.get(ToastService);
    service.push({
      message: 'test',
      action: 'test_action',
      data: 'test_data'
    });
    expect(service.toasts[service.toasts.length - 1].delay).toBe(2000);
  });

  it('should dismiss a toast (dismiss)', () => {
    const service: ToastService = TestBed.get(ToastService);
    const currentToastsLength = service.toasts.length;
    service.push({
      message: 'test',
      action: 'test_action',
      delay: 5000,
      data: 'test_data'
    });
    expect(service.toasts.length).toBe(currentToastsLength + 1);
    const lastToast = service.toasts[service.toasts.length - 1];
    lastToast.dismiss();
    expect(service.toasts.length).toBe(currentToastsLength);
  });

  it('should dismiss a toast (action)', () => {
    const service: ToastService = TestBed.get(ToastService);
    const currentToastsLength = service.toasts.length;
    service.push({
      message: 'test',
      action: 'test_action',
      delay: 5000,
      data: 'test_data'
    });
    expect(service.toasts.length).toBe(currentToastsLength + 1);
    const lastToast = service.toasts[service.toasts.length - 1];
    lastToast.onAction();
    expect(service.toasts.length).toBe(currentToastsLength);
  });

  it('should dismiss a toast (timeout)', (done) => {
    const service: ToastService = TestBed.get(ToastService);
    const currentToastsLength = service.toasts.length;
    service.push({
      message: 'test',
      action: 'test_action',
      delay: 1000,
      data: 'test_data'
    });
    expect(service.toasts.length).toBe(currentToastsLength + 1);
    setTimeout(() => {
      expect(service.toasts.length).toBe(currentToastsLength);
      done();
    }, 1000);
  });

  it('should dismiss last toast', () => {
    const service: ToastService = TestBed.get(ToastService);
    const currentToastsLength = service.toasts.length;
    service.push({
      message: 'test',
      action: 'test_action',
      delay: 5000,
      data: 'test_data'
    });
    service.push({
      message: 'test',
      action: 'test_action',
      delay: 5000,
      data: 'test_data'
    });
    expect(service.toasts.length).toBe(currentToastsLength + 2);
    const lastToast = service.toasts[service.toasts.length - 1];
    lastToast.dismiss();
    expect(service.toasts.length).toBe(currentToastsLength + 1);
  });
});
