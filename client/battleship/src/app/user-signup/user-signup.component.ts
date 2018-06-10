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
  private user = { mail: '', name: '', surname: '', username: '', password: '' };
  private equalpassword = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  checkPassword(password1: string, password2: string) {
    if (password1 === password2) {
      this.equalpassword = true;
      this.user.password = password1;
    }
    else {
      this.equalpassword = false;
      this.user.password = undefined;
    }
  }

  signup() {
    if (this.equalpassword == true) {
      this.userService.register(this.user).subscribe( result => {
        //console.log(this.user.username + " added");
        this.errmessage = undefined;
        this.router.navigate(['/login']);
      }, err => {
        console.log("Signup error: " + JSON.stringify(err));
        this.errmessage = err.error.errormessage || err.error.message;
      });
    }
    else {
      this.errmessage = "password diverse"
    }
  }
}
