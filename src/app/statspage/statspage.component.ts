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

  foundDuplicate: boolean = false;

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
    this.cleanBeaten();
    this.cleanLost();
  }

  cleanBeaten() {
    let playerRepeatCount: number = 0;

    this.playerInfoService.playerInfo.playersBeaten.forEach((player) => {
      this.foundDuplicate = false;

      for(let x = 0; x < this.playerInfoService.playerInfo.playersBeaten.length; x++) {
        if(player == this.playerInfoService.playerInfo.playersBeaten[x]) {
          playerRepeatCount += 1;
        }
      }

      if(!this.beatenArray) {
        this.beatenArray = ([{'name': player, 'timesBeaten': playerRepeatCount}]);
      }
      else {
        for(let y = 0; y < this.beatenArray.length; y++) {
          if(this.beatenArray[y].name == player) {
            this.foundDuplicate = true;
          }
        }

        if(!this.foundDuplicate) {
          this.pushBeaten(player, playerRepeatCount);
        }
      }

      playerRepeatCount = 0;
    });
  }

  pushBeaten(beatenPlayer, playerRepeatCount) {
    this.beatenArray.push({name: beatenPlayer, timesBeaten: playerRepeatCount});
  }

  cleanLost() {
    let playerRepeatCount: number = 0;

    this.playerInfoService.playerInfo.playersLostTo.forEach((player) => {
      this.foundDuplicate = false;

      for(let x = 0; x < this.playerInfoService.playerInfo.playersLostTo.length; x++) {
        if(player == this.playerInfoService.playerInfo.playersLostTo[x]) {
          playerRepeatCount += 1;
        }
      }

      if(!this.lostArray) {
        this.lostArray = ([{'name': player, 'timesLostTo': playerRepeatCount}]);
      }
      else {
        for(let y = 0; y < this.lostArray.length; y++) {
          if(this.lostArray[y].name == player) {
            this.foundDuplicate = true;
          }
        }

        if(!this.foundDuplicate) {
          this.pushLost(player, playerRepeatCount);
        }
      }

      playerRepeatCount = 0;
    });
  }

  pushLost(lostPlayer, playerRepeatCount) {
    this.lostArray.push({name: lostPlayer, timesLostTo: playerRepeatCount})
  }

}
