import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MateriasService
  {
    backend= 'https://avance-academico-backend.herokuapp.com'
    constructor(
      private http:HttpClient
    ) { };

    public traerMaterias(): Observable<any>{
      return this.http.get(this.backend +'/materias');
    }
}
