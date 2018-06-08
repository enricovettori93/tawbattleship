import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { MatchService, Ship, ShipEnum, Cell, CellStatus, Orientation } from '../match.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
declare var $: any;
@Component({
  selector: 'app-match',
  templateUrl: './match-builder.component.html',
  styleUrls: ['./match-builder.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MatchBuilderComponent implements OnInit, AfterViewChecked {
  @ViewChild('battlefieldDOM') battlefieldDom: ElementRef;
  private userName: string;
  private userMatches: string;
  private draggingShip: Ship;
  private validDragging: boolean;
  private shipsDict: any;
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
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
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
    this.shipsDict = new Object();
    this.ships.forEach((ship) => {
      this.shipsDict[ship.getId()] = ship;
    }
    );
    this.board = new Array();
    for (let i = 0; i < 10; i++) {
      this.board.push(new Array());
      for (let j = 0; j < 10; j++) {
        const cell = new Cell(j, i);
        cell.setStatus(CellStatus.FREE);
        this.board[i].push(cell);
      }
    }

    this.activatedRoute.paramMap.subscribe((data) => {
      this.id_match = data.get('id');
      const socket = io(this.userService.url);
      socket.on('broadcast ' + this.id_match, (m) => {
        this.matchService.getMatchInfo(this.id_match).subscribe((match) => {
          this.match = match;
          if (match.status === 2) {
            this.router.navigate(['/match/' + this.match._id]);
          }
        }, (err) => {
          console.log(JSON.stringify(err));
        });
      });
      this.matchService.getMatchInfo(this.id_match).subscribe((match) => {
        this.match = match;
        if (match.status === 2) {
          this.router.navigate(['/match/' + this.match._id]);
        }
      }, (err) => {
        console.log(JSON.stringify(err));
      });
    });
  }
  private getElemAt(x, y, classID) {
    return $('body')
      .find('.' + classID)
      .filter(function () {
       if ($(this).offset().top < y && y < parseInt($(this).offset().top, 10) + $(this).height()
          && $(this).offset().left < x && x < parseInt($(this).offset().left, 10) + $(this).width()) {
          return true;
        }
        return false;
      });
  }

  ngAfterViewChecked() {
    const component = this;
    $('.ship').draggable({
      start: function () {
        component.dragstart(component.shipsDict[$(this).attr('id')]);
      },
      drag: function (event) {
        component.dragover(component.getElemAt(event.pageX, event.pageY, 'holder'));
      },
      stop: function(event) {
        component.drop(component.getElemAt(event.pageX, event.pageY, 'holder'));
      }
    });
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
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j].getStatus() === CellStatus.OVER) {
            this.board[i][j].setStatus(CellStatus.FREE);
          }
          if (row === i && (j === col ||
            ((col >= j) && (col - j) < Math.floor(this.draggingShip.getLength() / 2)) ||
            ((col < j) && (j - col) <= Math.ceil(this.draggingShip.getLength() / 2)))) {
            this.board[i][j].setStatus(status);
            if (status === CellStatus.OCCUPIED) {
              this.board[i][j].setShipRef(this.draggingShip.getId());
            }
          }
        }
      }
    } else {
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j].getStatus() === CellStatus.OVER) {
            this.board[i][j].setStatus(CellStatus.FREE);
          }
          if (col === j && (row === i ||
            ((row > i) && (row - i) < Math.floor(this.draggingShip.getLength() / 2)) ||
            ((row <= i) && (i - row) <= Math.ceil(this.draggingShip.getLength() / 2)))) {
            this.board[i][j].setStatus(status);
            if (status === CellStatus.OCCUPIED) {
              this.board[i][j].setShipRef(this.draggingShip.getId());
            }
          }
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

  dragover(elem) {
    const row = parseInt($(elem).attr('row'), 10);
    const col = parseInt($(elem).attr('col'), 10);
    this.validDragging = this.validDraggingCheck(row, col);
    if (this.validDragging) {
      this.changeStatus(row, col, CellStatus.OVER);
    }
  }

  drop(elem) {
    console.log(elem);
    const row = parseInt($(elem).attr('row'), 10);
    const col = parseInt($(elem).attr('col'), 10);
    if (this.validDragging) {
      this.draggingShip.setUsed();
      this.changeStatus(row, col, CellStatus.OCCUPIED);
    }
  }

  // TODO: da implementare
  sendBoard() {
    this.matchService.sendBoard(this.board, this.ships, this.id_match).subscribe(
      (data) => {
        this.error = false;
        this.boardUpdated = true;
      }, (error) => {
        this.errorMessage = error.error.errormessage;
        this.error = true;
      });
  }

}
