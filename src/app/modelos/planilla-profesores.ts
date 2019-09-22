export interface DetalleHorario {
  carrera: string;
  materia: string;
  anio: number;
  dia: number;
  hora_inicio: string;
  modulos: number;
}

export interface PlanillaProfesores {
  id: number;
  apellido: string;
  nombre: string;
  dni: string;
  email: string;
  nombre_completo: string;
  detalle: DetalleHorario[];
}
