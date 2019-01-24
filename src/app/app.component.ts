import { Component } from '@angular/core';
import {LoginServiceService} from './services/auth/login-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private loginService: LoginServiceService, private router: Router) {

  }
  title = 'Project5-PokemonMatchGame';

  homePage() {
    this.router.navigate(['welcomePage/signIn']);
  }
}
