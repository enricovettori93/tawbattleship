import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { MatchService } from "./match.service";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.css"]
})
export class MatchComponent implements OnInit {
  private userName: string;
  private userMatches: string;
  private matchService: MatchService;

  constructor(private userService: UserService, private utilities: UtilitiesService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.matchService = new MatchService(this.userService.get_userId(), this.utilities, this.userService);
    this.matchService.createMatch();
  }

}
