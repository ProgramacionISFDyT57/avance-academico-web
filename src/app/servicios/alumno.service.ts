import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Alumno } from '../modelos/alumno';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { Usuario } from '../modelos/usuario';
import { Analitico } from '../modelos/analitico';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnos: Alumno[];

  constructor(
    private http: HttpService
  ) { }

  public eliminarCacheAlumnos() {
    this.alumnos = null;
  }

  public traerAlumnos(cache = true): Promise<Alumno[]> {
    return new Promise( (resolve, reject) => {
      if (cache && this.alumnos) {
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

  public avanceAcademico(id?: number): Observable<Analitico[]> {
    if (id) {
      return this.http.get('/avance_academico/' + id);
    } else {
      return this.http.get('/avance_academico');
    }
  }

}
