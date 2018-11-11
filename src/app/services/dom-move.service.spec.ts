import { TestBed } from '@angular/core/testing';

import { DomMoveService } from './dom-move.service';

describe('DomMoveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    const containerFilled = document.createElement('div');
    containerFilled.id = 'filled';
    containerFilled.style.width = '300px';
    containerFilled.style.position = 'relative';
    for ( let i = 0; i < 4; i++) {
      const element = document.createElement('p');
      element.style.width = '150px';
      element.style.cssFloat = 'left';
      containerFilled.append(element);
    }
    const containerEmpty = document.createElement('div');
    containerEmpty.id = 'empty';
    document.body.append(containerFilled);
    document.body.append(containerEmpty);
  });

  it('should be created', () => {
    const service: DomMoveService = TestBed.get(DomMoveService);
    expect(service).toBeTruthy();
  });

  it('should count elements on first line', () => {
    const container = document.getElementById('filled');
    const elements = container.getElementsByTagName('p');
    expect(DomMoveService.countElementsByLine(elements)).toBe(2);
  });

  it('should not count elements on first line', () => {
    const container = document.getElementById('empty');
    const elements = container.getElementsByTagName('p');
    expect(DomMoveService.countElementsByLine(elements)).toBe(null);
  });

  it('should move to left', () => {
    const container = document.getElementById('filled');
    const elements = container.getElementsByTagName('p');
    expect(DomMoveService.moveLeft(elements, 0)).toBe(1);
    expect(DomMoveService.moveLeft(elements, 1)).toBe(0);
  });

  it('should move to right', () => {
    const container = document.getElementById('filled');
    const elements = container.getElementsByTagName('p');
    expect(DomMoveService.moveRight(elements, 1)).toBe(0);
    expect(DomMoveService.moveRight(elements, 0)).toBe(1);
  });

  it('should move up', () => {
    const container = document.getElementById('filled');
    const elements = container.getElementsByTagName('p');
    expect(DomMoveService.moveUp(elements, 0)).toBe(2);
    expect(DomMoveService.moveUp(elements, 2)).toBe(0);
  });

  it('should move down', () => {
    const container = document.getElementById('filled');
    const elements = container.getElementsByTagName('p');
    expect(DomMoveService.moveDown(elements, 2)).toBe(0);
    expect(DomMoveService.moveDown(elements, 0)).toBe(2);
  });
});
