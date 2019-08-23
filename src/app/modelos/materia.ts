export interface Materia {
  id?: number;
  id_carrera?: number;
  id_tipo?: string;
  nombre: string;
  carrera?: string;
  anio: number;
  tipo_materia?: string;
  correlativas: string[];
}
