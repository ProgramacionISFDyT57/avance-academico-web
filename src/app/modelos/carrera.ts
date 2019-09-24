export interface Carrera {
  id?: number;
  nombre: string;
  nombre_corto: string;
  resolucion?: string;
  duracion: number;
  cantidad_materias: number;
  materias_cargadas?: string;
}
