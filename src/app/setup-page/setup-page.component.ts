import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../services/playerInfo/player-info.service';
import {LoginServiceService} from '../services/auth/login-service.service';
import {Player} from '../interfaces/player';
import {AngularFirestore} from 'angularfire2/firestore'
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {PokemonService} from '../services/apiService/apistuff.service';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {

  previousPlayers: Player[] = [];
  smallMatches: number;
  largeMatches: number;
  players = new FormControl();
  disablePlayers: boolean = false;

  get playerInfo() {
    return this.afs.collection('players').doc(this.loginService.playerName).ref.onSnapshot(doc => {
      this.playerInfoService.playerInfo = doc.data() as Player;
    });
  }

  constructor(
      private loginService: LoginServiceService,
      private playerInfoService: PlayerInfoService,
      private afs: AngularFirestore,
      private router: Router,
      private pokemonService: PokemonService,
  ) {
    this.pokemonService.pokemonSelectedSet = null;

    if(!this.loginService.loggedIn) {
      this.router.navigate(['welcomePage']);
    }
    afs.collection('players').get().subscribe(documents => {
      documents.forEach(doc => {
        this.previousPlayers.push(doc.data() as Player);
        let checkName = this.previousPlayers.pop();
        if(checkName.name != this.loginService.playerName) {
          this.previousPlayers.push(checkName);
        }
      });
    });
  }

  ngOnInit() {
    this.pokemonService.getPokemonSets()
      .then(data => {
        this.pokemonService.pokemonSets = data;
      });
  }

  saveGameToFirebase() {
    this.playerInfoService.saveGameToFirebase();
  }

  gameStart() {
    this.pokemonService.getPokemon();
    this.router.navigate(['gamePage']);
  }

  buildMatches() {
    if(this.playerInfoService.gameInfo.playerCount == 1) {
      this.playerInfoService.gameInfo.players.push(this.loginService.playerName);
    }

    if(this.playerInfoService.gameInfo.playerCount == 1) {
      this.smallMatches = 4;
      this.largeMatches = 8;
    }
    else {
      this.smallMatches = this.playerInfoService.gameInfo.playerCount * 2;
      this.largeMatches = this.playerInfoService.gameInfo.playerCount * 4;
    }

    for(let i = 0; i < this.playerInfoService.gameInfo.playerCount; i++) {
      this.playerInfoService.gameInfo.playerScores[i] = 0;
    }
  }

  checkPlayers() {
    if(this.playerInfoService.gameInfo.players.length == this.playerInfoService.gameInfo.playerCount-1) {
      this.disablePlayers = true;
      this.playerInfoService.gameInfo.players.push(this.loginService.playerName);
    }
  }

  resetPage() {
    this.disablePlayers = false;
    this.pokemonService.pokemonSelectedSet = null;
    this.playerInfoService.clearCurrentGame();
    this.router.navigate(['setupPage']);
  }
}
