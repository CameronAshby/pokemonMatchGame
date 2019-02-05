import { Injectable } from '@angular/core';
import {Player} from '../../interfaces/player';

import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import {Game} from '../../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  playerInfo: Player;
  gameInfo: Game = {
    playerCount: 0,
    players: [],
    playerScores: [],
    matchesCount: 0,
    roundCount: 1,
    winner: ''
  };

  private playerRef: AngularFirestoreCollection<Player>;
  private playerCollectionRef: AngularFirestoreCollection<Player[]>;

  constructor(private afs: AngularFirestore) {
    this.playerRef = this.afs.collection<Player>(`players`);
    this.playerCollectionRef = this.afs.collection<Player[]>(`players`);
  }

  saveToFirebase(playerName: string, playerInfo: Player) {
    this.afs.collection(`players`).doc(playerName).set(playerInfo);
  }

  saveGameToFirebase() {
    this.afs.collection(`gameInfo`).doc('CurrentGame').set(this.gameInfo);
  }

  clearCurrentGame() {
    this.gameInfo = {
      playerCount: 0,
      players: [],
      playerScores: [],
      matchesCount: 0,
      roundCount: 1,
      winner:''
    };
    this.afs.collection('gameInfo').doc('CurrentGame').delete();
  }
}
