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

  getRandomCard() {
    this.randomCardIndex = Math.floor((Math.random() * 999));
  }

  toggleClicked(index: number) {
    this.cardsArray[index].clicked = !this.cardsArray[index].clicked;
  }
}
