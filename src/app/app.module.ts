import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {Base64ToolComponent, JwtDebuggerComponent, ToolComponent} from './components/tool';
import {AppRoutingModule} from './app.routing';
import {SearchComponent} from './components/search/search.component';
import {FormsModule} from '@angular/forms';
import {ToastModule} from './modules/toast/toast.module';
import {StylishTextareaModule} from './modules/stylish-textarea/stylish-textarea.module';
import {DocsComponent} from './components/docs/docs.component';
import {CodeModule} from './modules/code/code.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppLoadModule} from './modules/app-load/app-load.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolComponent,
    SearchComponent,
    Base64ToolComponent,
    JwtDebuggerComponent,
    DocsComponent
  ],
  imports: [
    AppLoadModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ToastModule,
    StylishTextareaModule,
    CodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
