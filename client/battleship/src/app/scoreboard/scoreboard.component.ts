import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  private scoreboard = [];
  private tipologiaScoreboard;
  constructor(private http: HttpClient, private userService: UserService, private utilities: UtilitiesService) { }

  ngOnInit() {
    this.tipologiaScoreboard = 'Partite vinte';
    this.utilities.check_auth(this.userService.get_token());
    this.getScoreboard();
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
