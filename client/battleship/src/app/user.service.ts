import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { of, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { UtilitiesService } from "./utilities.service";
// import {ErrorObservable} from "rxjs/observable/ErrorObservable"

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router, private utilities: UtilitiesService) {
    console.log("User Service istanziato");
  }

  private token = "";
  public url = UtilitiesService.getPublicUrl();

  public is_logged: EventEmitter<any> = new EventEmitter();

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Errore generato: ", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        "body was: " + JSON.stringify(error.error)
      );
    }
  }

  public login(user: string, password: string, remember?: boolean): Observable<any> {
    const optionsLogin = {
      headers: new HttpHeaders({
        authorization: "Basic " + btoa(user + ":" + password),
        "cache-control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
      })
    };
    console.log("Login: " + this.url + "/login " + JSON.stringify(optionsLogin));
    return this.http.get(this.url + "/login", optionsLogin).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
        this.is_logged.emit(true);
        this.token = data.token;
        localStorage.setItem("battleship_token", this.token);
      }));
  }

  renew(): Observable<any> {
    return this.http.get(this.url + "/renew", this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        this.token = data.token;
        localStorage.setItem("battleship_token", this.token);
      })
    );
  }

  register(user): Observable<any> {
    return this.http.post(this.url + "/users", user, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  // Modifica le informazioni dell"utente
  updateInfo(username: string, name: string, surname: string, mail: string, password: string, isAdmin: boolean): Observable<any> {
    const user = {
      username: username,
      name: name,
      surname: surname,
      password: password,
      mail: mail,
      isAdmin: isAdmin
    };

    console.log("Updating at: " + this.url + "/users/" + this.get_username() + " user: " + JSON.stringify(user));

    return this.http.put(this.url + "/users/" + this.get_username(), user, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  // Modifica lo status isAdmin dell"utente username
  updateInfoAdmin(username: string, isAdmin: boolean): Observable<any> {
    return this.http.put(this.url + "/users/" + username, { "username": username, "isAdmin": isAdmin },
      this.utilities.create_options(this.get_token())).pipe(
        tap((data) => {
          console.log(JSON.stringify(data));
        })
      );
  }

  deleteUser(username: string): Observable<any> {
    console.log("Deleting user " + username);
    return this.http.delete(this.url + "/users/" + username, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  logout() {
    this.token = "";
    this.is_logged.emit(false);
    localStorage.setItem("battleship_token", this.token);
    this.router.navigate(["/"]);
  }

  getInfoUser(user: string): Observable<any> {
    return this.http.get(this.url + "/users/" + user, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log("Getting info user: " + JSON.stringify(data));
      })
    );
  }

  searchUser(keyword: string): Observable<any> {
    if (keyword === undefined || keyword === "") {
      return this.http.get(this.url + "/users", this.utilities.create_options(this.get_token())).pipe(
        tap((data) => {
          console.log("Searching user: " + JSON.stringify(data));
        })
      );
    } else {
      return this.http.get(this.url + "/users", this.utilities.create_options(this.get_token(), { "keysearched": keyword })).pipe(
        tap((data) => {
          console.log("Searching user: " + JSON.stringify(data));
        })
      );
    }
  }

  getScoreboard(params = {}): Observable<any> {
    return this.http.get(this.url + "/scoreboard", this.utilities.create_options(this.get_token(), params)).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  getUserChats(): Observable<any> {
    return this.http.get(this.url + "/chats", this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  getUserSingleChat(idChat: string): Observable<any> {
    return this.http.get(this.url + "/chats/" + idChat, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  createChat(username: string): Observable<any> {
    return this.http.post(this.url + "/chats", { "destinatario": username }, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  sendMessage(idChat: string, text: string) {
    const date = Date.now();
    return this.http.post(this.url + "/chats/" + idChat, { "sentAt": date, "text": text },
      this.utilities.create_options(this.get_token())).pipe(
        tap((data) => {
          console.log(JSON.stringify(data));
        })
      );
    }

  deleteChat(id: string) {
    return this.http.delete(this.url + "/chats/" + id, this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  getMatches(user: string) {
    return this.http.get(this.url + "/users/:user/matches", this.utilities.create_options(this.get_token())).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      })
    );
  }

  // ----------------- JTW GETTER -----------------

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

  get_userId() {
    return jwt_decode(this.token).id;
  }

  get_mail() {
    return jwt_decode(this.token).mail;
  }

  is_admin(): boolean {
    return jwt_decode(this.token).isAdmin;
  }

  is_user_logged(): boolean {
    return !(this.token === "");
  }
}
