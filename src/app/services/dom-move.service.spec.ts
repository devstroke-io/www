import { TestBed } from '@angular/core/testing';

import { DomMoveService } from './dom-move.service';

describe('DomMoveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomMoveService = TestBed.get(DomMoveService);
    expect(service).toBeTruthy();
  });
});
