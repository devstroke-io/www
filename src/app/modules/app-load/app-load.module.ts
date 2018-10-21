import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppLoadService} from './services/app-load.service';

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AppLoadService,
    {provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true},
  ]
})
export class AppLoadModule {
}
