import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Materia } from '../modelos/materia';
import { Mensaje } from '../modelos/respuesta-mensaje';
import { Cursada } from '../modelos/cursadas';
import { InscriptosCursada } from '../modelos/inscriptos-cursada';
import { InscriptosFinal } from '../modelos/inscriptos-final';
import { AvanceAcademico } from '../modelos/avance-academico';
import { Final } from '../modelos/final';
import { FinalAbierto } from '../modelos/final-abierto';
import { CarrerasService } from './carreras.service';
import { ActaVolante } from '../modelos/acta-volante';
import { PlanillaInscriptosCursada } from '../modelos/planilla-inscriptos-cursada';
import { Horario } from '../modelos/horario';
import { TiposMateria } from '../modelos/tipos-materia';

@Injectable({
  providedIn: 'root'
})

export class MateriasService {

materias: Materia[];
tiposMaterias: TiposMateria[];
  constructor(
    private http: HttpService,
    private carrerasService: CarrerasService
  ) { }

  // Tipos Materias
  private eliminarCacheTiposMaterias() {
    this.tiposMaterias = null;
  }
  public listarTiposMaterias(cache = true): Promise<TiposMateria[]> {
    return new Promise( (resolve, reject) => {
      if (cache && this.tiposMaterias) {
        resolve(this.tiposMaterias);
      } else {
        this.http.get('/tipos_materia').subscribe(
          (res) => {
            this.tiposMaterias = res;
            resolve(this.tiposMaterias);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
  public crearTipoMateria(tipoMateria: TiposMateria): Observable<Mensaje> {
    this.eliminarCacheTiposMaterias();
    return this.http.post('/tipos_materia', { tipo_materia: tipoMateria });
  }
  public editarTipoMateria(tipoMateria: TiposMateria): Observable<Mensaje> {
    this.eliminarCacheTiposMaterias();
    return this.http.put('/tipos_materia/' + tipoMateria.id, { tipo_materia: tipoMateria });
  }
  public eliminarTipoMateria(idTipoMateria: number): Observable<Mensaje> {
    this.eliminarCacheTiposMaterias();
    return this.http.delete('/tipos_materia/' + idTipoMateria);
  }
  // Materias
  private eliminarCacheMaterias() {
    this.materias = null;
  }
  public traerMaterias(cache = true): Promise<Materia[]> {
    return new Promise( (resolve, reject) => {
      if (cache && this.materias) {
        resolve(this.materias);
      } else {
        this.http.get('/materias').subscribe(
          (res) => {
            this.materias = res;
            resolve(this.materias);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
  public traerMateria(id: number): Observable<Materia> {
    return this.http.get('/materia/' + id);
  }
  public materias_por_carrera(idCarrera: number): Observable<Materia[]> {
    return this.http.get('/materias_por_carrera/' + idCarrera);
  }
  public crearMateria(materia: Materia): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    this.carrerasService.eliminarCacheCarreras();
    return this.http.post('/materias', { materia });
  }
  public editarMateria(materia: Materia): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    return this.http.put('/materias/' + materia.id, { materia });
  }
  public eliminarMateria(idMateria: number): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    this.carrerasService.eliminarCacheCarreras();
    return this.http.delete('/materias/' + idMateria);
  }

  // Finales
  public abrirInscripcionFinal(mesa): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    return this.http.post('/crear_mesa', { mesa });
  }
  public editarMesa(mesa): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    return this.http.put('/mesas/' + mesa.id_mesa, { mesa });
  }
  public eliminarMesaFinal(id: number): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    return this.http.delete('/mesas/' + id);
  }
  public inscripcionFinal(idMesa: number): Observable<Mensaje> {
    return this.http.post('/inscripciones_mesas', { id_mesa: idMesa });
  }
  public inscribirAlumnoFinal(idAlumno: number, idMesa: number): Observable<Mensaje> {
    return this.http.post('/inscribir_alumno_final', { id_alumno: idAlumno, id_mesa: idMesa });
  }
  public eliminarInscripcionFinal(idInscripcionMesa: number): Observable<Mensaje> {
    return this.http.delete('/inscripciones_mesas/' + idInscripcionMesa);
  }
  public eliminarInscripcionFinalAlumno(idInscripcionMesa: number): Observable<Mensaje> {
    return this.http.delete('/inscripcion_mesa_alumno/' + idInscripcionMesa);
  }
  public listarFinales(): Observable<FinalAbierto[]> {
    return this.http.get('/lista_mesas');
  }
  public listarInscriptosMesa(idMesa: number): Observable<InscriptosFinal> {
    return this.http.get('/inscriptos_mesa2/' + idMesa);
  }
  public cargarNotasFinal(final: Final): Observable<Mensaje> {
    return this.http.post('/notas_final', { final });
  }
  public eliminarNotasFinal(idInscripcionMesa: number): Observable<Mensaje> {
    return this.http.delete('/notas_final/' + idInscripcionMesa);
  }
  public actaVolante(idFinal: number, libres: boolean): Observable<ActaVolante> {
    if (libres) {
      return this.http.get('/acta_volante/' + idFinal + '/libres');
    } else {
      return this.http.get('/acta_volante/' + idFinal);
    }
  }

  // Cursadas
  public listarCursadas(): Observable<Cursada[]> {
    return this.http.get('/cursadas_abiertas');
  }
  public abrirInscripcionCursada(cursada, horarios: Horario[]): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    return this.http.post('/cursadas', { cursada, horarios });
  }
  public editarCursada(cursada, horarios: Horario[]): Observable<Mensaje> {
    return this.http.put('/cursadas/' + cursada.id_cursada, { cursada, horarios });
  }
  public eliminarCursada(id: number): Observable<Mensaje> {
    this.eliminarCacheMaterias();
    return this.http.delete('/cursadas/' + id);
  }
  public listarInscriptosCursada(idCursada: number): Observable<InscriptosCursada> {
    return this.http.get('/inscriptos_cursada2/' + idCursada);
  }
  public planillaInscriptosCursadas(idCursada: number): Observable<PlanillaInscriptosCursada> {
    return this.http.get('/planilla_inscriptos_cursada/' + idCursada);
  }
  public cargarNotasCursada(avanceAcademico: AvanceAcademico): Observable<Mensaje> {
    return this.http.post('/notas_cursada', { avance_academico: avanceAcademico });
  }
  public eliminarNotasCursada(id: number): Observable<Mensaje> {
    return this.http.delete('/notas_cursada/' + id);
  }
  public inscribirAlumnoCursada(idAlumno: number, idCursada: number, cursa: boolean, equivalencia: boolean): Observable<Mensaje> {
    return this.http.post('/inscribir_alumno_cursada/', { id_alumno: idAlumno, id_cursada: idCursada, cursa, equivalencia});
  }
  public realizarInscripcionCursada(idCursada: number, cursa: boolean, equivalencia: boolean): Observable<Mensaje> {
    return this.http.post('/inscripcion_cursada/', { id_cursada: idCursada, cursa, equivalencia});
  }
  public eliminarInscripcionCursada(idInscripcionCursada: number): Observable<Mensaje> {
    return this.http.delete('/inscripcion_cursada/' + idInscripcionCursada);
  }
  public eliminarInscripcionCursadaAlumno(idInscripcionCursada: number): Observable<Mensaje> {
    return this.http.delete('/inscripcion_cursada_alumno/' + idInscripcionCursada);
  }

}
