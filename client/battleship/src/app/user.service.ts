import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';
//import {ErrorObservable} from 'rxjs/observable/ErrorObservable'

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router, private utilities: UtilitiesService) {
    console.log("User Service istanziato");
  }

  private token = '';
  public url = 'http://localhost:8080';

  public is_logged: EventEmitter<any> = new EventEmitter();

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
    return this.http.post(this.url + '/users', user, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  //Modifica le informazioni dell'utente
  updateInfo(username: string, name: string, surname: string, mail: string, password: string, isAdmin: boolean):Observable<any>{
    var user = {
      username: username,
      name: name,
      surname: surname,
      password: password,
      mail: mail,
      isAdmin: isAdmin
    }

    console.log("Updating at: " + this.url + '/users/' + this.get_username() + " user: " + JSON.stringify(user));
    
    return this.http.put(this.url + '/users/' + this.get_username(), user, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  //Modifica lo status isAdmin dell'utente username
  updateInfoAdmin(username: string, isAdmin: boolean):Observable<any>{
    return this.http.put(this.url + '/users/' + username, {'username':username,'isAdmin': isAdmin},this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  deleteUser(username: string):Observable<any>{
    console.log("Deleting user " + username);
    return this.http.delete(this.url + "/users/" + username,this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    )
  }

  logout() {
    this.token = '';
    this.is_logged.emit(false);
    localStorage.setItem('battleship_token', this.token);
    this.router.navigate(['/']);
  }

  getInfoUser(user: string):Observable<any>{
    return this.http.get(this.url + '/users/' + user, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log("Getting info user: " + JSON.stringify(data));
      })
    )
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

  is_user_logged(): boolean {
    if (this.token === '')
      return false;
    else
      return true;
  }
}
