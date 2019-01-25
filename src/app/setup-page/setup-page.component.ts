import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../services/playerInfo/player-info.service';
import {LoginServiceService} from '../services/auth/login-service.service';
import {Player} from '../interfaces/player';
import {AngularFirestore} from 'angularfire2/firestore'

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {

  previousPlayers: Player[] = [];

  get playerInfo() {
    return this.afs.collection('players').doc(this.loginService.playerName).ref.onSnapshot(doc => {
      this.playerInfoService.playerInfo = doc.data() as Player;})
  };

  constructor(
      private loginService: LoginServiceService,
      private playerInfoService: PlayerInfoService,
      private afs: AngularFirestore
  ) {
    afs.collection('players').get().subscribe(documents => {
      documents.forEach(doc => {
        console.log(doc.data());
        this.previousPlayers.push(doc.data() as Player);
      })
    })
  }

  ngOnInit() {
  }

  saveGameToFirebase() {
    this.playerInfoService.saveGameToFirebase();
  }
}
