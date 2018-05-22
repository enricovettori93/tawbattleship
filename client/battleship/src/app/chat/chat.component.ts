import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private userService: UserService, private utilities: UtilitiesService) { }

  ngOnInit() {
    //this.utilities.check_auth(this.userService.get_token());
  }
  
}
