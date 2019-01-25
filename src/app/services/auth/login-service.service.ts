import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  loggedIn: boolean = false;
  playerName: string = '';

  constructor(public afAuth: AngularFireAuth) { }

  signInPopupGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // Complete Promise to get necessary values after signing in
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  // Access current user: this.afAuth.auth.currentUser
}
