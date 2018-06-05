import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { Router } from "@angular/router";
import { SocketioService } from "../socketio.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  private messages = [];
  private messagesToShow = [];
  private id_user;
  private error = undefined;
  private id_chat;
  private textMessage = undefined;
  private showMessage = -10;
  constructor(private userService: UserService,
    private utilities: UtilitiesService,
    private router: Router,
    private socketService: SocketioService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.id_user = this.userService.get_userId();
    this.id_chat = this.router.url.split("/").pop();
    this.getMessagge();
    this.socketService.connect(this.id_chat).subscribe((m) => {
      this.getMessagge();
    });
  }

  showMoreMessages(){
    this.showMessage -= 10;
    this.messagesToShow = this.messages.slice(this.showMessage);
  }

  getMessagge() {
    this.userService.getUserSingleChat(this.router.url.split("/").pop()).subscribe((messages) => {
      this.messages = messages[0]["listMessage"];
      if(this.messages.length <= 10){
        this.messagesToShow = this.messages;
      }
      else{
        this.messagesToShow = this.messages.slice(this.showMessage);
      }
      this.scrollDown();
      // console.log("MESSAGGI: " + JSON.stringify(this.messages) + " num. messaggi" + this.messages.length);
    });
  }

  scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  sendMessage() {
    if (this.textMessage == "" || this.textMessage == undefined) {
      this.error = "Impossibile inviare un messaggio vuoto";
    } else {
      console.log(this.textMessage);
      this.userService.sendMessage(this.id_chat, this.textMessage).subscribe((data) => {
        this.textMessage = "";
        console.log(JSON.stringify(data));
      });
      this.error = undefined;
    }
  }
}
