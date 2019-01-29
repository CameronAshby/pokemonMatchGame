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
    this.pokemonservice.getPokemon()
      .then(data => {
          this.pokemonservice.pokemonArray = data;
          for(let i = 0; i < this.playerInfoService.gameInfo.matchesCount; i++) {
            this.cardsArray[i] = {
              cardId: '',
              image: '',
              matchId: i + 1
            };
          }


          for(let i = this.playerInfoService.gameInfo.matchesCount; i < this.pokemonservice.cardCount; i++) {
            this.cardsArray[i] = {
              cardId: '',
              image: '',
              matchId: this.cardsArray[i-this.playerInfoService.gameInfo.matchesCount].matchId
            }
          }
        }
      );
  }

  ngOnInit() {
  }

  async pullApi() {
    await this.pokemonservice.getPokemon();
  }
  getRandomCard() {
    return Math.floor((Math.random() * 999));
  }
}
