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

  getWaitingMatch(): Observable<any> {
    return this.http.get(this.userService.url + '/matches', this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log("Waiting match: " + JSON.stringify(data));
      })
    )
  }

  getUserMatches(user: string): Observable<any> {
    return this.http.get(this.userService.url + '/users/:user/matches', this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log("Logged user match: " + JSON.stringify(data));
      })
    )
  }

  createMatch(): Observable<any> {
    return this.http.post(this.userService.url + '/matches', {}, this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log("Creating match: " + JSON.stringify(data));
      })
    )
  }

  getSingleMatch(id: string):Observable<any>{
    return this.http.get(this.userService.url + '/matches/' + id, this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log("Get single match info: " + JSON.stringify(data));
      })
    )
  }
}
