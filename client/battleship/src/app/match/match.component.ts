import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { MatchService } from '../match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  private match;
  private id_match;

  constructor(private userService: UserService, private utilities: UtilitiesService, private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.id_match = (this.router.url.split('/'))[2];
    this.getSingleMatch(this.id_match);
  }

  getSingleMatch(id: string){
    this.matchService.getSingleMatch(id).subscribe((match) => {
      this.match = match;
    }), (err) => {
      console.log(JSON.stringify(err));
    }
  }
}
