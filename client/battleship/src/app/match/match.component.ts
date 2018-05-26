import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  constructor(private userService: UserService, private utilities: UtilitiesService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
  }

}
