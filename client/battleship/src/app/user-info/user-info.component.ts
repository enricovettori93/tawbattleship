import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private errmessage = undefined;
  private okmessage = undefined;
  private isAdmin = undefined;
  private routingNotCurrentUser = undefined;
  private otherUser = undefined;
  private otherUserIsAdmin = undefined;

  constructor(private userService: UserService, private router: Router, private utilities: UtilitiesService) { }

  ngOnInit() {
    //console.log(this.userService.get_token());
    this.utilities.check_auth(this.userService.get_token());
    console.log("Routing in user component: " + this.router.url);
    if (this.router.url != "/user") {
      this.routingNotCurrentUser = this.router.url.split('/').pop();
      console.log("User: " + this.routingNotCurrentUser);
      this.getUser();
    }
    this.isAdmin = this.userService.is_admin();
  }

  updateInfo(username: string, name: string, surname: string, mail: string, password1: string, password2: string) {
    if (username === "" || name === "" || surname === "" || mail === "" || password1 === "" || password2 === "") {
      this.errmessage = "riempire tutti i campi.";
      this.okmessage = undefined;
    }
    else {
      if (password1 != password2) {
        this.errmessage = "le password sono diverse.";
        this.okmessage = undefined;
      }
      else {
        this.userService.updateInfo(username, name, surname, mail, password1, this.isAdmin).subscribe((d) => {
          console.log("User info " + username + " update");
          this.errmessage = undefined;
          this.okmessage = "Account aggiornato con successo."
        }), (err) => {
          console.log("User info " + username + " update error: " + err);
          this.errmessage = err.error.errormessage || err.error.message;
          this.okmessage = undefined;
        }
      }
    }
  }

  updateInfoAdmin(username: string, isAdmin: boolean) {
    this.userService.updateInfoAdmin(username, isAdmin).subscribe((d) => {
      console.log("User info " + username + " update in status admin: " + isAdmin);
      this.errmessage = undefined;
      this.okmessage = "Account aggiornato con successo."
    }), (err) => {
      console.log("User info " + username + " update in status admin " + isAdmin + "error: " + err);
      this.errmessage = err.error.errormessage || err.error.message;
      this.okmessage = undefined;
    }
  }

  changeStatusAdminOtherAccount() {
    console.log("Stato vecchio: " + this.otherUserIsAdmin + " stato nuovo " + !this.otherUserIsAdmin);
    this.otherUserIsAdmin = !this.otherUserIsAdmin;
  }

  changeStatusAdminThisAccount() {
    console.log("Stato vecchio: " + this.isAdmin + " stato nuovo " + !this.isAdmin);
    this.isAdmin = !this.isAdmin;
  }

  deleteThisUser() {
    var answer = confirm("Sei sicuro di cancellare l'utente?");
    var userToDelete = this.userService.get_username();
    if (answer) {
      this.userService.deleteUser(userToDelete).subscribe((d) => {
        console.log("User " + userToDelete + " deleted");
        this.userService.logout();
        this.router.navigate(['/']);
      }), (err) => {
        console.log("Delete user " + userToDelete + " error " + err);
      }
    }
  }

  getUser() {
    this.userService.getInfoUser(this.routingNotCurrentUser).subscribe((d) => {
      console.log("Getting user " + JSON.stringify(d) + " OK");
      this.otherUser = d;
      this.otherUserIsAdmin = this.otherUser.isAdmin;
    }), (err) => {
      console.log("Error getting user " + err);
    }
  }
}
