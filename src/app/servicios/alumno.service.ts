import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Alumno } from '../modelos/alumno';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http: HttpService
  ) { }

  public traerAlumnos(): Observable<Alumno[]> {
    return this.http.get('/alumnos');
  }

  public crearAlumno(usuario: Usuario, idCarreraAbierta: number): Observable<Mensaje> {
    return this.http.post('/alumnos', {usuario, id_carrera_abierta: idCarreraAbierta});
  }

  public eliminarAlumno(id: number): Observable<Mensaje> {
    return this.http.delete('/alumnos/' + id);
  }

}
