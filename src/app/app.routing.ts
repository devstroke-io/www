import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ToolComponent} from './components/tool/tool.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tool/:id', component: ToolComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const Routing = RouterModule.forRoot(appRoutes);
