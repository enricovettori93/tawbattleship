import { Component, OnInit } from "@angular/core";
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
export class MatchComponent implements OnInit {
  private userName: string;
  private userMatches: string;

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
    this.socketIoService.connect(this.id_match).subscribe((data) => {
      this.matchService.getSingleMatch(this.id_match).subscribe((match) => {
        this.match = match;
      }, (err) => {
        console.log(JSON.stringify(err));
      });
    }
    );
  }

}
