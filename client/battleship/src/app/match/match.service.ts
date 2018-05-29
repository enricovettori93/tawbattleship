import { Injectable } from "@angular/core";
import { UserService } from "../user.service";
import { UtilitiesService } from "../utilities.service";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MatchService {
  private userId: string;

  constructor(userId: string, private utilities: UtilitiesService, private user: UserService, private http: HttpClient) {
    this.userId = userId;
  }

  public createMatch() {
    this.http.post(UtilitiesService.getPublicUrl() + "/matches/", {}, this.utilities.create_options(this.user.get_token)).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  public getUserActiveMatch() {
    let res: any;
    this.http.get(UtilitiesService.getPublicUrl() + "/matches/" + this.userId).subscribe(
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
