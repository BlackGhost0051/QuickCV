import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from "@auth0/angular-jwt";
import {map} from 'rxjs/operators';
import {DOCUMENT} from "@angular/common";
import {Token} from "../models/token";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3100/api';

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
  }



  authenticate(credentials: any) {
    const localStorage = this.document.defaultView?.localStorage;
    return this.http.post(this.url + '/user/auth', {
      login: credentials.login,
      password: credentials.password
    }).pipe(
      map((result: Token | any) => {
        if (result && result.token) {
          localStorage?.setItem('token', result.token);
          return true;
        }
        return false;
      })
    );
  }

  register(credentials: any) {
    return this.http.post(this.url + '/user/register', credentials);
  }

  isLoggedIn() {
    const localStorage = this.document.defaultView?.localStorage;
    const jwtHelper = new JwtHelperService();
    const token = localStorage?.getItem('token');
    if (!token) {
      return false;
    }
    return !(jwtHelper.isTokenExpired(token));
  }

  logout(){
    const localStorage = this.document.defaultView?.localStorage;

    localStorage?.removeItem('token');
  }

  isAdmin(): Observable<boolean> {
    const localStorage = this.document.defaultView?.localStorage;
    const jwtHelper = new JwtHelperService();
    const token = localStorage?.getItem('token');

    if (!token || jwtHelper.isTokenExpired(token)) {
      return of(false);
    }

    return this.http.get<{ isAdmin: boolean }>(`${this.url}/user/isAdmin`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).pipe(
      map(response => response.isAdmin)
    );
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return new JwtHelperService().decodeToken(token);
  }

  getToken() {
    const localStorage = this.document.defaultView?.localStorage;
    return localStorage?.getItem('token');
  }
}
