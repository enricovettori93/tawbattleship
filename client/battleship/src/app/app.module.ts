import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
// Components
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PlayersComponent } from './players/players.component';
import { ListChatsComponent } from './list-chats/list-chats.component';
import { MatchBuilderComponent } from './match-builder/match-builder.component';
import { ChatComponent } from './chat/chat.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListMatchesComponent } from './list-matches/list-matches.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Services
import { UserService } from './user.service';
import { UtilitiesService } from './utilities.service';
import { SocketioService } from './socketio.service';
import { MatchService } from './match.service';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserInfoComponent,
    UserSignupComponent,
    NavbarComponent,
    ScoreboardComponent,
    PlayersComponent,
    ListChatsComponent,
    MatchBuilderComponent,
    ChatComponent,
    NotfoundComponent,
    ListMatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [
    {provide: UserService, useClass: UserService},
    {provide: UtilitiesService, useClass: UtilitiesService},
    {provide: SocketioService, useClass: SocketioService},
    {provide: MatchService, useClass: MatchService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
