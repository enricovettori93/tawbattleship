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

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService,
    private matchService: MatchService, ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.matchId = data.get('id');
    });
  }

}
