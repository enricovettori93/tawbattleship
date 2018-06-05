import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { MatchService, Ship, ShipEnum, Cell, CellStatus} from "../match.service";
import { SocketioService } from "../socketio.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.css"]
})

export class MatchComponent implements OnInit {
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
        this.board[i].push(new Cell(j, i));
      }
    }
  }

  /*ngAfterViewInit() {


  }*/

  dragstart(ship) {
    this.draggingShip = ship;
  }

  dragover(event) {
    event.preventDefault();
    const col = parseInt(event.target.getAttribute("col"), 10);
    const row = parseInt(event.target.getAttribute("row"), 10);
    if (col + this.draggingShip.getLength() / 2 < 10 && col + 1 - this.draggingShip.getLength() / 2 >= 0) {
      this.validDragging = true;
      for (let k = 0; k < this.draggingShip.getLength() / 2; k++) {
        this.board[row][col + k].setStatus(CellStatus.OVER);
      }
      for (let k = 0; k < this.draggingShip.getLength() / 2; k++) {
        this.board[row][col + 1 - k].setStatus(CellStatus.OVER);
      }
    }
  }

  drop(event) {
    event.preventDefault();
    const col = parseInt(event.target.getAttribute("col"), 10);
    const row = parseInt(event.target.getAttribute("row"), 10);
    if (col + this.draggingShip.getLength() / 2 < 10 && col + 1 - this.draggingShip.getLength() / 2 >= 0) {
      for (let k = 0; k < this.draggingShip.getLength() / 2; k++) {
        this.board[row][col + k].setStatus(CellStatus.OCCUPIED);
      }
      for (let k = 0; k < this.draggingShip.getLength() / 2; k++) {
        this.board[row][col + 1 - k].setStatus(CellStatus.OCCUPIED);
      }
    }
  }
  dragleave(event) {
    const col = parseInt(event.target.getAttribute("col"), 10);
    const row = parseInt(event.target.getAttribute("row"), 10);
    if (col + this.draggingShip.getLength() / 2 < 10 && col + 1 - this.draggingShip.getLength() / 2 >= 0) {
      for (let k = 0; k < this.draggingShip.getLength() / 2; k++) {
        this.board[row][col + k].setStatus(CellStatus.FREE);
      }
      for (let k = 0; k < this.draggingShip.getLength() / 2; k++) {
        this.board[row][col + 1 - k].setStatus(CellStatus.FREE);
      }
    }
    this.renderer.removeClass(event.target, "blue");
  }
}
