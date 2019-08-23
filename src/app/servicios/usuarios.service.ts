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

  constructor(
    private http: HttpService
  ) { }

  private eliminarCacheProfesores() {
    this.profesores = null;
  }

  public traerUsuarios(): Observable<Usuario[]> {
    return this.http.get('/usuarios');
  }

  public crearUsuarios(usuario1): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    const usuario = {
      dni: usuario1.documento,
      nombre: usuario1.nombre,
      apellido: usuario1.apellido,
      telefono: usuario1.telefono,
      email: usuario1.email,
      fecha_nacimiento: usuario1.fecha_nacimiento,
      id_rol: usuario1.rol,
    };
    return this.http.post('/usuarios', { usuario });
  }

  public eliminarUsuario(id: number): Observable<Mensaje> {
    this.eliminarCacheProfesores();
    return this.http.delete('/usuarios/' + id);
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

}
