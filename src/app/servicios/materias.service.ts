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

  public traerMateria(id: number): Observable<Materia> {
    return this.http.get('/materia/' + id);
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

  public abrirInscripcionCursada(cursada): Observable<any> {
    return this.http.post('/cursadas', { cursada });
  }

  public listarFinales(): Observable<any> {
    return this.http.get('/lista_mesas');
  }

}
