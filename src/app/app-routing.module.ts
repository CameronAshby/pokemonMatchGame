import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilePageComponent} from './players/profile-page/profile-page.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
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
    path: 'playerProfile',
    component: ProfilePageComponent
  },
  {
    path: '**',
    redirectTo: 'welcomePage/signIn'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
