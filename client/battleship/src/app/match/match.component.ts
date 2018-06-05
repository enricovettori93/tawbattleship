import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { MatchService, Ship, ShipEnum, Cell, CellStatus, Orientation } from "../match.service";
import { SocketioService } from "../socketio.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.css"],
  encapsulation: ViewEncapsulation.None
})

export class MatchComponent implements OnInit {
  @ViewChild("battlefieldDOM") battlefieldDom: ElementRef;
  private userName: string;
  private userMatches: string;
  private draggingShip: Ship;
  private validDragging: boolean;
  board: Cell[][];
  ships: Array<Ship>;

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
    this.id_match = (this.router.url.split("/"))[2];
    this.columns = Array(10).fill(0).map((x, i) => (String.fromCharCode(97 + i)));
    this.rows = Array(10).fill(0).map((x, i) => (i + ""));
    /** TODO
     * this.socketIoService.connect(this.id_match).subscribe((data) => {

    }
    );*/
    this.matchService.getSingleMatch(this.id_match).subscribe((match) => {
      this.match = match;
    }, (err) => {
      console.log(JSON.stringify(err));
    });
    this.ships = this.matchService.initShips();
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
    if (ship.getOrientation() === Orientation.HORIZONTAL) {
      ship.setOrientation(Orientation.VERTICAL);
    } else {
      ship.setOrientation(Orientation.HORIZONTAL);
    }
  }

  dragstart(ship: Ship) {
    this.draggingShip = ship;
  }

  private validDraggingCheck(row, col) {
    return col + Math.ceil(this.draggingShip.getLength() / 2) < 10 &&
      col + 1 - Math.floor(this.draggingShip.getLength() / 2) >= 0 &&
      this.checkOverlap(row, col);
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
    }
    return true;
  }

  private changeStatus(row, col, status: CellStatus) {
    if (this.draggingShip.getOrientation() === Orientation.HORIZONTAL) {
      for (let k = - Math.floor(this.draggingShip.getLength() / 2); k < Math.ceil(this.draggingShip.getLength() / 2); k++) {
        this.board[row][col + k + 1].setStatus(status);
      }
    }
  }

  dragover(event) {
    event.preventDefault();
    const col = parseInt(event.target.getAttribute("col"), 10);
    const row = parseInt(event.target.getAttribute("row"), 10);
    this.validDragging = this.validDraggingCheck(row, col);
    if (this.validDragging) {
      this.changeStatus(row, col, CellStatus.OVER);
    }
  }

  drop(event) {
    event.preventDefault();
    const col = parseInt(event.target.getAttribute("col"), 10);
    const row = parseInt(event.target.getAttribute("row"), 10);
    if (this.validDragging) {
      this.changeStatus(row, col, CellStatus.OCCUPIED);
      this.draggingShip.setPosition(row, col + 1 - Math.floor(this.draggingShip.getLength() / 2));
    }
  }
  dragleave(event) {
    const col = parseInt(event.target.getAttribute("col"), 10);
    const row = parseInt(event.target.getAttribute("row"), 10);
    if (this.validDragging) {
      this.changeStatus(row, col, CellStatus.FREE);
    }
  }

  dragend(event) {
    if (this.validDragging) {
    }
  }
}
