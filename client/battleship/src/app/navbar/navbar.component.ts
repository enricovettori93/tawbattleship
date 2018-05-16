import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private is_logged = undefined;
  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.startEmiteService();
  }

  startEmiteService(){
    this.userService.is_logged.subscribe((mode: any) => {
      console.log("Emit user login: " + mode);
      this.is_logged = mode;
    })
  }
}
