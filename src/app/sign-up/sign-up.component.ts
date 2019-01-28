import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../services/auth/login-service.service';
import {Router} from '@angular/router';
import {PlayerInfoService} from '../services/playerInfo/player-info.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Player} from '../interfaces/player';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private playerInfoService: PlayerInfoService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.loginService.signInPopupGoogle()
      .then(data => {
        this.loginService.playerName = data.user.displayName;
        this.loginService.loggedIn = true;
      });
  }

  // signOut() {
  //   this.loginService.signOut();
  // }
}
