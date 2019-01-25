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
      this.playerInfoService.playerInfo = doc.data() as Player;})
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
    if(!this.playerInfo) {
      this.playerInfoService.saveToFirebase(this.loginService.playerName, {
        name: this.playerInfoService.playerInfo.name,
        gamesLost: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        playersBeaten: [],
        playersLostTo: [],
        score: 0
      })
    }
  }
}
