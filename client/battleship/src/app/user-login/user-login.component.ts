import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { UtilitiesService } from "../utilities.service";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {

  private errmessage = undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    /*
    TODO Da sistemare
    if (this.userService.is_user_logged()) {
      this.router.navigate(["/user"]);
    }
    this.userService.renew().subscribe((d) => {
      this.router.navigate(["/user"]);
    }, (err) => {
      console.log("Renew error: " + JSON.stringify(err.error.errormessage));
    })*/
  }

  login(username: string, password: string, remember: boolean) {
    if (username === "" || password === "") {
      this.errmessage = "dati mancanti.";
    } else {
      console.log(username + " try to login");
      this.userService.login(username, password).subscribe((d) => {
        this.errmessage = undefined;
        this.router.navigate(["/user"]);
      }, (err) => {
        console.log("Login error: " + JSON.stringify(err.error.errormessage));
        if (JSON.stringify(err.error.errormessage) === undefined) {
          this.errmessage = "impossibile contattare il server";
        } else{
          this.errmessage = err.error.errormessage;
        }
      });
    }
  }
}
