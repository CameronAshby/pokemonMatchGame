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
    return this.afs.collection('players').doc(this.loginService.playerName).ref.onSnapshot(doc => {
      this.playerInfoService.playerInfo = doc.data() as Player;
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
    this.router.navigate(['setupPage']);
  }

  viewProfile() {
    this.router.navigate(['statsPage']);
  }

  saveToFirebase() {
    console.log(this.playerInfoService.playerInfo);
    if(!this.playerInfoService.playerInfo) {
      this.playerInfoService.saveToFirebase(this.loginService.playerName, {
        name: this.loginService.playerName,
        gamesLost: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        playersBeaten: [],
        playersLostTo: [],
        score: 0
      })
    }
    else {
      this.playerInfoService.saveToFirebase(this.loginService.playerName, {
        name: this.loginService.playerName,
        gamesLost: this.playerInfoService.playerInfo.gamesLost,
        gamesPlayed: this.playerInfoService.playerInfo.gamesPlayed,
        gamesWon: this.playerInfoService.playerInfo.gamesWon,
        playersBeaten: this.playerInfoService.playerInfo.playersBeaten,
        playersLostTo: this.playerInfoService.playerInfo.playersLostTo,
        score: this.playerInfoService.playerInfo.score
      })
    }
  }
}
