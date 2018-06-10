import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router, RouterLink } from "@angular/router";
import { UtilitiesService } from "../utilities.service";
import { SocketioService } from "../socketio.service";

declare var $: any;

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {

  private errmessage = undefined;
  private okmessage = undefined;

  // Variabile per controllare se l"utente corrente è admin
  private isAdmin = undefined;

  // Variabili usate per la view di altri utenti
  private routingNotCurrentUser = undefined;
  private otherUser = undefined;

  // Variabile per l"utente visualizzato
  private username = undefined;
  private totalePartite = undefined;

  constructor(private userService: UserService,
    private router: Router,
    private utilities: UtilitiesService,
    private socket: SocketioService) { }

  ngOnInit() {
    // console.log(this.userService.get_token());
    this.utilities.check_auth(this.userService.get_token());
    console.log("Routing in user component: " + this.router.url);
    if (this.router.url !== "/user") {
      this.routingNotCurrentUser = this.router.url.split("/").pop();
      console.log("User: " + this.routingNotCurrentUser);
      this.getUser();
    } else {
      this.username = this.userService.get_username();
    }
    this.isAdmin = this.userService.is_admin();
    this.socket.connect(this.userService.get_userId()).subscribe((m) => {
      $("#myModal").modal("show");
      $(".modal-backdrop").removeClass("modal-backdrop");
      setTimeout(function () {
        $("#myModal").modal("hide");
      }, 2000);
    });
  }

  updateInfo(username: string, name: string, surname: string, mail: string, password1: string, password2: string) {
    if (username === "" || name === "" || surname === "" || mail === "" || password1 === "" || password2 === "") {
      this.errmessage = "riempire tutti i campi.";
      this.okmessage = undefined;
    } else {
      if (password1 !== password2) {
        this.errmessage = "le password sono diverse.";
        this.okmessage = undefined;
      } else {
        this.userService.updateInfo(username, name, surname, mail, password1, this.isAdmin).subscribe((d) => {
          this.userService.renew().subscribe((returnData) => {
            console.log(JSON.stringify(returnData));
            console.log("User info " + username + " update");
            this.username = username;
            this.errmessage = undefined;
            this.okmessage = "Account aggiornato con successo.";
          }, (err) => {
            console.log("User info " + username + " update error: " + err);
            this.errmessage = err.error.errormessage || err.error.message;
            this.okmessage = undefined;
          }, () => {
          console.log("Completed");
        });
      });
    }
  }
}

  updateInfoAdminOtherUser(username: string, isAdmin: boolean) {
    this.userService.updateInfoAdmin(username, isAdmin).subscribe((d) => {
      console.log("User info " + username + " update in status admin: " + isAdmin);
      this.errmessage = undefined;
      this.okmessage = "Account aggiornato con successo.";
    }, (err) => {
      console.log("User info " + username + " update in status admin " + isAdmin + "error: " + err);
      this.errmessage = err.error.errormessage || err.error.message;
      this.okmessage = undefined;
    });
  }

  changeStatusAdminOtherAccount() {
    console.log("Stato vecchio: " + this.otherUser.isAdmin + " stato nuovo " + !this.otherUser.isAdmin);
    this.otherUser.isAdmin = !this.otherUser.isAdmin;
  }

  changeStatusAdminThisAccount() {
    console.log("Stato vecchio: " + this.isAdmin + " stato nuovo " + !this.isAdmin);
    this.isAdmin = !this.isAdmin;
  }

  deleteThisUser() {
    const answer = confirm("Sei sicuro di cancellare l'utente ? ");
    const userToDelete = this.username;
    if (answer) {
      this.userService.deleteUser(userToDelete).subscribe((d) => {
        console.log("User " + userToDelete + " deleted");
        if (userToDelete === this.userService.get_username()) {
          this.userService.logout();
          this.router.navigate(["/"]);
        } else {
          this.router.navigate(["/players"]);
        }
      }, (err) => {
        console.log("Delete user " + userToDelete + " error " + err);
      });
    }
  }

  getUser() {
    this.userService.getInfoUser(this.routingNotCurrentUser).subscribe((d) => {
      console.log("Getting user " + JSON.stringify(d) + " OK");
      this.otherUser = d;
      if (this.otherUser != null) {
        this.username = this.otherUser.username;
        this.totalePartite = this.otherUser.partiteVinte + this.otherUser.partitePerse;
      }
    }, (err) => {
      console.log("Error getting user " + err);
    });
  }

  /**
   * Click del pulsante "Invia messaggio" sulla scheda dell"utente
   * Inizialmente richiede al server la lista delle chat dell"utente loggato, se scorrendo la lista
   * trova la chat tra i 2 utenti, si viene reindirizzati a quella chat, altrimenti ne
   * viene creata una nuova
   */
  clickButtonSendMessageUserInfo() {
    this.userService.getUserChats().subscribe((data) => {
      const chats = data[0]["chatList"];
      let find = false;
      chats.forEach(element => {
        // console.log(JSON.stringify(element) + " ID 1 USER CHAT " +
        // element["user1ID"]["_id"] + " ID 2 USER " + element["user2ID"]["_id"]);
        // console.log("OTHER USER ID " + this.otherUser._id + " CURRENT ID " + this.userService.get_userId());
        if ((element["user1ID"]["_id"] === this.otherUser._id &&
        element["user2ID"]["_id"] === this.userService.get_userId()) ||
        (element["user2ID"]["_id"] === this.otherUser._id && element["user1ID"]["_id"] === this.userService.get_userId())) {
          find = true;
          this.router.navigate(["/chats/" + element["_id"]]);
        }
      });
      if (!find) {
        this.createChat();
      }
    }, (err) => {
      console.log("Error getting active user chat " + err);
    });
  }

  /**
   * Crea la chat tra l"utente loggato e l"utente visualizzato nella scheda, infine si viene reindirizzati alla nuova chat
   */
  createChat() {
    this.userService.createChat(this.username).subscribe((newChat) => {
      console.log("CHAT CREATA " + JSON.stringify(newChat));
      this.router.navigate(["/chats/" + newChat["id"]]);
    }, (err) => {
      console.log("Error creating user chat " + err);
    });
  }
}
