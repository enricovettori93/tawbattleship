import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { Router } from '@angular/router';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private messages = [];
  private id_user;
  private error = undefined;
  private id_chat;
  private textMessage;
  constructor(private userService: UserService, private utilities: UtilitiesService, private router: Router, private socketService: SocketioService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.id_user = this.userService.get_userId();
    this.id_chat = this.router.url.split('/').pop();
    this.getMessagge();
    this.socketService.connect(this.id_chat).subscribe((m) => {
      this.getMessagge();
    })
  }

  getMessagge(){
    this.userService.getUserSingleChat(this.router.url.split('/').pop()).subscribe((messages) => {
      this.messages = messages[0]['listMessage'];
      window.scrollTo(0,document.body.scrollHeight);
      //console.log("MESSAGGI: " + JSON.stringify(this.messages));
    })
  }

  sendMessage(){
    if(this.textMessage === ""){
      this.error = "Messaggio vuoto"
    }
    else{
      console.log(this.textMessage);
      this.userService.sendMessage(this.id_chat,this.textMessage).subscribe((data) => {
        this.textMessage = "";
        console.log(JSON.stringify(data));
      })
      this.error = undefined;
    }
  }
}
