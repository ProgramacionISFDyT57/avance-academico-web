import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Carrera } from '../modelos/carrera';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { CarreraAbierta } from '../modelos/carreraabierta';
import { InscriptosCarrera } from '../modelos/inscriptos-carrera';
import { AlumnosService } from './alumno.service';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  carreras: Carrera[];
  carrerasAbiertas: CarreraAbierta[];
  carrerasAbiertasHoy: CarreraAbierta[];

  constructor(
    private http: HttpService,
    private alumnosService: AlumnosService
  ) { }
  // Cache
  public eliminarCacheCarreras() {
    this.carreras = null;
  }
  public eliminarCacheCarrerasAbiertas() {
    this.carrerasAbiertas = null;
  }
  public eliminarCacheCarrerasAbiertasHoy() {
    this.carrerasAbiertasHoy = null;
  }

  // Carreras
  public traerCarreras(cache = true): Promise<Carrera[]> {
    return new Promise( (resolve, reject) => {
      if (cache && this.carreras) {
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
  public crearCarrera(carrera: Carrera): Observable<Mensaje> {
    this.eliminarCacheCarreras();
    return this.http.post('/carreras', { carrera });
  }
  public modificarCarrera(carrera: Carrera, idCarrera: number): Observable<Mensaje> {
    this.eliminarCacheCarreras();
    return this.http.put('/carreras/' + idCarrera, { carrera });
  }
  public eliminarCarrera(id: number): Observable<Mensaje> {
    this.eliminarCacheCarreras();
    return this.http.delete('/carreras/' + id);
  }

  // Carreras abiertas
  public listarCarrerasAbiertas(cache = true): Promise<CarreraAbierta[]> {
    return new Promise( (resolve, reject) => {
      if (cache && this.carrerasAbiertas) {
        resolve(this.carrerasAbiertas);
      } else {
        this.http.get('/carreras_abiertas').subscribe(
          (res) => {
            this.carrerasAbiertas = res;
            resolve(this.carrerasAbiertas);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
  public listarCarrerasAbiertasHoy(): Promise<CarreraAbierta[]> {
    return new Promise( (resolve, reject) => {
      if (this.carrerasAbiertasHoy) {
        resolve(this.carrerasAbiertasHoy);
      } else {
        this.http.get('/carreras_abiertas_hoy').subscribe(
          (res) => {
            this.carrerasAbiertasHoy = res;
            resolve(this.carrerasAbiertasHoy);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
  public abrirInscripcionCarrera(carrerasAbiertas): Observable<Mensaje> {
    this.eliminarCacheCarrerasAbiertas();
    this.eliminarCacheCarrerasAbiertasHoy();
    return this.http.post('/carreras_abiertas', { carreras_abiertas: carrerasAbiertas });
  }
  public eliminarCarreraAbierta(id: number): Observable<Mensaje> {
    this.eliminarCacheCarrerasAbiertas();
    this.eliminarCacheCarrerasAbiertasHoy();
    return this.http.delete('/carreras_abiertas/' + id);
  }

  // Inscripciones carreras
  public inscribirAlumnoACarrera(idCarreraAbierta: number, idAlumno): Observable<Mensaje> {
    this.eliminarCacheCarrerasAbiertas();
    this.alumnosService.eliminarCacheAlumnos();
    return this.http.post('/inscripciones_carreras', {id_carrera_abierta: idCarreraAbierta, id_alumno: idAlumno});
  }
  public listarInscriptosCarrera(idCarreraAbierta: number): Observable<InscriptosCarrera[]> {
    return this.http.get('/inscriptos_carrera/' + idCarreraAbierta);
  }
  public eliminarInscripcionCarrera(idInscripcionCarrera: number): Observable<Mensaje> {
    this.eliminarCacheCarrerasAbiertas();
    this.alumnosService.eliminarCacheAlumnos();
    return this.http.delete('/inscripciones_carreras/' + idInscripcionCarrera);
  }
  public asignarLibroFolio(idInscripcionCarrera: number, libro: number, folio: number): Observable<Mensaje> {
    return this.http.put('/inscripciones_carreras/' + idInscripcionCarrera, {libro, folio});
  }
}
