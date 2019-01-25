import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../services/auth/login-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(private loginService: LoginServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  newGame() {
    this.router.navigate(['setupPage']);
  }

  viewProfile() {
    this.router.navigate(['statsPage']);
  }
}
