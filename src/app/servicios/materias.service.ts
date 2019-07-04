import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Materia } from '../modelos/materia';
import { Mensaje } from '../modelos/respuesta-mensaje';

@Injectable({
  providedIn: 'root'
})

export class MateriasService {
  constructor(
    private http: HttpService
  ) { }

  public traerMaterias(): Observable<Materia[]> {
    return this.http.get('/materias');
  }

  public crearMateria(materia: any): Observable<Mensaje> {
    return this.http.post('/materias', { materia });
  }

  public materias_por_carrera(idCarrera: number): Observable<Materia[]> {
    return this.http.get('/materias_por_carrera/' + idCarrera);
  }

  public eliminarMateria(idMateria: number): Observable<Mensaje> {
    return this.http.delete('/materias/' + idMateria);
  }

}
