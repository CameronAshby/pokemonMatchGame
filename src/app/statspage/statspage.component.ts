import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Player } from '../player';
import {Observable} from 'rxjs';
import {LoginServiceService} from '../services/auth/login-service.service';

@Component({
  selector: 'app-statspage',
  templateUrl: './statspage.component.html',
  styleUrls: ['./statspage.component.scss']
})
export class StatspageComponent implements OnInit {

  playerInfo: any;

  constructor(private afs: AngularFirestore, private loginService: LoginServiceService) { }

  ngOnInit() {
    this.afs.collection('players').get().subscribe(documents => {
      documents.forEach(doc => {
        console.log(doc.data());
        this.playerInfo = doc.data();
      });
    });
  }
}
