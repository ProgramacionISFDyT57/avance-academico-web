import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../modelos/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://avance-academico-backend.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  public ini_sesion(email: string, clave: string): Observable<Login> {
    const body = {
      mail: email,
      clave,
    };
    return this.http.post<any>(this.apiUrl + '/login', body);
  }


}
