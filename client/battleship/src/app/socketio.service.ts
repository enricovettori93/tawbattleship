import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket;

  constructor(private userService: UserService) { }

  /**
   * Il parametro id serve per una connessione broadcast specifica a quell'id
   * Utile per far si che se un utente B scriva un messaggio ad un utente C
   * non si triggera il canale broadcast dell'utente A loggato e visitante una pagina 
   * che richieda un canale broadcast
   */
  connect(id: string): Observable<any> {
    this.socket = io(this.userService.url);
    return new Observable((observer) => {
      this.socket.on('broadcast ' + id, (m) => {
        console.log('Received socket message: ' + JSON.stringify(m));
        observer.next(m);
      });
      this.socket.on('error ' + id, (err) => {
        console.log('Error socket received: ' + JSON.stringify(err));
        observer.error(err);
      });
      return {
        unsubscribe() {
          this.socket.disconnect();
        }
      }
    })
  }
}
