import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  private logged;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.is_logged()){
      this.logged = true;
    }
    else{
      this.logged = false;
    }
  }

}
