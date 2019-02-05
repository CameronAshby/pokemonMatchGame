import {PokemonTCG} from 'pokemon-tcg-sdk-typescript';
import { Injectable } from '@angular/core';
import {PlayerInfoService} from '../playerInfo/player-info.service';
import {Set} from '../../interfaces/set'
import Card = PokemonTCG.Card;
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  cardCount: number;
  pokemonArray: Card[] = [];
  pokemonSets: Set[] = [];

  pokemonSelectedSet: Set;

  pokemonSetCardCount: number;

  constructor(private playerInfoService: PlayerInfoService, private http: HttpClient) {
  }

  getPokemon() {
    return PokemonTCG.Card.all();
    // return PokemonTCG.Set.find(this.playerInfoService.gameInfo.chosenSet);
  }

  getPokemonSetCards(): Observable<any> {
      return this.http.get(`https://api.pokemontcg.io/v1/cards?setCode=${this.pokemonSelectedSet.code}`);
  }

  getPokemonSets() {
    return PokemonTCG.Set.all();
  }

  setCardCount() {
    this.cardCount = this.playerInfoService.gameInfo.matchesCount*2;
    this.pokemonSetCardCount = this.pokemonSelectedSet.totalCards;
  }
}
