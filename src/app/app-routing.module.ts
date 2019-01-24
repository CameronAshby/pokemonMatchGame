import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilePageComponent} from './players/profile-page/profile-page.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import { StatspageComponent} from './statspage/statspage.component';

const routes: Routes = [
  {
    path: 'welcomePage',
    component: WelcomePageComponent
  },
  {
    path: 'playerProfile',
    component: ProfilePageComponent
  },
  {
    path: '**',
    redirectTo: 'statsPage'
  },
  {
    path: 'statsPage',
    component: StatspageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
