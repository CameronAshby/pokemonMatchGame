import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Player } from '../interfaces/player';
import {LoginServiceService} from '../services/auth/login-service.service';

@Component({
  selector: 'app-statspage',
  templateUrl: './statspage.component.html',
  styleUrls: ['./statspage.component.scss']
})
export class StatspageComponent implements OnInit {

  playerInfo: Player;

  constructor(private afs: AngularFirestore, private loginService: LoginServiceService) { }

  ngOnInit() {
    console.log(this.loginService.playerName);
    this.afs.collection('players').doc(this.loginService.playerName + '').get().subscribe(doc => {
      console.log(doc.data());
      this.playerInfo = doc.data() as Player;
      console.log(this.playerInfo);
    })
  }
}
