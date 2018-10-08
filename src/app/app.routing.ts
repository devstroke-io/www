import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ToolComponent, Base64ToolComponent, JwtDebuggerComponent} from './components/tool';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'tool',
    component: ToolComponent,
    children: [
      {path: '', redirectTo: '../', pathMatch: 'full'},
      {path: 'base64-encode-decode', component: Base64ToolComponent},
      {path: 'jwt-debugger', component: JwtDebuggerComponent},
    ]
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
