export interface Alumno {
  id_alumno: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  fecha_alta?: string;
  fecha_nacimiento?: string;
  carrera?: string;
  cohorte?: string;
  telefono?: string;
  domicilio?: string;
}
