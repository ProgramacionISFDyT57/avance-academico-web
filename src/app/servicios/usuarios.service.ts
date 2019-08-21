import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Usuario } from '../modelos/usuario';
import { Mensaje } from '../modelos/respuesta-mensaje';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpService
  ) { }

  public traerUsuarios(): Observable<Usuario[]> {
    return this.http.get('/usuarios');
  }

  public crearUsuarios(usuario1): Observable<Mensaje> {
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

  public traerProfesores(): Observable<any> {
    return this.http.get('/profesores');
  }

  public eliminarUsuario(id: number): Observable<any> {
    return this.http.delete('/usuarios/' + id);
  }

}
