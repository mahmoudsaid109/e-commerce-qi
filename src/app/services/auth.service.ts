import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  private readonly fakeToken = 'fake-jwt-token-12345-65586-55852-55852';

  constructor() { }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('token', this.fakeToken);
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return this.isLoggedIn ? this.fakeToken : null;
  }
}
