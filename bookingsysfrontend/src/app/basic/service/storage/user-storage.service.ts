import { Injectable } from '@angular/core';

const TOKEN = '_s_token';
const USER = '_s_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user: any): void {
  window.localStorage.removeItem(USER);
  window.localStorage.setItem(USER, JSON.stringify(user));
}

static getUser(): any {
  return JSON.parse(localStorage.getItem(USER));
}

static getUserId(): string {
  const user = this.getUser();
  if (user === null) {
    return '';
  }
  return user.userId;
}

static getUserName(): string {
  const user = this.getUser();
  if (user === null) {
    return '';
  }
  return user.name;
}

static getUserRole(): string {
  const user = this.getUser();
  if (user === null) {
    return '';
  }
  return user.role;
}

static isClientLoggedIn(): boolean {
  if (this.getToken() === null) {
    return false;
  }
  const role: string = this.getUserRole();
  return role == 'CLIENT';
}

static isCompanyLoggedIn(): boolean {
  if (this.getToken() === null) {
    return false;
  }
  const role: string = this.getUserRole();
  return role == 'COMPANY';
}

static signOut(): void {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER);
}

 
}
