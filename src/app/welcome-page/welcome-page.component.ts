import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../services/auth/login-service.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private loginService: LoginServiceService) {
  }

  ngOnInit() {
  }

}
