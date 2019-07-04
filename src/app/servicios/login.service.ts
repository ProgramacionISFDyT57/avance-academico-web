import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Login } from '../modelos/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpService
  ) { }

  public ini_sesion(email: string, clave: string): Observable<Login> {
    const body = {
      mail: email,
      clave,
    };
    return this.http.post('/login', body);
  }


}
