export interface Inscriptos {
  apellido: string;
  nombre: string;
  dni: string;
  cohorte: string;
}

export interface ActaVolante {
  carrera: string;
  materia: string;
  anio_materia: number;
  profesor: string;
  vocal1: string;
  vocal2: string;
  fecha_examen: string;
  inscriptos: Inscriptos[];
}
