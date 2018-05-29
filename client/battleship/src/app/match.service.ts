import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';
import { of, Observable } from 'rxjs';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient, private router: Router, private utilities: UtilitiesService, private userService: UserService) { }

  getWaitingMatch():Observable<any>{
    return this.http.get(this.userService.url + '/matches',this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  getMatches(user:string):Observable<any>{
    return this.http.get(this.userService.url + "/users/:user/matches", this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }
}