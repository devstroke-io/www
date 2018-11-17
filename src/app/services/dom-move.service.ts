import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomMoveService {

  public static moveUp(elements: HTMLCollection, currentIndex: number): number {
    const countElementsByLine = DomMoveService.countElementsByLine(elements);
    let nextIndex = currentIndex - countElementsByLine;
    if (nextIndex < 0) {
      nextIndex = elements.length - (countElementsByLine - (currentIndex % countElementsByLine));
    }
    return nextIndex;
  }

  public static moveRight(elements: HTMLCollection, currentIndex: number): number {
    const countElementsByLine = this.countElementsByLine(elements);
    const borders = DomMoveService.getBoundaries(currentIndex, countElementsByLine);
    let nextIndex = currentIndex + 1;
    if (nextIndex % countElementsByLine === 0) {
      nextIndex = borders.min;
    }
    return nextIndex;
  }

  public static moveDown(elements: HTMLCollection, currentIndex: number): number {
    const countElementsByLine = DomMoveService.countElementsByLine(elements);
    const countColumns = Math.ceil(elements.length / countElementsByLine);
    const currentColumn = Math.ceil((currentIndex + 1) / countElementsByLine);
    const currentIndexNextLine = currentIndex + countElementsByLine;
    let nextIndex = Math.min(currentIndexNextLine, elements.length - 1);
    if (currentColumn + 1 > countColumns) {
      // go top
      nextIndex = currentIndex % countElementsByLine;
    }
    return nextIndex;
  }

  public static moveLeft(elements: HTMLCollection, currentIndex: number): number {
    const countElementsByLine = DomMoveService.countElementsByLine(elements);
    const borders = DomMoveService.getBoundaries(currentIndex, countElementsByLine);
    let nextIndex = currentIndex - 1;
    if (nextIndex < borders.min) {
      nextIndex = borders.max;
    }
    return nextIndex;
  }

  /**
   * Count max elements on the first line
   * @returns number | null
   */
  public static countElementsByLine(elements: HTMLCollection): number {
    if (elements.length === 0) {
      return null;
    }
    let offsetLeft = 0,
      count = 0;
    for (let index = 0, n = elements.length; index < n; index++) {
      if ((<HTMLElement>elements[index]).offsetLeft < offsetLeft) {
        break;
      }
      count = index + 1;
      offsetLeft = (<HTMLElement>elements[index]).offsetLeft;
    }
    return count;
  }

  private static getBoundaries(currentIndex, countElementsByLine): {min: number, max: number} {
    const currentLine = Math.ceil((currentIndex + 1) / countElementsByLine);
    return {
      min: (currentLine - 1) * countElementsByLine,
      max: (currentLine * countElementsByLine) - 1
    };
  }
}
