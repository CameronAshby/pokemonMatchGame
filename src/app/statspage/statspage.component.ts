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
  beatenArray = [];
  lostArray = [];

  addBeaten: boolean = false;

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
      this.cleanArrays();
    })
  }

  cleanArrays() {
    let playerRepeatCount: number = 0;

    this.playerInfoService.playerInfo.playersBeaten.forEach((player) => {
      for(let x = 0; x < this.playerInfoService.playerInfo.playersBeaten.length; x++) {
        if(player == this.playerInfoService.playerInfo.playersBeaten[x]) {
          playerRepeatCount += 1;
        }
      }

      this.beatenArray.forEach((beatenPlayer) => {
        if((beatenPlayer.name != player)) {
          this.addBeaten = true;
        }
      });

      if(this.addBeaten  && !this.beatenArray.includes({name: player, timesBeaten: playerRepeatCount})) {
        this.pushBeaten(player, playerRepeatCount);
        this.addBeaten = false;
      }

      if(this.beatenArray.length == 0) {
        this.beatenArray = ([{'name': player, 'timesBeaten': playerRepeatCount}]);
      }

      playerRepeatCount = 0;
    });
    console.log(this.beatenArray);
  }

  pushBeaten(beatenPlayer, playerRepeatCount) {
    this.beatenArray.push({name: beatenPlayer, timesBeaten: playerRepeatCount});
  }

}
