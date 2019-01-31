import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Player } from '../interfaces/player';
import {LoginServiceService} from '../services/auth/login-service.service';
import {PlayerInfoService} from '../services/playerInfo/player-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statspage',
  templateUrl: './statspage.component.html',
  styleUrls: ['./statspage.component.scss']
})
export class StatspageComponent implements OnInit {

  constructor(private afs: AngularFirestore,
              private loginService: LoginServiceService,
              private playerInfoService: PlayerInfoService,
              private router: Router
  ) {
    if(!this.loginService.loggedIn) {
      this.router.navigate(['welcomePage']);
    }
  }

  async ngOnInit() {
    await this.afs.collection('players').doc(this.loginService.playerName).ref.onSnapshot(doc => {
      this.playerInfoService.playerInfo = doc.data() as Player;
    })
  }
}
