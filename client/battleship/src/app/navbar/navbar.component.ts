import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private islogged;
  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.checkLogin();
  }

  checkLogin(){
    if(this.userService.is_logged()){
      this.islogged = true;
    }
    else{
      this.islogged = false;
    }
  }
}
