import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { SocketioService } from '../socketio.service';

declare var $: any;

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  private players = [];
  private userLogged;
  constructor(private userService: UserService, private utilities: UtilitiesService, private socketService: SocketioService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.userLogged = this.userService.get_username();
    this.searchPlayer('');
    this.socketService.connect(this.userService.get_userId()).subscribe((m) => {
      $("#myModal").modal('show');
      $('.modal-backdrop').removeClass("modal-backdrop");
      setTimeout(function(){
        $('#myModal').modal('hide')
      }, 2000);
    })
  }

  searchPlayer(keyword: string) {
    //console.log('Search player with: ' + keyword);
    this.userService.searchUser(keyword).subscribe((value) => {
      // console.log(JSON.stringify(d));
      this.players = value;
    }, (err) => {
      console.log('Errore durante la ricerca: ' + err);
    });
  }
}
