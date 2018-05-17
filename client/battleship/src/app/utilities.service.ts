import { Injectable } from '@angular/core';
import { HttpClientModule, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  public create_options(token,params = {}) {
    console.log("PARAMS QUERY " + JSON.stringify(params))
    return {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + token,
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({ fromObject: params })
    };
  }
}
