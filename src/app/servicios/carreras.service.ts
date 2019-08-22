import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Carrera } from '../modelos/carrera';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { CarreraAbierta } from '../modelos/carreraabierta';
import { InscriptosCarrera } from '../modelos/inscriptos-carrera';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(
    private http: HttpService
  ) { }

  public traerCarreras(): Observable<Carrera[]> {
    return this.http.get('/carreras');
  }
  public traerCarrerasAbiertas(): Observable<CarreraAbierta[]> {
    return this.http.get('/carreras_abiertas');
  }
  public listarCarrerasAbiertasHoy(): Observable<CarreraAbierta[]> {
    return this.http.get('/carreras_abiertas_hoy');
  }

  public traerCarrera(id: number): Observable<Carrera> {
    return this.http.get('/carrera/' + id);
  }
  public abrirInscripcionCarrera(carrerasAbiertas): Observable<Mensaje> {
    return this.http.post('/carreras_abiertas', { carreras_abiertas: carrerasAbiertas });
  }

  public eliminarCarreraAbierta(id: number): Observable<Mensaje> {
    return this.http.delete('/carreras_abiertas/' + id);
  }

  public crearCarrera(carrera1): Observable<Mensaje> {
    const carrera = {
      nombre: carrera1.nombre,
      duracion: carrera1.duracion,
      cantidad_materias: carrera1.materias,
    };
    return this.http.post('/carreras', { carrera });
  }

  public eliminarCarrera(id: number): Observable<Mensaje> {
    return this.http.delete('/carreras/' + id);
  }

  public listarInscriptosCarrera(idCarreraAbierta: number): Observable<InscriptosCarrera[]> {
    return this.http.get('/inscriptos_carrera/' + idCarreraAbierta);
  }

  public eliminarInscripcionCarrera(idInscripcionCarrera: number): Observable<any> {
    return this.http.delete('/inscripciones_carreras/' + idInscripcionCarrera);
  }

}
