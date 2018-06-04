import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { MatchService, Ship, ShipEnum } from "../match.service";
import { SocketioService } from "../socketio.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.css"]
})

export class MatchComponent implements OnInit, AfterViewInit {
  @ViewChild("battlefieldDOM") battlefield: ElementRef;
  @ViewChild("ships") shipsDom: ElementRef;
  private userName: string;
  private userMatches: string;
  board: ElementRef[][];
  ships: Ship[];
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
    this.ships = new Array();
  }
  private initShips() {
    for (let i = 0; i < 4; i++) {
      this.ships.push(new Ship(ShipEnum.DESTROYER));
    }
    for (let i = 0; i < 3; i++) {
      this.ships.push(new Ship(ShipEnum.SUBMARINE));
    }
    for (let i = 0; i < 2; i++) {
      this.ships.push(new Ship(ShipEnum.BATTLESHIP));
    }
    for (let i = 0; i < 1; i++) {
      this.ships.push(new Ship(ShipEnum.AIRCRAFTCARRIER));
    }
  }
  ngAfterViewInit() {
    // init an empty array
    this.board = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.board[i] = new Array(10);
    }
    for (let i = 0; i < 10; i++) {
      const row = this.renderer.createElement("div");
      this.renderer.addClass(row, "row-" + i);
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = this.renderer.createElement("div");
        this.renderer.addClass(this.board[i][j], "holder");
        this.renderer.addClass(this.board[i][j], "col-" + j);
        this.renderer.appendChild(row, this.board[i][j]);
      }
      this.renderer.appendChild(this.battlefield.nativeElement, row);
    }
    this.initShips();
    this.ships.forEach((ship) => {
      for (let i = 0; i < ship.getLength(); i++) {
        const shipPart = this.renderer.createElement("div");
        this.renderer.addClass(shipPart, "box");
        this.renderer.setAttribute(shipPart, "draggable", "true");
        this.renderer.appendChild(this.shipsDom.nativeElement, shipPart);
      }
    });


  }

}
/*function drop() {
  this.className = "holder";
  this.append(App.box);
}
class App {
  static box;
  static className;
  static init() {

    App.box = document.getElementsByClassName("box")[0];

    App.box.addEventListener("dragstart", App.dragstart);
    App.box.addEventListener("dragend", App.dragend);

    const containers = [].slice.call(document.getElementsByClassName("holder"));

    for (const container of containers) {
      container.addEventListener("dragover", App.dragover);
      container.addEventListener("dragenter", App.dragenter);
      container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", drop);
    }
  }

  static dragstart() {
    this.className += " held";

    setTimeout(() => this.className = "invisible", 0);
  }

  static dragend() {
    this.className = "box";
  }

  static dragover(e) {
    e.preventDefault();
  }

  static dragenter(e) {
    e.preventDefault();
    this.className += " hovered";
  }

  static dragleave() {
    this.className = "holder";
  }

}*/
