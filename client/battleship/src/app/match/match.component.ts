import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { MatchService } from "../match.service";
import { SocketioService } from "../socketio.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.css"]
})
export class MatchComponent implements OnInit, AfterViewInit {
  @ViewChild("battlefieldDOM") battlefieldDOM: ElementRef;
  private userName: string;
  private userMatches: string;
  columns: Array<string>;
  rows: Array<string>;
  private match;
  private id_match;

  constructor(
    private userService: UserService,
    private utilities: UtilitiesService,
    private matchService: MatchService,
    private socketIoService: SocketioService,
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
  }
  ngAfterViewInit() {
    document.addEventListener("DOMContentLoaded", App.init);
}

}

class App {
  static box;
  static className;
  static init() {

    App.box = document.getElementsByClassName("box")[0];

    App.box.addEventListener("dragstart", App.dragstart);
    App.box.addEventListener("dragend", App.dragend);

    const containers = document.getElementsByClassName("holder");

    for (const container of containers) {
      container.addEventListener("dragover", App.dragover);
      container.addEventListener("dragenter", App.dragenter);
      container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", App.drop);
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

  static drop() {
    this.className = "holder";
    this.append(App.box);
  }

}
