import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {Base64ToolComponent, JwtDebuggerComponent, ToolComponent} from './components/tool';
import {Routing} from './app.routing';
import {SearchComponent} from './components/search/search.component';
import {FormsModule} from '@angular/forms';
import {ToastModule} from './modules/toast/toast.module';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import * as CodeMirror from 'codemirror';
import {StylishTextareaModule} from './modules/stylish-textarea/stylish-textarea.module';

// TODO: move that anywhere else.
CodeMirror.defineMode('jwt', () => {
  return {
    startState: () => {
      return {
        headerFound: false,
        payloadFound: false,
        signatureFound: false
      };
    },
    token: (stream, state) => {
      if (stream.next() === '.') {
        return null;
      }

      if (!state.headerFound) {
        stream.next();
        if (stream.skipTo('.')) {
          state.headerFound = true;
        } else {
          stream.skipToEnd();
        }
        return 'keyword';
      }

      if (!state.payloadFound) {
        stream.next();
        if (stream.skipTo('.')) {
          state.payloadFound = true;
        } else {
          stream.skipToEnd();
        }
        return 'number';
      }

      stream.skipToEnd();
      return 'string';
    }
  };
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolComponent,
    SearchComponent,
    Base64ToolComponent,
    JwtDebuggerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    ToastModule,
    StylishTextareaModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
