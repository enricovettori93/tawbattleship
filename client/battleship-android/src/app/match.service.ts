import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { UtilitiesService } from './utilities.service';


export const enum ShipEnum {
  DESTROYER = 2,
  SUBMARINE = 3,
  BATTLESHIP = 4,
  AIRCRAFTCARRIER = 5
}
export const enum CellStatus {
  FREE = '#0080FF',
  OVER = '#0000FF',
  OCCUPIED = '#64FE2E',
  SHOOTED = '#f67',
  SIKED = '#823'
}
export const enum Orientation {
  HORIZONTAL,
  VERTICAL
}
@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient, private router: Router, private utilities: UtilitiesService, private userService: UserService) { }

  getWaitingMatch(): Observable<any> {
    return this.http.get(this.userService.url + '/matches', this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log('Waiting match: ' + JSON.stringify(data));
      })
    );
  }

  getMatchInfo(match_id: string, fullInfo?: boolean): Observable<any> {
    let request = this.userService.url + '/matches/' + match_id;
    if (fullInfo) {
      request += '?type=fullInfo';
    }
    return this.http.get(request, this.utilities.create_options(this.userService.get_token()));
  }

  getUserActiveMatches(user: string): Observable<any> {
    return this.getUserMatches(user).pipe(map(
      (matchArray) => {
        let match = {};
        matchArray.forEach(matchAux => {
          if (matchAux.status === 1 || matchAux.status === 2) {
            match = matchAux;
          }
        });
        return match;
      }
    ));
  }

  getUserMatches(user: string): Observable<any> {
    return this.http.get(
      this.userService.url + '/users/' + user + '/matches', this.utilities.create_options(this.userService.get_token())).pipe(
        tap((data) => {
          console.log('Logged user match: ' + JSON.stringify(data));
        })
      );
  }

  createMatch(): Observable<any> {
    return this.http.post(this.userService.url + '/matches', {}, this.utilities.create_options(this.userService.get_token())).pipe(
      tap((data) => {
        console.log('Creating match: ' + JSON.stringify(data));
      })
    );
  }

  joinMatch(id: string, user_id: string): Observable<any> {
    console.log('son qua');
    return this.http.put(
      this.userService.url + '/matches/' + id + '/join',
      {},
      this.utilities.create_options(this.userService.get_token())).pipe(
        tap((data) => {
          console.log('Creating match: ' + JSON.stringify(data));
        })
      );
  }

  initShips(): Array<Ship> {
    const ships = new Array();
    for (let i = 0; i < 4; i++) {
      ships.push(new Ship(ShipEnum.DESTROYER));
    }
    for (let i = 0; i < 2; i++) {
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

  sendBoard(board: Cell[][], ships: Ship[], matchId: string): Observable<any> {
    const res = new Object();
    const shipsArray = new Array();
    ships.forEach(ship => {
      const shipParts = new Array();
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j].getStatus() === CellStatus.OCCUPIED && board[i][j].getShipRef() === ship.getId()) {
            shipParts.push({ 'x': i, 'y': j });
          }
        }
      }
      shipsArray.push(shipParts);
    });
    res['positioning'] = { 'ships': shipsArray };
    console.log(JSON.stringify(res));
    return this.http.put(
      this.userService.url + '/matches/' + matchId + '/board',
      res,
      this.utilities.create_options(this.userService.get_token()));
  }

  shoot(x, y, matchId): Observable<any> {
    console.log({ position: { x: x, y: y } });
    return this.http.put(
      this.userService.url + '/matches/' + matchId,
      { position: { x: x, y: y } },
      this.utilities.create_options(this.userService.get_token()));
  }

}

export class Ship {

  private static id = 0;
  private id: number;
  private type: ShipEnum;
  private row: number;
  private column: number;
  private used = false;
  private orientation: Orientation;
  private x;
  private y;

  static getId() {
    return Ship.id++;
  }

  constructor(type: ShipEnum) {
    this.type = type;
    this.orientation = Orientation.HORIZONTAL;
    this.id = Ship.getId();
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

  getType(): ShipEnum {
    return this.type;
  }

  setUsed() {
    this.used = true;
  }

  removeFromBoard() {
    this.used = false;
  }

  isUsed() {
    return this.used;
  }

  getId() {
    return this.id;
  }

}

export class Cell {
  private status = CellStatus.FREE;
  private col;
  private row;
  private shipRef: number;
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

  setShipRef(shipRef) {
    this.shipRef = shipRef;
  }

  getShipRef() {
    return this.shipRef;
  }

  removeShipRef() {
    this.shipRef = null;
    this.status = CellStatus.FREE;
  }
}
