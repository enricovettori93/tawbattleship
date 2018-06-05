import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { UserService } from "./user.service";
import { UtilitiesService } from "./utilities.service";


export const enum ShipEnum {
  DESTROYER = 2,
  SUBMARINE = 3,
  BATTLESHIP = 4,
  AIRCRAFTCARRIER = 5
}
export const enum CellStatus {
  FREE = "#0080FF",
  OVER = "#0000FF",
  OCCUPIED = "#64FE2E",
  SHOOTED = "#f67",
  SIKED = "#823"
}
export const enum Orientation {
  HORIZONTAL,
  VERTICAL
}
@Injectable({
  providedIn: "root"
})
export class MatchService {

  constructor(private http: HttpClient, private router: Router, private utilities: UtilitiesService, private userService: UserService) { }

  getWaitingMatch(): Observable<any> {
    return this.http.get(this.userService.url + "/matches", this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log("Waiting match: " + JSON.stringify(data));
      })
    );
  }

  getUserMatches(user: string): Observable<any> {
    return this.http.get(
      this.userService.url + "/users/" + user + "/matches", this.utilities.create_options(this.userService.get_token())).pipe(
        tap((data) => {
          console.log("Logged user match: " + JSON.stringify(data));
        })
      );
  }

  createMatch(): Observable<any> {
    return this.http.post(this.userService.url + "/matches", {}, this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log("Creating match: " + JSON.stringify(data));
      })
    );
  }

  joinMatch(id: string, user_id: string): Observable<any> {
    console.log("son qua");
    return this.http.put(
      this.userService.url + "/matches/" + id + "/join",
      {},
      this.utilities.create_options(this.userService.get_token())).pipe(
        tap((data) => {
          console.log("Creating match: " + JSON.stringify(data));
        })
      );
  }

  getSingleMatch(id: string): Observable<any> {
    return  this.http.get(this.userService.url + "/matches/" + id, this.utilities.create_options(this.userService.get_token()))
            .pipe();
  }

  initShips(): Array<Ship> {
    const ships = new Array();
    for (let i = 0; i < 4; i++) {
      ships.push(new Ship(ShipEnum.DESTROYER));
    }
    for (let i = 0; i < 3; i++) {
      ships.push(new Ship(ShipEnum.SUBMARINE));
    }
    for (let i = 0; i < 2; i++) {
      ships.push(new Ship(ShipEnum.BATTLESHIP));
    }
    for (let i = 0; i < 1; i++) {
      ships.push(new Ship(ShipEnum.AIRCRAFTCARRIER));
    }
    return ships;
  }
}

export class Ship {
  private type: ShipEnum;
  private row: number;
  private column: number;
  private used = false;
  private orientation: Orientation;
  private x;
  private y;

  constructor(type: ShipEnum) {
    this.type = type;
    this.orientation = Orientation.HORIZONTAL;
  }

  setOrientation(orientation: Orientation) {
    this.orientation = orientation;
  }

  getOrientation() {
    return this.orientation;
  }

  getLength(): number {
    return this.type;
  }

  getPart() {
    return new Array(this.type);
  }

  setRow(row: number) {
    if (row <= 9 && row >= 0) {
      this.row = row;
    } else {
      throw Error("Invalid row number");
    }
  }
  setColumn(column: number) {
    if (column <= 9 && column >= 0) {
      this.column = column;
    } else {
      throw Error("Invalid column number");
    }
  }

  setPosition(row, column) {
    this.setRow(row);
    this.setColumn(column);
    this.used = true;
  }

  isUsed() {
    return this.used;
  }

}

export class Cell {
  private status = CellStatus.FREE;
  private col;
  private row;
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  getCol() {
    return this.col;
  }
  getRow() {
    return this.row;
  }
  setStatus(status: CellStatus) {
    this.status = status;
  }
  getStatus() {
    return this.status;
  }
}
