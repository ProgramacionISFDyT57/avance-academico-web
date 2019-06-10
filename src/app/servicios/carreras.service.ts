import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private backend = 'https://avance-academico-backend.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  public traerCarreras(): Observable<any> {
    return this.http.get(this.backend + '/carreras');
  }

  public crearCarrera(carrera1): Observable<any> {
    const carrera = {
      nombre: carrera1.nombre,
      duracion: carrera1.duracion,
      cantidad_materias: carrera1.materias,
    }
    return this.http.post(this.backend + "/carreras", { carrera })
  }

}
