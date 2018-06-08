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
  private match;
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
        this.match = match;
        this.opponentUsr = match.opponentInfo.username;
        this.userBoard = match.userBoard.matrix;
        this.opponentBoard = match.opponentBoard.matrix;
        this.userShips = match.userBoard.ships;
      }
    );
  }

  ngOnInit() {

    this.utilities.check_auth(this.userService.get_token());
    this.activatedRoute.paramMap.subscribe((data) => {
      this.matchId = data.get('id');
      const socket = io(this.userService.url);
      socket.on('match update ' + this.matchId, (m) => {
        this.matchUpdate();
      });
      this.matchUpdate();
    });
  }

  shoot(x, y) {
    console.log(x);
    this.matchService.shoot(x, y, this.matchId).subscribe(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
