import {PokemonTCG} from 'pokemon-tcg-sdk-typescript';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }
  getPokemon() {
    PokemonTCG.Card.all()
      .then(card => {
        console.log(card);
      })
      .catch(error => {
      });
  }
}

