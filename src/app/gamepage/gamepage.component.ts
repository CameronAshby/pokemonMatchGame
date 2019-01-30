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
  randomCardIndex: number;

  matchArray: Card[] = [];
  matchIndexArray: number[] = [];

  constructor(private pokemonservice: PokemonService, private playerInfoService: PlayerInfoService) {
  }

  ngOnInit() {
    this.pokemonservice.getPokemon()
      .then(data => {
          this.pokemonservice.pokemonArray = data;
          this.buildCards();
        }
      );
  }

  buildCards() {
    for(let i = 0; i < this.playerInfoService.gameInfo.matchesCount; i++) {
      this.getRandomCard();
      this.cardsArray[i] = {
        cardId: this.pokemonservice.pokemonArray[this.randomCardIndex].id + '',
        image: this.pokemonservice.pokemonArray[this.randomCardIndex].imageUrl,
        matchId: i+1,
        clicked: false
      };
    }

    for(let i = this.playerInfoService.gameInfo.matchesCount; i < this.pokemonservice.cardCount; i++) {
      this.cardsArray[i] = {
        cardId: this.cardsArray[i-this.playerInfoService.gameInfo.matchesCount].cardId,
        image: this.cardsArray[i-this.playerInfoService.gameInfo.matchesCount].image,
        matchId: this.cardsArray[i-this.playerInfoService.gameInfo.matchesCount].matchId,
        clicked: false
      }
    }
  }

  async pullApi() {
    await this.pokemonservice.getPokemon();
  }
  getRandomCard() {
    this.randomCardIndex = Math.floor((Math.random() * 999));
  }

  toggleClicked(index: number, playerCard: Card) {
    this.cardsArray[index].clicked = true;
    this.matchArray.push(playerCard);
    this.matchIndexArray.push(index);

    if(this.matchArray.length == 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    if(this.matchArray[0].matchId == this.matchArray[1].matchId || this.matchArray[0].cardId == this.matchArray[1].cardId) {
      console.log('Match Found!');

      this.matchArray = [];
      this.matchIndexArray = [];
    }
    else {
      console.log('No Match!');
      this.matchArray[0].clicked = false;
      this.matchArray[1].clicked = false;
      this.matchArray = [];
    }
  }

  showAll() {
    for(let i = 0; i < this.cardsArray.length; i++) {
      this.cardsArray[i].clicked = true;
    }
  }
}
