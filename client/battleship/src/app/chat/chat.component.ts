import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private messagges = [];
  private id_user;
  constructor(private userService: UserService, private utilities: UtilitiesService, private router: Router) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.id_user = this.userService.get_userId();
    this.getMessagge();
  }

  getMessagge(){
    this.userService.getUserSingleChat(this.router.url.split('/').pop()).subscribe((messagges) => {
      this.messagges = messagges[0]['listMessage'];
      console.log("MESSAGGI: " + JSON.stringify(this.messagges));
    })
  }
}
