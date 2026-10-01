import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  role: 'admin' | 'user' | null = null;
  private readonly fakeToken = 'fake-jwt-token-12345-65586-55852-55852';

  constructor() { 
    if (typeof localStorage !== 'undefined') {
      const storedRole = localStorage.getItem('role') as 'admin' | 'user' | null;
      if (storedRole) {
        this.role = storedRole;
        this.isLoggedIn = true;
      }
    }
  }

  login(role: 'admin' | 'user' = 'admin') {
    this.isLoggedIn = true;
    this.role = role;
    localStorage.setItem('token', this.fakeToken);
    localStorage.setItem('role', role);
  }

  logout() {
    this.isLoggedIn = false;
    this.role = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return this.isLoggedIn ? this.fakeToken : null;
  }
}
