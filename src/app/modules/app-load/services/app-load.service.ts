import { Injectable } from '@angular/core';
import {Promise} from 'es6-promise';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  constructor() { }

  initializeApp(): Promise<any> {
    return new Promise((resolve) => {
      console.log(`initializeApp:: inside promise`);
      if (typeof Image === 'undefined') {
        resolve();
        return;
      }
      const webP = new Image();
      webP.onload = () => {
        console.log(`initializeApp:: WebP support: true`);
        environment.webP = true;
        resolve();
      };
      webP.onerror = () => {
        console.log(`initializeApp:: WebP support: false`);
        resolve();
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
}
