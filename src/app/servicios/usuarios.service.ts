import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  backend = 'https://avance-academico-backend.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  public traerUsuarios(): Observable<any> {
    return this.http.get(this.backend + '/usuarios');
  }

  public crearUsuarios(usuario1): Observable<any> {
    const usuario = {
      dni: usuario1.documento,
      nombre: usuario1.nombre,
      apellido: usuario1.apellido,
      telefono: usuario1.telefono,
      email: usuario1.email,
      fecha_nacimiento: usuario1.fecha_nacimiento,
      id_rol: usuario1.rol,
    };
    return this.http.post(this.backend + '/usuarios', { usuario });
  }
}
