import {Inject, Injectable} from '@angular/core';
import {Promise} from 'es6-promise';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  private readonly image;

  constructor(@Inject('Image') image: typeof Image) {
    this.image = image;
  }

  initializeApp(): Promise<any> {
    return new Promise((resolve) => {
      console.log(`initializeApp:: inside promise`);
      if (typeof this.image === 'undefined') {
        console.log(`initializeApp:: Image undefined`);
        resolve(false);
        return;
      }
      const webP = new this.image();
      webP.onload = () => {
        console.log(`initializeApp:: WebP support: true`);
        environment.webP = true;
        resolve(true);
      };
      webP.onerror = () => {
        console.log(`initializeApp:: WebP support: false`);
        resolve(false);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
}
