import { Component, OnInit } from '@angular/core';
import { PokemonService} from '../services/apiService/apistuff.service';
import {Card} from '../interfaces/card';
import {PlayerInfoService} from '../services/playerInfo/player-info.service';
import {Router} from '@angular/router';
import {LoginServiceService} from '../services/auth/login-service.service';

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

  currentPlayerIndex: number = 0;

  constructor(
    private pokemonservice: PokemonService,
    private playerInfoService: PlayerInfoService,
    private router: Router,
    private loginService: LoginServiceService
  ) {
    if(!this.loginService.loggedIn) {
      this.router.navigate(['welcomePage']);
    }
  }

  ngOnInit() {
    this.pokemonservice.getPokemon()
      .then(data => {
          this.pokemonservice.pokemonArray = data;
          this.buildCards();
          this.randomizeCards();
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
        clicked: false,
        matched: false
      };
    }

    for(let i = this.playerInfoService.gameInfo.matchesCount; i < this.pokemonservice.cardCount; i++) {
      this.cardsArray[i] = {
        cardId: this.cardsArray[i-this.playerInfoService.gameInfo.matchesCount].cardId,
        image: this.cardsArray[i-this.playerInfoService.gameInfo.matchesCount].image,
        matchId: this.cardsArray[i-this.playerInfoService.gameInfo.matchesCount].matchId,
        clicked: false,
        matched: false
      }
    }
  }

  getRandomCard() {
    this.randomCardIndex = Math.floor((Math.random() * 999));
  }

  toggleClicked(index: number, playerCard: Card) {
    this.cardsArray[index].clicked = true;
    this.matchArray.push(playerCard);
    this.matchIndexArray.push(index);
    setTimeout(()=>{
      if(this.matchArray.length == 2) {
        this.checkMatch();
      }}, 2000);
  }

  checkMatch() {
    if(this.matchArray[0].matchId == this.matchArray[1].matchId || this.matchArray[0].cardId == this.matchArray[1].cardId) {

      this.cardsArray[this.matchIndexArray[0]].matched = true;
      this.cardsArray[this.matchIndexArray[1]].matched = true;

      this.matchArray = [];
      this.matchIndexArray = [];

      this.playerInfoService.gameInfo.matchesCount -= 1;

      this.playerInfoService.gameInfo.playerScores[this.currentPlayerIndex] += 5;
    }
    else {

      this.matchArray[0].clicked = false;
      this.matchArray[1].clicked = false;

      this.matchArray = [];
      this.matchIndexArray = [];

      this.playerInfoService.gameInfo.playerScores[this.currentPlayerIndex] -= 1;
    }
    this.changeTurns();
  }

  changeTurns() {
    this.playerInfoService.saveGameToFirebase();

    this.currentPlayerIndex += 1;

    if(this.currentPlayerIndex == this.playerInfoService.gameInfo.playerCount) {
      this.currentPlayerIndex = 0;
    }
  }

  showAll() {
    for(let i = 0; i < this.cardsArray.length; i++) {
      this.cardsArray[i].clicked = true;
    }
  }

  randomizeCards(){
    for (let i = 0; i < this.cardsArray.length; i++){
      let ran = Math.floor(Math.random() * this.cardsArray.length);
      let temp = this.cardsArray[ran];
      this.cardsArray[ran] = this.cardsArray[i];
      this.cardsArray[i] = temp;
    }
  }

  viewStats() {
    this.setWinner();
    this.router.navigate(['statsPage']);
  }

  setWinner() {
    let winner: any = this.playerInfoService.gameInfo.players[0];
    for(let i = 1; i < this.playerInfoService.gameInfo.players.length; i++) {
      if(this.playerInfoService.gameInfo.playerScores[i] > this.playerInfoService.gameInfo.playerScores[i-1]) {
        winner = this.playerInfoService.gameInfo.players[i];
      }
      else if(this.playerInfoService.gameInfo.playerScores[i] == this.playerInfoService.gameInfo.playerScores[i-1]) {
        winner = [winner, this.playerInfoService.gameInfo.players[i]];
      }
    }
    console.log(winner);
    console.log(typeof winner);
    if(typeof winner == 'string') {
      this.playerInfoService.gameInfo.winner = winner;
      this.playerInfoService.saveGameToFirebase();
    }
    else {
      this.playerInfoService.gameInfo.winner = 'tie';
      this.playerInfoService.saveTieGameToFirebase(winner, this.loginService.playerName);
    }


  }

}


