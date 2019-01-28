import {PokemonTCG} from 'pokemon-tcg-sdk-typescript';
import { Injectable } from '@angular/core';
import {PlayerInfoService} from '../playerInfo/player-info.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  cardCount: number;

  constructor(private playerInfoService: PlayerInfoService) {
    this.cardCount = playerInfoService.gameInfo.matchesCount*2;
  }

  getPokemon() {
    PokemonTCG.Card.all()
      .then(card => {
        console.log(card);
      })
      .catch(error => {
      });
  }
}

