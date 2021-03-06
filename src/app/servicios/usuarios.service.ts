import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Usuario } from '../modelos/usuario';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { Profesor } from '../modelos/profesor';
import { PlanillaProfesores } from '../modelos/planilla-profesores';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  profesores: Profesor[];
  usuarios: Usuario[];

  constructor(
    private http: HttpService
  ) { }

  private eliminarCacheProfesores() {
    this.profesores = null;
  }

  public eliminarCacheUsuarios() {
    this.usuarios = null;
  }

  public crearUsuario(usuario: Usuario): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    this.eliminarCacheUsuarios();
    return this.http.post('/usuarios', { usuario });
  }

  public editarUsuario(usuario: Usuario): Observable<Mensaje> {
    this.eliminarCacheUsuarios();
    return this.http.put('/usuarios/' + usuario.id, {usuario});
  }

  public eliminarUsuario(id: number): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    this.eliminarCacheUsuarios();
    return this.http.delete('/usuarios/' + id);
  }

  public traerUsuarios(cache = true): Promise<Usuario[]> {
    return new Promise( (resolve, reject) => {
      if (cache && this.usuarios) {
        resolve(this.usuarios);
      } else {
        this.http.get('/usuarios').subscribe(
          (res) => {
            this.usuarios = res;
            resolve(this.usuarios);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  public traerProfesores(): Promise<Profesor[]> {
    return new Promise( (resolve, reject) => {
      if (this.profesores) {
        resolve(this.profesores);
      } else {
        this.http.get('/profesores').subscribe(
          (res) => {
            this.profesores = res;
            resolve(this.profesores);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  public cambiarContraseña(claveVieja: string, claveNueva: string): Observable<Mensaje> {
    return this.http.put('/cambio_password', {claveVieja, claveNueva});
  }

  public resetContraseña(idUsuario: number): Observable<Mensaje> {
    return this.http.put('/reset_password/' + idUsuario, {});
  }

  public deshabilitar(idUsuario: number): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    this.eliminarCacheUsuarios();
    return this.http.put('/usuarios/desactivar/' + idUsuario, {});
  }

  public habilitar(idUsuario: number): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    this.eliminarCacheUsuarios();
    return this.http.put('/usuarios/activar/' + idUsuario, {});
  }

  public listarProfesoresPorDia(anio: number, dia: number): Observable<PlanillaProfesores[]> {
    if (dia === 7) {
      return this.http.get('/profesores/' + anio);
    } else {
      return this.http.get('/profesores/' + anio + '/' + dia);
    }
  }

}
