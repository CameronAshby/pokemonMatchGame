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
    this.cardCount = playerInfoService.gameInfo.matchesCount*2;
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
}