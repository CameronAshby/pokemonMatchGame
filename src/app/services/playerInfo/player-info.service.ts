import { Injectable } from '@angular/core';
import {Player} from '../../interfaces/player';
import {Observable} from 'rxjs';

import {
  AngularFirestoreCollection,
  DocumentChangeAction,
  AngularFirestore
} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
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
    matchesCount: 0
  };

  private playerRef: AngularFirestoreCollection<Player>;
  private playerCollectionRef: AngularFirestoreCollection<Player[]>;

  constructor(private afs: AngularFirestore) {
    this.playerRef = this.afs.collection<Player>(`players`);
    this.playerCollectionRef = this.afs.collection<Player[]>(`players`);
  }

  getPlayerObservable(): Observable<Player[]> {
    return this.playerRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Player>[]): Player[] => {
          return items.map((item: DocumentChangeAction<Player>): Player => {
            return {
              gamesLost: item.payload.doc.data().gamesLost,
              gamesPlayed: item.payload.doc.data().gamesPlayed,
              gamesWon: item.payload.doc.data().gamesWon,
              playersBeaten: item.payload.doc.data().playersBeaten,
              playersLostTo: item.payload.doc.data().playersLostTo,
              score: item.payload.doc.data().score
            } as Player;
          });
        })
      );
  }
  
  dataTarget() {
    return this.afs.collection('players').doc('player1');
  }

  saveToFirebase(playerName: string, playerInfo: Player) {
    this.afs.collection(`players`).doc(playerName).set(playerInfo);
  }

  saveGameToFirebase() {
    this.afs.collection(`gameInfo`).doc('CurrentGame').set(this.gameInfo);
  }
}
