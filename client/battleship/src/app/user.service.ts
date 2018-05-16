import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
//import * as ErrorObservable from 'rxjs/observable/ErrorObservable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
    console.log("User Service istanziato");
  }

  private token = '';
  public url = 'http://localhost:8080';

  login(user: string, password: string, remember: boolean): Observable<any> {

    const options = {
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa(user + ':' + password),
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    console.log("Login: " + this.url + '/login ' + JSON.stringify(options));
    return this.http.get(this.url + '/login', options, ).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
        this.token = data.token;
        if (remember) {
          localStorage.setItem('battleship_token', this.token);
        }
      }));
  }

  renew(): Observable<any> {
    return of({});
  }

  register(user): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-type': 'application/json',
      })
    };

    return this.http.post(this.url + '/users', user, options).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  logout() {
    this.token = '';
    localStorage.setItem('battleship_token', this.token);
  }

  get_token() {
    return this.token;
  }

  get_nome() {
    return jwt_decode(this.token).nome;
  }

  get_cognome() {
    return jwt_decode(this.token).cognome;
  }

  get_username() {
    return jwt_decode(this.token).username;
  }

  get_mail() {
    return jwt_decode(this.token).mail;
  }

  is_admin(): boolean {
    return jwt_decode(this.token).isAdmin;
  }

  is_logged(): boolean {
    if (this.token === '')
      return false;
    else
      return true;
  }
}
