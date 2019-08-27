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

  alumnos: Alumno[];

  constructor(
    private http: HttpService
  ) { }

  private eliminarCacheAlumnos() {
    this.alumnos = null;
  }

  public traerAlumnos(): Promise<Alumno[]> {
    return new Promise( (resolve, reject) => {
      if (this.alumnos) {
        resolve(this.alumnos);
      } else {
        this.http.get('/alumnos').subscribe(
          (res) => {
            this.alumnos = res;
            resolve(this.alumnos);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  public crearAlumno(usuario: Usuario, idCarreraAbierta: number): Observable<Mensaje> {
    this.eliminarCacheAlumnos();
    return this.http.post('/alumnos', {usuario, id_carrera_abierta: idCarreraAbierta});
  }

  public eliminarAlumno(id: number): Observable<Mensaje> {
    this.eliminarCacheAlumnos();
    return this.http.delete('/alumnos/' + id);
  }

  public avanceAcademico(): Observable<any> {
    return this.http.get('/avance_academico');
  }

}
