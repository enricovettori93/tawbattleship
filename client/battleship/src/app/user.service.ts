import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
//import {ErrorObservable} from 'rxjs/observable/ErrorObservable'

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
    console.log("User Service istanziato");
  }

  private token = '';
  public url = 'http://localhost:8080';

  private create_options(params = {}) {
    return {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.get_token(),
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({ fromObject: params })
    };
  }

  login(user: string, password: string, remember: boolean): Observable<any> {
    const optionsLogin = {
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa(user + ':' + password),
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    console.log("Login: " + this.url + '/login ' + JSON.stringify(optionsLogin));
    return this.http.get(this.url + '/login', optionsLogin).pipe(
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
    return this.http.post(this.url + '/users', user, this.create_options()).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  updateInfo(username: string, name: string, surname: string, mail: string, password: string):Observable<any>{
    var user = {
      username: username,
      name: name,
      surname: surname,
      password: password,
      mail: mail
    }

    console.log("Updating at: " + this.url + '/users/' + this.get_mail() + " user: " + JSON.stringify(user));
    
    return this.http.put(this.url + '/users/' + this.get_mail(), user, this.create_options()).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  deleteUser(mail: string):Observable<any>{
    console.log("Deleting user " + mail);
    return this.http.delete(this.url + "/users/" + mail,this.create_options()).pipe(
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

  get_name() {
    return jwt_decode(this.token).name;
  }

  get_surname() {
    return jwt_decode(this.token).surname;
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
