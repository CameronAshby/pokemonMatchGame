import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import {PlayerInfoService} from '../playerInfo/player-info.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  loggedIn: boolean = false;
  playerName: string = '';

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  signInPopupGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // Complete Promise to get necessary values after signing in
  }

  signOut() {
    this.afAuth.auth.signOut().then(data => {
      this.playerName = '';
      this.loggedIn = false;
      this.router.navigate(['welcomePage']);
    });
  }

  // Access current user: this.afAuth.auth.currentUser
}
