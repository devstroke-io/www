import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ToastModule,
    StylishTextareaModule,
    CodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
