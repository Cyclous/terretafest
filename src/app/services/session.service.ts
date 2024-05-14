import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly loggedInUsernameKey = 'loggedInUsername';

  constructor() { }

  // Método para iniciar sesión
  login(username: string) {
    localStorage.setItem(this.loggedInUsernameKey, username);
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem(this.loggedInUsernameKey);
  }

  // Método para obtener el nombre de usuario logueado
  getLoggedInUsername(): string | null {
    return localStorage.getItem(this.loggedInUsernameKey);
  }
}
