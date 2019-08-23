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

}
