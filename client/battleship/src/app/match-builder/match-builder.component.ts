import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { MatchService, Ship, ShipEnum, Cell, CellStatus, Orientation } from '../match.service';
import { SocketioService } from '../socketio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match-builder.component.html',
  styleUrls: ['./match-builder.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MatchBuilderComponent implements OnInit {
  @ViewChild('battlefieldDOM') battlefieldDom: ElementRef;
  private userName: string;
  private userMatches: string;
  private draggingShip: Ship;
  private validDragging: boolean;
  board: Cell[][];
  ships: Array<Ship>;
  destroyers: Array<Ship>;
  submarines: Array<Ship>;
  aircraftCarriers: Array<Ship>;
  battleships: Array<Ship>;

  submitEnabled = false;
  boardUpdated = false;
  error = false;
  errorMessage = '';

  columns: Array<string>;
  rows: Array<string>;
  private match;
  private id_match;

  constructor(
    private userService: UserService,
    private utilities: UtilitiesService,
    private matchService: MatchService,
    private socketIoService: SocketioService,
    private renderer: Renderer2,
    private router: Router) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.id_match = (this.router.url.split('/'))[2];
    this.columns = Array(10).fill(0).map((x, i) => (String.fromCharCode(97 + i)));
    this.rows = Array(10).fill(0).map((x, i) => (i + ''));
    /** TODO:
     * this.socketIoService.connect(this.id_match).subscribe((data) => {

    }
    );*/
    this.matchService.getSingleMatch(this.id_match).subscribe((match) => {
      // console.log(match);
      this.match = match;
    }, (err) => {
      console.log(JSON.stringify(err));
    });
    this.ships = this.matchService.initShips();
    this.aircraftCarriers = new Array();
    this.battleships = new Array();
    this.destroyers = new Array();
    this.submarines = new Array();
    this.ships.forEach(ship => {
      switch (ship.getType()) {
        case ShipEnum.AIRCRAFTCARRIER:
          this.aircraftCarriers.push(ship);
          break;
        case ShipEnum.BATTLESHIP:
          this.battleships.push(ship);
          break;
        case ShipEnum.DESTROYER:
          this.destroyers.push(ship);
          break;
        case ShipEnum.SUBMARINE:
          this.submarines.push(ship);
          break;
      }
    });
    this.board = new Array();
    for (let i = 0; i < 10; i++) {
      this.board.push(new Array());
      for (let j = 0; j < 10; j++) {
        const cell = new Cell(j, i);
        cell.setStatus(CellStatus.FREE);
        this.board[i].push(cell);
      }
    }
  }

  rotate(ship: Ship) {
    if (!ship.isUsed()) {
      if (ship.getOrientation() === Orientation.HORIZONTAL) {
        ship.setOrientation(Orientation.VERTICAL);
      } else {
        ship.setOrientation(Orientation.HORIZONTAL);
      }
    }
  }

  removeFromBoard(ship: Ship) {
    ship.removeFromBoard();
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j].getStatus() === CellStatus.OCCUPIED && this.board[i][j].getShipRef() === ship.getId()) {
          this.board[i][j].removeShipRef();
        }
      }
    }
    this.submitEnabled = false;
  }

  dragstart(ship: Ship) {
    this.draggingShip = ship;
  }

  private validDraggingCheck(row, col) {
    if (this.draggingShip.getOrientation() === Orientation.HORIZONTAL) {
      return col + Math.ceil(this.draggingShip.getLength() / 2) < 10 &&
        col + 1 - Math.floor(this.draggingShip.getLength() / 2) >= 0 &&
        this.checkOverlap(row, col);
    } else {
      return row + Math.ceil(this.draggingShip.getLength() / 2) < 10 &&
        row + 1 - Math.floor(this.draggingShip.getLength() / 2) >= 0 &&
        this.checkOverlap(row, col);
    }
  }

  private checkOverlap(row, col) {
    if (this.draggingShip.getOrientation() === Orientation.HORIZONTAL) {
      for (let i = -1; i < 2; i++) {
        for (let j = - Math.floor(this.draggingShip.getLength() / 2) - 1; j < Math.ceil(this.draggingShip.getLength() / 2) + 1; j++) {
          const rowAux = row + i;
          const colAux = col + j + 1;
          if (rowAux >= 0 && rowAux < 10 && colAux >= 0 && colAux < 10 && this.board[rowAux][colAux].getStatus() === CellStatus.OCCUPIED) {
            return false;
          }
        }
      }
    } else {
      for (let i = - Math.floor(this.draggingShip.getLength() / 2) - 1; i < Math.ceil(this.draggingShip.getLength() / 2) + 1; i++) {
        for (let j = -1; j < 2; j++) {
          const rowAux = row + i + 1;
          const colAux = col + j;
          if (rowAux >= 0 && rowAux < 10 && colAux >= 0 && colAux < 10 && this.board[rowAux][colAux].getStatus() === CellStatus.OCCUPIED) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private changeStatus(row, col, status: CellStatus) {
    if (this.draggingShip.getOrientation() === Orientation.HORIZONTAL) {
      for (let k = - Math.floor(this.draggingShip.getLength() / 2); k < Math.ceil(this.draggingShip.getLength() / 2); k++) {
        this.board[row][col + k + 1].setStatus(status);
        if (status === CellStatus.OCCUPIED) {
          this.board[row][col + k + 1].setShipRef(this.draggingShip.getId());
        }
      }
    } else {
      for (let k = - Math.floor(this.draggingShip.getLength() / 2); k < Math.ceil(this.draggingShip.getLength() / 2); k++) {
        this.board[row + k + 1][col].setStatus(status);
        if (status === CellStatus.OCCUPIED) {
          this.board[row + k + 1][col].setShipRef(this.draggingShip.getId());
        }
      }
    }

    if (status === CellStatus.OCCUPIED) {
      let allShipsOnBoard = true;
      let shipNotUsed: Ship;
      this.ships.forEach((ship) => {
        if (!ship.isUsed()) {
          shipNotUsed = ship;
          allShipsOnBoard = false;
        }
      });
      // console.log(shipNotUsed);
      this.submitEnabled = allShipsOnBoard;
    }

  }

  dragover(event) {
    event.preventDefault();
    const col = parseInt(event.target.getAttribute('col'), 10);
    const row = parseInt(event.target.getAttribute('row'), 10);
    this.validDragging = this.validDraggingCheck(row, col);
    if (this.validDragging) {
      this.changeStatus(row, col, CellStatus.OVER);
    }
  }

  drop(event) {
    event.preventDefault();
    const col = parseInt(event.target.getAttribute('col'), 10);
    const row = parseInt(event.target.getAttribute('row'), 10);
    if (this.validDragging) {
      this.draggingShip.setPosition(row, col + 1 - Math.floor(this.draggingShip.getLength() / 2));
      this.changeStatus(row, col, CellStatus.OCCUPIED);
    }
  }
  dragleave(event) {
    const col = parseInt(event.target.getAttribute('col'), 10);
    const row = parseInt(event.target.getAttribute('row'), 10);
    if (this.validDragging) {
      this.changeStatus(row, col, CellStatus.FREE);
    }
  }

  // TODO: da implementare
  sendBoard() {
    this.matchService.sendBoard(this.board, this.ships, this.id_match).subscribe(
      (data) => {
        this.error = false;
        this.boardUpdated = true;
      }, (error) => {
        this.error = true;
        this.errorMessage = error.errorMessage;
      });
  }

}
