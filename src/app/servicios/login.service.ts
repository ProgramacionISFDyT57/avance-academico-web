import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public ini_sesion(email: string, clave:string){
    console.log(email, clave)
  }

  constructor() { }
}
