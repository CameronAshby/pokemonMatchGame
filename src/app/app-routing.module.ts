import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import { StatspageComponent} from './statspage/statspage.component';
import {SetupPageComponent} from './setup-page/setup-page.component';
import {GamepageComponent} from "./gamepage/gamepage.component";

const routes: Routes = [
  {
    path: 'welcomePage',
    component: WelcomePageComponent
  },
  {
    path: 'setupPage',
    component: SetupPageComponent
  },
  {
    path: 'statsPage',
    component: StatspageComponent
  },
  {
    path: 'gamepage',
    component: GamepageComponent
  },
  {
    path: '**',
    redirectTo: 'welcomePage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
