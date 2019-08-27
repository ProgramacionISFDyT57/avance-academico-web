import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public rolesAdmitidos(roles: string[]): boolean {
    const rolActual = sessionStorage.getItem('rol');
    if (roles.includes(rolActual) || rolActual === 'admin') {
      return true;
    }
    return false;
  }

  public rolActual() {
    return sessionStorage.getItem('rol');
  }

  public fechaActualIncluida(fechaInicio: string, fechaLimite: string) {
    const fechaI = new Date(fechaInicio);
    const fechaL = new Date(fechaLimite);
    const fechaA = new Date();
    if (fechaA >= fechaI && fechaA <= fechaL) {
      return true;
    } else {
      return false;
    }
  }

}
