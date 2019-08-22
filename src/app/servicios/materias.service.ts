import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Materia } from '../modelos/materia';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { Cursada } from '../modelos/cursadas';
import { InscriptosCursada } from '../modelos/inscriptos-cursada';
import { InscriptosFinal } from '../modelos/inscriptos-final';
import { AvanceAcademico } from '../modelos/avance-academico';

@Injectable({
  providedIn: 'root'
})

export class MateriasService {
  constructor(
    private http: HttpService
  ) { }

  public traerMaterias(): Observable<Materia[]> {
    return this.http.get('/materias');
  }

  public traerMateria(id: number): Observable<Materia> {
    return this.http.get('/materia/' + id);
  }

  public crearMateria(materia: any): Observable<Mensaje> {
    return this.http.post('/materias', { materia });
  }

  public materias_por_carrera(idCarrera: number): Observable<Materia[]> {
    return this.http.get('/materias_por_carrera/' + idCarrera);
  }

  public eliminarMateria(idMateria: number): Observable<Mensaje> {
    return this.http.delete('/materias/' + idMateria);
  }

  // Finales
  public abrirInscripcionFinal(mesa): Observable<any> {
    return this.http.post('/crear_mesa', { mesa });
  }
  public eliminarMesaFinal(id: number): Observable<Mensaje> {
    return this.http.delete('/mesas/' + id);
  }
  public inscripcionFinal(idMesa: number): Observable<any> {
    return this.http.post('/inscripciones_mesas', { id_mesa: idMesa });
  }
  public listarFinales(): Observable<any> {
    return this.http.get('/lista_mesas');
  }
  public listarInscriptosFinal(idFinal: number): Observable<InscriptosFinal[]> {
    return this.http.get('/inscriptos_mesa/' + idFinal);
  }

  // Cursadas
  public listarCursadas(): Observable<Cursada[]> {
    return this.http.get('/cursadas_abiertas');
  }
  public abrirInscripcionCursada(cursada): Observable<any> {
    return this.http.post('/cursadas', { cursada });
  }
  public eliminarCursada(id: number): Observable<Mensaje> {
    return this.http.delete('/cursadas/' + id);
  }
  public listarInscriptosCursadas(idCursada: number): Observable<InscriptosCursada[]> {
    return this.http.get('/inscriptos_cursada/' + idCursada);
  }
  public cargarNotasCursada(avanceAcademico: AvanceAcademico): Observable<any> {
    return this.http.post('/notas_cursada', { avance_academico: avanceAcademico });
  }
  public eliminarNotasCursada(id: number): Observable<any> {
    return this.http.delete('/notas_cursada/' + id);
  }


}
