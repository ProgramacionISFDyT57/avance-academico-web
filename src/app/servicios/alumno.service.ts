import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Alumno } from '../modelos/alumno';
import { Mensaje } from '../modelos/respuesta-mensaje';

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

}
