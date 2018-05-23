import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  private players = [];
  constructor(private userService: UserService, private utilities: UtilitiesService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.searchPlayer('');
  }

  searchPlayer(keyword: string) {
    console.log('Search player with: ' + keyword);
    this.userService.searchUser(keyword).subscribe((value) => {
      // console.log(JSON.stringify(d));
      this.players = value;
    }, (err) => {
      console.log('Errore durante la ricerca: ' + err);
    });
  }
}
