import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private errmessage = undefined;
  private okmessage = undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log(this.userService.get_token());
    if(this.userService.get_token().length === 0){
      this.router.navigate(['/']);
    }
  }

  updateInfo(username: string, name: string, surname: string, mail: string, password1: string, password2: string){
    if(username === "" || name === "" || surname === "" || mail === "" || password1 === "" || password2 === ""){
      this.errmessage = "riempire tutti i campi.";
      this.okmessage = undefined;
    }
    else{
      if(password1 != password2){
        this.errmessage = "le password sono diverse.";
        this.okmessage = undefined;
      }
      else{
        this.userService.updateInfo(username, name, surname, mail, password1).subscribe((d) =>{
          console.log("User info " + username + " update");
          this.errmessage = undefined;
          this.okmessage = "Aggiornamento riuscito con successo!"
        }),(err) => {
          console.log("User info " + username + " update error: " + err);
          this.errmessage = err.error.errormessage || err.error.message;
          this.okmessage = undefined;
        }
      }
    } 
  }

  deleteThisUser(){
      var answer = confirm("Sei sicuro di cancellare l'utente?");
      var mailToDelete = this.userService.get_mail();
      if(answer){
        this.userService.deleteUser(mailToDelete).subscribe((d) => {
          console.log("User " + mailToDelete + " deleted");
          this.userService.logout();
          this.router.navigate(['/']);
        }),(err) => {
          console.log("Delete user " + mailToDelete + " error " + err);
        }
      }
  }
}
