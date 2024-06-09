import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly loggedInUsernameKey = 'loggedInUsername';
  private readonly loggedInRoleIdKey = 'loggedInRoleId';

  constructor() { }

  // Método para iniciar sesión
  login(username: string, roleId: number) {
    localStorage.setItem(this.loggedInUsernameKey, username);
    localStorage.setItem(this.loggedInRoleIdKey, roleId.toString());
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem(this.loggedInUsernameKey);
    localStorage.removeItem(this.loggedInRoleIdKey);
  }

  // Método para obtener el nombre de usuario logueado
  getLoggedInUsername(): string | null {
    return localStorage.getItem(this.loggedInUsernameKey);
  }

  // Método para obtener el role_id del usuario logueado
  getRoleId(): number | null {
    const roleId = localStorage.getItem(this.loggedInRoleIdKey);
    return roleId ? parseInt(roleId) : null;
  }
}
