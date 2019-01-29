import { Component, OnInit } from '@angular/core';
import { PokemonService} from '../services/apiService/apistuff.service';
import {Card} from '../interfaces/card';
import {PlayerInfoService} from '../services/playerInfo/player-info.service';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.scss']
})
export class GamepageComponent implements OnInit {

  cardsArray: Card[] = [];
  randomCard: Card;

  constructor(private pokemonservice: PokemonService, private playerInfoService: PlayerInfoService) {
    for(let i = 0; i < playerInfoService.gameInfo.matchesCount; i++) {
      this.cardsArray[i] = {
        cardId: '',
        image: '',
        matchId: i+1
      };
    }
    console.log(playerInfoService.gameInfo.matchesCount);
    for(let i = playerInfoService.gameInfo.matchesCount; i < pokemonservice.cardCount; i++) {
      console.log(i);
      this.cardsArray[i] = {
        cardId: '',
        image: '',
        matchId: this.cardsArray[i-playerInfoService.gameInfo.matchesCount].matchId
      }
    }

    console.log(this.cardsArray);
  }

  ngOnInit() {
     // this.pokemonservice.getPokemon();
  }

  getRandomCard() {
    return Math.floor((Math.random() * 999));
  }
}
