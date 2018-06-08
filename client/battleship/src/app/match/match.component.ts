import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../utilities.service';
import { MatchService } from '../match.service';


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
  userShip;
  opponentBoard;

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService,
    private matchService: MatchService, ) { }

  ngOnInit() {

    this.utilities.check_auth(this.userService.get_token());
    this.activatedRoute.paramMap.subscribe((data) => {
      this.matchId = data.get('id');
      this.matchService.getMatchInfo(this.matchId, true).subscribe(
        (match) => {
          console.log(match);
          this.match = match;
          this.opponentUsr = match.opponentInfo.username;
          this.userBoard = match.myBoard.matrix;
          this.opponentBoard = match.opponentBoard.matrix;
        }
      );
  });
}

}
