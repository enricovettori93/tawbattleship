import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  private scoreboard = [];
  constructor(private http: HttpClient, private userService: UserService) { }

  private create_options(params = {}) {
    console.log("PARAMS QUERY " + JSON.stringify(params))
    return {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.userService.get_token(),
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({ fromObject: params })
    };
  }

  ngOnInit() {
    this.getScoreboard().subscribe((scoreboard) => {
      this.scoreboard = scoreboard;
    });
  }

  changeLimit(n: number){
    this.getScoreboard({limit: n});
  }

  getScoreboard(params = {}):Observable<any>{
    return this.http.get('http://localhost:8080/scoreboard',this.create_options(params)).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }
}
