import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Alumno } from '../modelos/alumno';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { Usuario } from '../modelos/usuario';
import { Analitico } from '../modelos/analitico';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnos: Alumno[];

  constructor(
    private usuariosService: UsuariosService,
    private http: HttpService
  ) { }

  public resetContraseñaAlumno(idAlumno: number): Observable<Mensaje> {
    return this.http.put('/reset_password_alumno/' + idAlumno, {});
  }

  public eliminarCacheAlumnos() {
    this.alumnos = null;
  }

  public traerAlumnos(cache = true): Promise<Alumno[]> {
    return new Promise((resolve, reject) => {
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

  public listarAlumnosInscripcion(): Promise<Alumno[]> {
    return new Promise((resolve, reject) => {
      this.http.get('/alumnos_inscripcion').subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public listarAlumnosPorCarrera(idCarrera): Observable<Alumno[]> {
    return this.http.get('/alumnos_por_carrera/' + idCarrera);
  }

  public crearAlumno(usuario: Usuario, idCarreraAbierta: number): Observable<Mensaje> {
    this.usuariosService.eliminarCacheUsuarios();
    this.eliminarCacheAlumnos();
    return this.http.post('/alumnos', { usuario, id_carrera_abierta: idCarreraAbierta });
  }

  public editarAlumno(alumno: Alumno): Observable<Mensaje> {
    this.usuariosService.eliminarCacheUsuarios();
    this.eliminarCacheAlumnos();
    return this.http.put('/alumnos/' + alumno.id_alumno, { alumno });
  }

  public eliminarAlumno(id: number): Observable<Mensaje> {
    this.usuariosService.eliminarCacheUsuarios();
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
