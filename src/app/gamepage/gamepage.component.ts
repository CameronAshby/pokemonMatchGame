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
  loserArray: string[] = [];

  tie: boolean = false;
  gameReady: boolean = false;

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
    this.pokemonservice.getPokemonSetCards()
      .subscribe(data => {
        this.pokemonservice.pokemonArray = data['cards'];
        this.buildCards();
        this.randomizeCards();
        this.gameReady = true;
      });
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
    this.randomCardIndex = Math.floor((Math.random() * this.pokemonservice.pokemonSetCardCount));
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

      this.currentPlayerIndex -= 1;
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
      this.playerInfoService.gameInfo.roundCount += 1;
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
    this.updatePlayerProfile();
    this.router.navigate(['statsPage']);
  }

  setWinner() {
    let winner: any = this.playerInfoService.gameInfo.players[0];
    for(let i = 1; i < this.playerInfoService.gameInfo.players.length; i++) {
      if(this.playerInfoService.gameInfo.playerScores[i] > this.playerInfoService.gameInfo.playerScores[i-1]) {
        winner = this.playerInfoService.gameInfo.players[i];
      }
      else {
        let checkArray = arr => arr.every( v => v === arr[0] );
        checkArray( this.playerInfoService.gameInfo.playerScores );
        if(checkArray( this.playerInfoService.gameInfo.playerScores )) {
          this.tie = true;
        }
      }
    }

    if(this.tie) {
      winner = [];
        for(let i = 1; i < this.playerInfoService.gameInfo.players.length; i++) {
          if(this.playerInfoService.gameInfo.playerScores[i] == this.playerInfoService.gameInfo.playerScores[i-1]) {
            winner[i-1] = this.playerInfoService.gameInfo.players[i-1];
          }
        }
    }

    if(typeof winner == 'string') {
      this.playerInfoService.gameInfo.winner = winner;

      if(this.playerInfoService.gameInfo.winner == this.loginService.playerName) {
        this.playerInfoService.playerInfo.gamesWon += 1;
      }
      else {
        this.playerInfoService.playerInfo.gamesLost += 1;
        this.playerInfoService.playerInfo.playersLostTo.push(winner + ' ');
      }
    }
    else {
      this.playerInfoService.playerInfo.gamesTied += 1;
      for(let i = 0; i < winner.length; i++) {
        if(winner[i] != this.loginService.playerName) {
          this.playerInfoService.playerInfo.playersLostTo.push(winner[i] + ' ');
        }
      }
    }

    for(let i = 0; i < this.playerInfoService.gameInfo.playerCount; i++) {
      if(this.playerInfoService.gameInfo.players[i] != winner) {
        this.loserArray.push(this.playerInfoService.gameInfo.players[i]);
      }
    }

    for(let i = 0; i < this.loserArray.length; i++) {
      if(this.loserArray[i] != this.loginService.playerName) {
        this.playerInfoService.playerInfo.playersBeaten.push(this.loserArray[i] + ' ');
      }
    }
  }

  updatePlayerProfile(){

    let playerIndex: number;

    for(let i = 0; i < this.playerInfoService.gameInfo.playerCount; i++) {
      if(this.playerInfoService.gameInfo.players[i] == this.loginService.playerName) {
        playerIndex = i;
      }
    }

    this.playerInfoService.playerInfo.gamesPlayed += 1;
    this.playerInfoService.playerInfo.score += this.playerInfoService.gameInfo.playerScores[playerIndex];

    this.playerInfoService.saveToFirebase(this.loginService.playerName, this.playerInfoService.playerInfo);
  }

}


