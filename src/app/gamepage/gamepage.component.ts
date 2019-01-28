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

  constructor(private pokemonservice: PokemonService, private playerInfoService: PlayerInfoService) {
    for(let i = 0; i < playerInfoService.gameInfo.matchesCount; i++) {
      this.cardsArray[i] = {
        cardId: '',
        image: '',
        matchId: i+1
      };
    }

    for(let i = playerInfoService.gameInfo.matchesCount; i < pokemonservice.cardCount; i++) {
      this.cardsArray[i] = {
        cardId: '',
        image: '',
        matchId: this.cardsArray[i-playerInfoService.gameInfo.matchesCount].matchId
      }
    }
  }

  ngOnInit() {
    this.pokemonservice.getPokemon();
  }

}
