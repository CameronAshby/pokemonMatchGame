import {PokemonTCG} from 'pokemon-tcg-sdk-typescript';
import { Injectable } from '@angular/core';
import {PlayerInfoService} from '../playerInfo/player-info.service';
import Card = PokemonTCG.Card;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  cardCount: number;
  pokemonArray: Card[];

  constructor(private playerInfoService: PlayerInfoService) {
<<<<<<< HEAD
    this.cardCount = playerInfoService.gameInfo.matchesCount*2;
=======
>>>>>>> 17eb9d9a066ee016e79c12e2173fd97b33fc36b6
  }

  getPokemon() {
    PokemonTCG.Card.all()
      .then(card => {
        console.log(card);
        this.pokemonArray = card;
      })
      .catch(error => {
      });
  }
<<<<<<< HEAD
=======

  setCardCount() {
    this.cardCount = this.playerInfoService.gameInfo.matchesCount*2;
  }
>>>>>>> 17eb9d9a066ee016e79c12e2173fd97b33fc36b6
}
