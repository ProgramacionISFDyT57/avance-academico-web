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

    public crearMateria(materia: any): Observable<any>{
      return this.http.post(this.backend +'/materias', {materia});
    }
    public materias_por_carrera(id_carrera: number): Observable<any>{
      return this.http.get(this.backend +'/materias_por_carrera/' + id_carrera);
    }
    public eliminarMateria(id_materia: number): Observable<any>{
      return this.http.delete(this.backend +'/materias/' + id_materia);
    }



}
