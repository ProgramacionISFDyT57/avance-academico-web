export interface InscriptoFinal {
  apellido: string;
  nombre: string;
  dni: string;
  fecha_inscripcion: string;
  id_inscripcion_mesa: number;
  nota: number;
  libro: number;
  folio: number;
}

export interface InscriptosFinal {
  id_mesa: string;
  id_carrera: string;
  fecha_examen: string;
  materia: string;
  carrera: string;
  inscriptos: InscriptoFinal[];
}
