import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilePageComponent} from './players/profile-page/profile-page.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
<<<<<<< HEAD
import {SetupPageComponent} from './setup-page/setup-page.component';
=======
import {SignUpComponent} from './sign-up/sign-up.component';

>>>>>>> 717b4b2dcd8dfca5b6302b03822c99c53bb34817
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
<<<<<<< HEAD
    redirectTo: 'setupPage'
=======
    redirectTo: 'welcomePage/signIn'
>>>>>>> 717b4b2dcd8dfca5b6302b03822c99c53bb34817
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
