import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../utilities.service';
import { MatchService } from '../match.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matchId: string;
  private error = undefined;
  private last_attacker;
  private match;
  private winner = undefined;
  private winner_username = undefined;
  opponentUsr: string;
  userBoard;
  userShips;
  opponentBoard;

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService,
    private matchService: MatchService, ) { }

  private matchUpdate(): void {
    this.matchService.getMatchInfo(this.matchId, true).subscribe(
      (match) => {
        // console.log(match);
        this.match = match;
        this.winner = match.winnerId;
        this.last_attacker = match.lastIdAttacker;
        this.opponentUsr = match.opponentInfo.username;
        this.userBoard = match.userBoard.matrix;
        this.opponentBoard = match.opponentBoard.matrix;
        this.userShips = match.userBoard.ships;
        if (match.winnerId !== undefined || match.winnerId != null) {
          if (match.winnerId === match.userInfo._id) {
            this.winner_username = match.userInfo.username;
          } else {
            this.winner_username = match.opponentInfo.username;
          }
        }
      }
    );
  }

  ngOnInit() {

    this.utilities.check_auth(this.userService.get_token());
    this.activatedRoute.paramMap.subscribe((data) => {
      this.matchId = data.get('id');
      const socket = io(this.userService.url);
      socket.on('match update ' + this.matchId, (m) => {
        this.error = undefined;
        this.last_attacker = m.lastIdAttacker;
        // console.log("MESSAGE RECEIVED " + JSON.stringify(m));
        this.matchUpdate();
      });
      this.matchUpdate();
    });
  }

  shoot(x, y, color) {
    if (color === '#00ffff') {
      this.error = undefined;
      this.matchService.shoot(x, y, this.matchId).subscribe(
        (success) => {
          this.winner = success.winner;
          // console.log(success);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (!this.winner) {
        this.error = 'Hai già sparato in quella cella';
      }

    }
  }
}
