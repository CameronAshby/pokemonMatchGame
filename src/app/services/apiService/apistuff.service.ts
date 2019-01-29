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
  }
  getPokemon() {
    return PokemonTCG.Card.all();
  }
  setCardCount() {
    this.cardCount = this.playerInfoService.gameInfo.matchesCount*2;
  }
}
