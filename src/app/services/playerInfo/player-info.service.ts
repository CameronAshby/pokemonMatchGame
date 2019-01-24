import { Injectable } from '@angular/core';
import {Player} from '../../player';
import {Observable} from 'rxjs';

<<<<<<< HEAD
import {
  AngularFirestoreCollection,
  DocumentChangeAction,
  AngularFirestore
} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
=======
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';


>>>>>>> bd0f28e265f22eb6022f4dac5b8d4b648ded184e
@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {
  private playerRef: AngularFirestoreCollection<Player>;

<<<<<<< HEAD
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
=======
  constructor(private af: AngularFirestore) { }

  dataTarget() {
    return this.af.collection('players').doc('player1');
>>>>>>> bd0f28e265f22eb6022f4dac5b8d4b648ded184e
  }
}
