import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { MatchService } from "../match.service";
import { SocketioService } from "../socketio.service";
import { Router, RouterLink } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";

declare var $: any;

@Component({
  selector: "app-list-matches",
  templateUrl: "./list-matches.component.html",
  styleUrls: ["./list-matches.component.css"]
})
export class ListMatchesComponent implements OnInit {

  private matches = [];
  private errormessage = undefined;
  private userRoutingMatch = undefined;
  private userHadAlreadyWaitingMatch = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private utilities: UtilitiesService,
    private matchService: MatchService,
    private socketService: SocketioService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.socketService.connect(this.userService.get_userId()).subscribe((m) => {
      $("#myModal").modal("show");
      $(".modal-backdrop").removeClass("modal-backdrop");
      setTimeout(function () {
        $("#myModal").modal("hide");
      }, 2000);
    });
    if (this.router.url === "/match") {
      this.getWaitingMatch();
    } else {
      const arrayString = this.router.url.split("/");
      this.userRoutingMatch = arrayString[2];
      this.getUserMatch();
    }
  }

  getWaitingMatch() {
    this.matches = [];
    this.matchService.getWaitingMatch().subscribe((data) => {
      data.forEach(element => {
        // console.log(element);
        if (element.owner != null) {
          if (this.userService.get_userId() === element.owner._id) {
            this.userHadAlreadyWaitingMatch = true;
            // console.log("AH-HA sgamato!!");
          }
        }
      });
      this.matches = data;
    });
  }

  enterMatch(idMatch: string) {
    this.router.navigate(["/match/" + idMatch + "/board"]);
  }

  getUserMatch() {
    this.matches = [];
    this.matchService.getUserMatches(this.userRoutingMatch).subscribe((data) => {
      this.matches = data;
    });
  }

  createMatch() {
    this.matchService.createMatch().subscribe((data) => {
      this.errormessage = undefined;
      this.router.navigate(["/match/" + data.id + "/board"]);
    }, (err) => {
      this.errormessage = err.error.errormessage;
    });
  }
}
