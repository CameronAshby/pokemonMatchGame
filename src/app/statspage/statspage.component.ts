import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Player } from '../player';
import {Observable} from 'rxjs';
import {PlayerInfoService} from '../services/playerInfo/player-info.service';

@Component({
  selector: 'app-statspage',
  templateUrl: './statspage.component.html',
  styleUrls: ['./statspage.component.scss']
})
export class StatspageComponent implements OnInit {

  player: Observable<Player[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.afs.collection('players').get().subscribe(documents => {
    documents.forEach(doc => {
      console.log(doc.data());
    });
    });
  }
}
