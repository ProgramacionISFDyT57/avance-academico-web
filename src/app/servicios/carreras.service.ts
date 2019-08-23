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

  carreras: Carrera[];

  constructor(
    private http: HttpService
  ) { }

  public eliminarCacheCarreras() {
    this.carreras = null;
  }

  public traerCarreras(): Promise<Carrera[]> {
    return new Promise( (resolve, reject) => {
      if (this.carreras) {
        resolve(this.carreras);
      } else {
        this.http.get('/carreras').subscribe(
          (res) => {
            this.carreras = res;
            resolve(this.carreras);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  public traerCarrera(id: number): Observable<Carrera> {
    return this.http.get('/carrera/' + id);
  }

  public crearCarrera(carrera1): Observable<Mensaje> {
    this.eliminarCacheCarreras();
    const carrera = {
      nombre: carrera1.nombre,
      duracion: carrera1.duracion,
      cantidad_materias: carrera1.materias,
    };
    return this.http.post('/carreras', { carrera });
  }

  public eliminarCarrera(id: number): Observable<Mensaje> {
    this.eliminarCacheCarreras();
    return this.http.delete('/carreras/' + id);
  }

  // Carreras abiertas
  public traerCarrerasAbiertas(): Observable<CarreraAbierta[]> {
    return this.http.get('/carreras_abiertas');
  }
  public listarCarrerasAbiertasHoy(): Observable<CarreraAbierta[]> {
    return this.http.get('/carreras_abiertas_hoy');
  }
  public abrirInscripcionCarrera(carrerasAbiertas): Observable<Mensaje> {
    return this.http.post('/carreras_abiertas', { carreras_abiertas: carrerasAbiertas });
  }
  public eliminarCarreraAbierta(id: number): Observable<Mensaje> {
    return this.http.delete('/carreras_abiertas/' + id);
  }

  // Inscripciones carreras
  public listarInscriptosCarrera(idCarreraAbierta: number): Observable<InscriptosCarrera[]> {
    return this.http.get('/inscriptos_carrera/' + idCarreraAbierta);
  }

  public eliminarInscripcionCarrera(idInscripcionCarrera: number): Observable<Mensaje> {
    return this.http.delete('/inscripciones_carreras/' + idInscripcionCarrera);
  }
}
