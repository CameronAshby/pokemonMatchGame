import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import { StatspageComponent} from './statspage/statspage.component';
import {SetupPageComponent} from './setup-page/setup-page.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'welcomePage',
    component: WelcomePageComponent,
    children: [
      {
        path: 'signIn',
        component: SignUpComponent
      }
    ]
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
    path: '**',
    redirectTo: 'welcomePage/signIn'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
