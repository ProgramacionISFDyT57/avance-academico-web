import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  backend= 'https://avance-academico-backend.herokuapp.com'
    constructor(
      private http:HttpClient
    ) { };

    public traerUsuarios(): Observable<any>{
      return this.http.get(this.backend +'/usuarios');
    }
}
