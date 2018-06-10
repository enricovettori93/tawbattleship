import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { SocketioService } from '../socketio.service';

declare var $: any;

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.component.html',
  styleUrls: ['./list-chats.component.css']
})
export class ListChatsComponent implements OnInit {
  private chats = [];
  constructor(private userService: UserService, private utilities: UtilitiesService, private socket: SocketioService) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.getUserChats();
    this.socket.connect(this.userService.get_userId()).subscribe((m) => {
      $('#myModal').modal('show');
      $('.modal-backdrop').removeClass('modal-backdrop');
      setTimeout(function () {
        $('#myModal').modal('hide');
      }, 2000);
    });
  }

  getUserChats() {
    this.userService.getUserChats().subscribe((data) => {
      // console.log('Chat trovate' + JSON.stringify(data));
      this.chats = data[0]['chatList'];
    });
  }

  deleteChat(id: string) {
    const answer = confirm('Sei sicuro di voler cancellare questa chat?');
    if (answer) {
      this.userService.deleteChat(id).subscribe((data) => {
        //console.log(JSON.stringify(data));
        this.getUserChats();
      });
    }
  }
}
