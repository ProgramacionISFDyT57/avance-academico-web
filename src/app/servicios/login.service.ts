import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  backend= 'https://avance-academico-backend.herokuapp.com'
  constructor(
    private http:HttpClient
  ) { };

  public ini_sesion(email: string, clave:string): Observable<any>{
    const body={
      mail: email,
      clave: clave,
    }
    return this.http.post(this.backend +'/login',body)
  }


}
