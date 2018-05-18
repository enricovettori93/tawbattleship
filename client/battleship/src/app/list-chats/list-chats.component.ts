import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.component.html',
  styleUrls: ['./list-chats.component.css']
})
export class ListChatsComponent implements OnInit {
  private chats = [];
  constructor(private userService: UserService, private utilities: UtilitiesService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.getUserChats();
  }

  getUserChats(){
    this.userService.getUserChats().subscribe((data)=>{
      console.log("Chat trovate" + JSON.stringify(data));
      this.chats = data;
    });
  }
}
