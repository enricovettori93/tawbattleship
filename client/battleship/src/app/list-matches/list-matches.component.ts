import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { MatchService } from '../match.service';
import { SocketioService } from '../socketio.service';

declare var $: any;

@Component({
  selector: 'app-list-matches',
  templateUrl: './list-matches.component.html',
  styleUrls: ['./list-matches.component.css']
})
export class ListMatchesComponent implements OnInit {

  private matches = [];

  constructor(private userService: UserService, private utilities: UtilitiesService, private matchService: MatchService, private socketService: SocketioService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.getMatch();
    this.socketService.connect(this.userService.get_userId()).subscribe((m) => {
      $("#myModal").modal('show');
      $('.modal-backdrop').removeClass("modal-backdrop");
      setTimeout(function(){
        $('#myModal').modal('hide')
      }, 2000);
    })
  }

  getMatch(){
    this.matches = [];
    this.matchService.getWaitingMatch().subscribe((data) => {
      this.matches = data;
    })
  }
}
