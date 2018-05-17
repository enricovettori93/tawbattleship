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
  constructor(private http: HttpClient, private userService: UserService, private utilities: UtilitiesService) { }

  ngOnInit() {
    this.scoreboard = [];
    this.getScoreboard().subscribe((scoreboard) => {
      this.scoreboard = scoreboard;
    });
  }

  /**
   * Metodo che viene attivato quando si cambia il 'select' nella pagina, cambia dinamicamente il numero di utenti da visualizzare
   * @param n : numero di utenti da visualizzare
   */
  changeLimit(n: number){
    this.getScoreboard({limit: n});
  }

  getScoreboard(params = {}):Observable<any>{
    return this.http.get('http://localhost:8080/scoreboard',this.utilities.create_options(this.userService.get_token(),params)).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }
}
