export interface InscriptoCursada {
  apellido: string;
  nombre: string;
  fecha_inscripcion: string;
  cursa: boolean;
  cohorte: number;
}

export interface PlanillaInscriptosCursada {
  carrera: string;
  materia: string;
  anio_cursada: number;
  anio_materia: number;
  inscriptos: InscriptoCursada[]
}
