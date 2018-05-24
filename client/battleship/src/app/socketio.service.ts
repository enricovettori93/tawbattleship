import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket;

  constructor(private userService: UserService) { }

  /*connect(): Observable<any> {
    this.socket = io(this.userService.url);
    return new Observable((observer) => {
      this.socket.on('broadcast', (m) => {
        console.log('Received socket message: ' + JSON.stringify(m));
        observer.next(m);
      });
      this.socket.on('error', (err) => {
        console.log('Error socket received: ' + JSON.stringify(err));
        observer.error(err);
      });
      return {
        unsubscribe() {
          this.socket.disconnect();
        }
      }
    })
  }*/
}
