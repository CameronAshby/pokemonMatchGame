import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(private af: AngularFirestore) { }

  dataTarget() {
    return this.af.collection('players').doc('player1');
  }
}
