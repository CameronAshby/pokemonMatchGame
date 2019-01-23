import { APIKeys } from '../api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth';
const firebaseConfig = APIKeys.firebaseConfig;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageComponent } from './players/profile-page/profile-page.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    WelcomePageComponent,
    SignUpComponent,
    StatspageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
