import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
//Components
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
//Services
import { UserService } from './user.service';
import { UtilitiesService } from './utilities.service';
import { PlayersComponent } from './players/players.component';
import { ListChatsComponent } from './list-chats/list-chats.component';
import { ChatComponent } from './chat/chat.component';
import { MatchComponent } from './match/match.component';


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
    ChatComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: UserService, useClass: UserService},
    {provide: UtilitiesService, useClass: UtilitiesService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
