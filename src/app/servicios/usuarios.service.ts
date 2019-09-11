import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Usuario } from '../modelos/usuario';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { Profesor } from '../modelos/profesor';

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

  private eliminarCacheUsuarios() {
    this.usuarios = null;
  }

  public crearUsuario(usuario: Usuario): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    this.eliminarCacheUsuarios();
    return this.http.post('/usuarios', { usuario });
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

  public deshabilitar(idUsuario: number): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    this.eliminarCacheUsuarios();
    return this.http.put('/usuarios/deshabilitar/' + idUsuario, {});
  }

  public habilitar(idUsuario: number): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    this.eliminarCacheUsuarios();
    return this.http.put('/usuarios/habilitar/' + idUsuario, {});
  }

}
