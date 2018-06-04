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
  shipsDOM = new Array<ElementRef>();
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

  ngAfterViewInit() {
    // init an empty array
    this.board = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.board[i] = new Array(10);
    }
    for (let i = 0; i < 10; i++) {
      const row = this.renderer.createElement("div");
      this.renderer.addClass(row, "row-" + i);
      this.renderer.addClass(row, "board-row");
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = this.renderer.createElement("div");
        this.renderer.addClass(this.board[i][j], "holder");
        this.renderer.addClass(this.board[i][j], "col-" + j);
        this.renderer.listen(this.board[i][j], "dragover", (event) => {
          event.preventDefault(console.log(event.dataTransfer.getData()));
          this.renderer.addClass(event.target, "blue");
        });
        this.renderer.listen(this.board[i][j], "drop", (event) => {
          event.preventDefault();
          console.log(event);
          this.renderer.addClass(event.target, "red");
        });
        this.renderer.listen(this.board[i][j], "dragleave", (event) => {
          console.log(event);
          this.renderer.removeClass(event.target, "blue");
        });
        // just to pass to the anonymous function
        const renderer = this.renderer;
        this.renderer.appendChild(row, this.board[i][j]);
      }
      this.renderer.appendChild(this.battlefield.nativeElement, row);
    }
    this.ships = this.matchService.initShips();
    this.ships.forEach((ship) => {
      const shipDOM = this.renderer.createElement("div");
      this.shipsDOM.push(shipDOM);
      this.renderer.addClass(shipDOM, "ship");
      this.renderer.setAttribute(shipDOM, "draggable", "true");
      this.renderer.listen(shipDOM, "dragstart", (event) => {
        event.dataTransfer.
        event.dataTransfer.setData("Number", ship.getLength());
      });
      for (let i = 0; i < ship.getLength(); i++) {
        const shipPart = this.renderer.createElement("div");
        this.renderer.addClass(shipPart, "box-" + i);
        this.renderer.addClass(shipPart, "shipPart");
        this.renderer.appendChild(this.shipsDOM[this.shipsDOM.length - 1], shipPart);
      }
      this.renderer.appendChild(this.shipsDom.nativeElement, shipDOM);
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
