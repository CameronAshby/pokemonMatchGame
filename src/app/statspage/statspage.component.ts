import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Player } from '../interfaces/player';
import {LoginServiceService} from '../services/auth/login-service.service';
import {PlayerInfoService} from '../services/playerInfo/player-info.service';

@Component({
  selector: 'app-statspage',
  templateUrl: './statspage.component.html',
  styleUrls: ['./statspage.component.scss']
})
export class StatspageComponent implements OnInit {

  constructor(private afs: AngularFirestore, private loginService: LoginServiceService, private playerInfoService: PlayerInfoService) {}

  async ngOnInit() {
    await this.afs.collection('players').doc(this.loginService.playerName).ref.onSnapshot(doc => {
      this.playerInfoService.playerInfo = doc.data() as Player;
    })
  }
}
