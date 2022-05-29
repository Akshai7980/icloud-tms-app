/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

const BASE_URL = 'https://login.icloudtms.com/api/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public userToken: string;

  constructor(public http: HttpClient, private token: TokenService) {
    this.userToken = this.token.getToken();
  }

  postRequestForLogin(path: string, params: any) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    };
    return this.http.post(BASE_URL + path, params, { headers });
  }

  getRequest(path: string) {
    const headers = {
      Accept: 'text/plain',
      Authorization: 'Bearer ' + this.userToken,
    };
    return this.http.get(BASE_URL + path, { headers });
  }

  getRequestWithParams(path: string, params: any) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
      Authorization: 'Bearer ' + this.userToken,
    };
    return this.http.get(BASE_URL + path + params, { headers });
  }

  postRequestWithoutParams(path: string) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
      Authorization: 'Bearer ' + this.userToken,
    };
    return this.http.post(BASE_URL + path, { headers });
  }

  postRequestWithParams(path: string, params: any) {
    const headers = {
      'Content-Type': 'application/json',
      accept: 'text/plain',
      Authorization: 'Bearer ' + this.userToken,
    };
    return this.http.post(BASE_URL + path, params, { headers });
  }
}
