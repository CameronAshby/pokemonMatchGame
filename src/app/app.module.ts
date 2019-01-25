import { APIKeys } from '../api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
const firebaseConfig = APIKeys.firebaseConfig;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSelectModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StatspageComponent } from './statspage/statspage.component';
import { SetupPageComponent } from './setup-page/setup-page.component';
import {HttpClientModule} from '@angular/common/http';
import { GamepageComponent } from './gamepage/gamepage.component';
import {PokemonTCG} from "pokemon-tcg-sdk-typescript";


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignUpComponent,
    StatspageComponent,
    SetupPageComponent,
    GamepageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
