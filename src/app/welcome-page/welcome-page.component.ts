import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../services/auth/login-service.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  playerDisplayName: string;

  constructor(private loginService: LoginServiceService) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.loginService.signInPopupGoogle()
      .then(data => {
        this.playerDisplayName = data.user.displayName;
        console.log(data);
      });
  }

  signOut() {
    this.loginService.signOut();
  }
}
