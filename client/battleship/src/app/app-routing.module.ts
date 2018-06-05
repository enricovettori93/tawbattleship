import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { PlayersComponent } from "./players/players.component";
import { ListChatsComponent } from "./list-chats/list-chats.component";
import { MatchBuilderComponent } from "./match-builder/match-builder.component";
import { ChatComponent } from "./chat/chat.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { ListMatchesComponent } from "./list-matches/list-matches.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: UserLoginComponent },
  { path: "user", component: UserInfoComponent },
  { path: "user/:username", component: UserInfoComponent },
  { path: "user/:username/matches", component: ListMatchesComponent },
  { path: "signup", component: UserSignupComponent },
  { path: "scoreboard", component: ScoreboardComponent },
  { path: "players", component: PlayersComponent },
  { path: "chats", component: ListChatsComponent },
  { path: "chats/:id", component: ChatComponent },
  { path: "match", component: ListMatchesComponent },
  { path: "match/:id/board", component: MatchBuilderComponent},
  { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
