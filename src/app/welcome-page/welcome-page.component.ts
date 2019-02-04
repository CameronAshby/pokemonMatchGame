import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../services/auth/login-service.service';
import {Router} from '@angular/router';
import {PlayerInfoService} from '../services/playerInfo/player-info.service';
import {Player} from '../interfaces/player';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  get playerInfo() {
    return this.afs.collection('players').doc(this.loginService.playerName).ref.onSnapshot(async doc => {
      this.playerInfoService.playerInfo = await doc.data() as Player;
      this.saveToFirebase();
      console.log('complete');
    });
  }

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private playerInfoService: PlayerInfoService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
  }

  newGame() {
    this.playerInfoService.clearCurrentGame();
    this.router.navigate(['setupPage']);
  }

  viewProfile() {
    this.router.navigate(['statsPage']);
  }

  saveToFirebase() {
    this.afs.collection('players').doc(this.loginService.playerName).ref.onSnapshot(async doc => {
      this.playerInfoService.playerInfo = await doc.data() as Player;

      if(!this.playerInfoService.playerInfo) {
        this.playerInfoService.saveToFirebase(this.loginService.playerName, {
          name: this.loginService.playerName,
          gamesLost: 0,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesTied: 0,
          playersBeaten: [],
          playersLostTo: [],
          score: 0,
          selected: false
        })
      }
      else {
        this.playerInfoService.saveToFirebase(this.loginService.playerName, {
          name: this.loginService.playerName,
          gamesLost: this.playerInfoService.playerInfo.gamesLost,
          gamesPlayed: this.playerInfoService.playerInfo.gamesPlayed,
          gamesWon: this.playerInfoService.playerInfo.gamesWon,
          gamesTied: this.playerInfoService.playerInfo.gamesTied,
          playersBeaten: this.playerInfoService.playerInfo.playersBeaten,
          playersLostTo: this.playerInfoService.playerInfo.playersLostTo,
          score: this.playerInfoService.playerInfo.score,
          selected: false
        })
      }
    });
  }

  logout() {
    this.loginService.signOut();
  }
}
