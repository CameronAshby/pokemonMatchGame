import {PokemonTCG} from 'pokemon-tcg-sdk-typescript';
import { Injectable } from '@angular/core';
import {PlayerInfoService} from '../playerInfo/player-info.service';
import {Set} from '../../interfaces/set'
import Card = PokemonTCG.Card;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  cardCount: number;
  pokemonArray: Card[];
  pokemonSets: Set[] = [];

  constructor(private playerInfoService: PlayerInfoService) {
  }

  getPokemon() {
    return PokemonTCG.Card.all();
    // return PokemonTCG.Set.find(this.playerInfoService.gameInfo.chosenSet);
  }

  getPokemonSets() {
    return PokemonTCG.Set.all();
  }

  setCardCount() {
    this.cardCount = this.playerInfoService.gameInfo.matchesCount*2;
  }
}
