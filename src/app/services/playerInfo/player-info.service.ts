import { Injectable } from '@angular/core';
import {Player} from '../../player';
import {Observable} from 'rxjs';

import {
  AngularFirestoreCollection,
  DocumentChangeAction,
  AngularFirestore
} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {
  private playerRef: AngularFirestoreCollection<Player>;
  constructor(private af: AngularFirestore) {
    this.playerRef = this.af.collection<Player>(`players`);
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
  dataTarget(){
    return this.af.collection('players').doc('player1');
  }
}
