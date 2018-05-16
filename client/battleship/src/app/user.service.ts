import { Injectable, EventEmitter } from '@angular/core';
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

  public is_logged: EventEmitter<any> = new EventEmitter();

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

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error("Errore generato: ", error.error.message);
    }
    else{
      console.error(
        `Backend returned code ${error.status}, ` +
        'body was: ' + JSON.stringify(error.error)
      )
    }
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
        this.is_logged.emit(true);
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

    console.log("Updating at: " + this.url + '/users/' + this.get_username() + " user: " + JSON.stringify(user));
    
    return this.http.put(this.url + '/users/' + this.get_username(), user, this.create_options()).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  deleteUser(username: string):Observable<any>{
    console.log("Deleting user " + username);
    return this.http.delete(this.url + "/users/" + username,this.create_options()).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  logout() {
    this.token = '';
    this.is_logged.emit(false);
    localStorage.setItem('battleship_token', this.token);
  }

  //----------------- JTW GETTER -----------------

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

  /*is_logged(): boolean {
    if (this.token === '')
      return false;
    else
      return true;
  }*/
}
