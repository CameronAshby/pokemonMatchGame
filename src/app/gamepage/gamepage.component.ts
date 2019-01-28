import { Component, OnInit } from '@angular/core';
import { PokemonService} from '../services/apiService/apistuff.service';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.scss']
})
export class GamepageComponent implements OnInit {

  constructor(private pokemonservice: PokemonService) { }

  ngOnInit() {
    this.pokemonservice.getPokemon();
  }

}
