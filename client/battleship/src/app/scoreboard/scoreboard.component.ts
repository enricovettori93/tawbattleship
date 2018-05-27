import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { SocketioService } from '../socketio.service';

declare var $: any;

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  private scoreboard = [];
  private tipologiaScoreboard;
  constructor(private userService: UserService, private utilities: UtilitiesService, private socket: SocketioService) { }

  ngOnInit() {
    this.tipologiaScoreboard = 'Partite vinte';
    this.utilities.check_auth(this.userService.get_token());
    this.getScoreboard();
    this.socket.connect(this.userService.get_userId()).subscribe((m) => {
      $("#myModal").modal('show');
      $('.modal-backdrop').removeClass("modal-backdrop");
      setTimeout(function(){
        $('#myModal').modal('hide')
      }, 2000);
    })
  }

  /**
   * Metodo che viene attivato quando si cambia il 'select' nella pagina, cambia dinamicamente il numero di utenti da visualizzare
   * @param n : numero di utenti da visualizzare
   */
  changeScoreboard(n: number, type: string) {
    switch (type) {
      case "partiteVinte": {
        this.tipologiaScoreboard = "Partite vinte";
        break;
      }
      case "partitePerse": {
        this.tipologiaScoreboard = "Partite perse";
        break;
      }
      case "total": {
        this.tipologiaScoreboard = "Totali";
        break;
      }
    }
    this.getScoreboard({ 'limit': n, 'type': type });
  }

  /**
   * Richiama il metodo getScoreboard in userService
   */
  getScoreboard(params = {}) {
    this.scoreboard = [];
    this.userService.getScoreboard(params).subscribe((scoreboard) => {
      this.scoreboard = scoreboard;
    })
  }
}
