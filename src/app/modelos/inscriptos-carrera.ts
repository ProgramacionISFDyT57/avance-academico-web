export interface InscriptosCarrera {
  apellido: string;
  nombre: string;
  dni: string;
  fecha_inscripcion: string;
  carrera: string;
  cohorte: number;
  libro?: number;
  folio?: number;
  id_inscripcion_carrera?: number;
  id_carrera_abierta?: number;
}
