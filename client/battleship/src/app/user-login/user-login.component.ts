import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private errmessage = undefined

  constructor(private userService: UserService, private router: Router ) {}

  ngOnInit() {
    this.userService.renew().subscribe((d) => {
      this.router.navigate(['/matches']);
    }, (err) => {
      console.log("Renew error: " + JSON.stringify(err.error.errormessage));
    })
  }

  login(username: string, password: string, remember: boolean){
    this.userService.login(username, password,remember).subscribe((d) => {
      this.errmessage = undefined;
      this.router.navigate(['/matches']);
    }, (err) => {
      console.log("Login error: " + JSON.stringify(err.error.errormessage));
      this.errmessage = err.error.errormessage;
    })
  }
}
