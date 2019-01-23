import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../services/auth/login-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(private loginService: LoginServiceService) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.loginService.signInPopupGoogle()
      .then(data => {
        this.loginService.playerName = data.user.displayName;
        console.log(data);
        this.loginService.loggedIn = true;
      });
  }

  // signOut() {
  //   this.loginService.signOut();
  // }
}
