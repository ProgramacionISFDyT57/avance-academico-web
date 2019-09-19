export interface InscriptoCursada {
  apellido: string;
  nombre: string;
  dni: string;
  fecha_inscripcion: string;
  nota_cuat_1: number;
  nota_cuat_2: number;
  nota_recuperatorio: number;
  asistencia: number;
  id_inscripcion_cursada: number;
  cursa: boolean;
  equivalencia: boolean;
}

export interface InscriptosCursada {
  materia: string;
  anio_cursada: number;
  carrera: string;
  id_carrera: number;
  inscriptos: InscriptoCursada[];
}
