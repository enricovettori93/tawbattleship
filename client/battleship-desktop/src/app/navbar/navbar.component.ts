import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService) { }
  ngOnInit() {}
  is_logged() {
    return this.userService.is_user_logged();
  }

  logout() {
    this.userService.logout();
  }
}
