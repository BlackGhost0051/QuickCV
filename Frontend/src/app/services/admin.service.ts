import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3100/api';

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

  private getToken(): string | null {
    return this.document.defaultView?.localStorage?.getItem('token') || null;
  }

  getAllUsers() {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer  ${token}` }) : undefined;
    return this.http.get(`${this.apiUrl}/user/get_all_users`);
  }

  deleteUser(login: string) {
    return this.http.delete(`${this.apiUrl}/user/delete_user`, { body: { login } });
  }
}
