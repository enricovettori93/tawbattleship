import { Injectable } from "@angular/core";
import { HttpClientModule, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UtilitiesService {

  public static getPublicUrl() {
    return "http://localhost:8080";
  }
  constructor(private router: Router) { }

  public create_options(token, params = {}) {
    // console.log("TOKEN: " + JSON.stringify(token) + "PARAMS QUERY " + JSON.stringify(params));
    return {
      headers: new HttpHeaders({
        "authorization": "Bearer " + token,
        "cache-control": "no-cache",
        "Content-Type": "application/json",
      }),
      params: new HttpParams({ fromObject: params })
    };
  }

  public check_auth(token: string) {
    if (token.length === 0) {
      this.router.navigate(["/"]);
    }
  }

}
