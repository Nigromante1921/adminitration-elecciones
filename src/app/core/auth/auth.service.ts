import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {EnvServiceProvider} from "../env/env.service.provider";
import {JwtHelperService} from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  public refresh(): Observable<Response> {
    const url = EnvServiceProvider.useFactory().REST_API + '/api/v5/auth/refresh';
    const token = sessionStorage.getItem('refresh-token');

    return this._httpClient.post<Response>(url, {},  {headers: {'Refresh': `Bearer ${token}`} } ).pipe(map((res) => res));
  }

  public setTokenSessionStorage(token: any): void {
    const {access_token, refresh_token} = token;
    sessionStorage.setItem('access-token', access_token);
    sessionStorage.setItem('refresh-token', refresh_token);
  }
  private getTokenRefreshData(): any {
    const token = sessionStorage.getItem('refresh-token');
    if (token) {
      return helper.decodeToken(token);
    } else {
      return null;
    }
  }

  public getSessionExp(): number {
    if (this.getTokenRefreshData()) {
      return this.getTokenRefreshData().exp;
    }
    return 0;
  }
}
