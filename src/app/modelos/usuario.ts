export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  fecha_alta?: string;
  fecha_nacimiento?: string;
  id_rol?: number;
  telefono?: string;
  domicilio?: string;
}
