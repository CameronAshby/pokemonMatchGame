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
  mediumMatches: number;
  largeMatches: number;
  players = new FormControl();

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
      private pokemonService: PokemonService
  ) {
    afs.collection('players').get().subscribe(documents => {
      documents.forEach(doc => {
        this.previousPlayers.push(doc.data() as Player);
      });
    });
  }

  ngOnInit() {
  }

  saveGameToFirebase() {
    this.playerInfoService.saveGameToFirebase();
  }

  gameStart() {
    this.pokemonService.getPokemon();
    this.router.navigate(['gamePage']);
  }

  buildMatches() {
    this.smallMatches = this.playerInfoService.gameInfo.playerCount * 2;
    this.largeMatches = this.playerInfoService.gameInfo.playerCount * 4;

    for(let i = 0; i < this.playerInfoService.gameInfo.playerCount; i++) {
      this.playerInfoService.gameInfo.playerScores[i] = 0;
    }
  }
}
