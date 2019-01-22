import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {LoginServiceService} from '../../services/auth/login-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private afs: AngularFirestore, private loginService: LoginServiceService) { }

  ngOnInit() {
  }

}
