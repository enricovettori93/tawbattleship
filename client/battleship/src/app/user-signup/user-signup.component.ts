import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  private errmessage = undefined;
  private user = {mail: '', name: '', surname: '', username: '', password: ''};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signup(){
    this.userService.register(this.user).subscribe((d) => {
      console.log(this.user.username + " added");
      this.errmessage = undefined;
      this.router.navigate(['/login']);
    }),(err) => {
      console.log("Signup error: " + JSON.stringify(err.error.errormessage));
      this.errmessage = err.error.errormessage || err.error.message;
    }
  }
}
