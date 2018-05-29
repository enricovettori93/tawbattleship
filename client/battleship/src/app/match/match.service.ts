import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private userId: string;
  private http: HttpClient;

  constructor(userId: string) {
    this.userId = userId;
  }

  getUserActiveMatch() {
    let res: any;
    this.http.get(UtilitiesService.getPublicUrl() + '/matches/' + this.userId).subscribe(
      data => {
        res = data;
        console.log(data);
      }
    );
    return res;
  }
}

export class Match {
  constructor(id, owner) {

  }
}
