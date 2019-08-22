export interface Cursada {
    id: number;
    anio_cursada: number;
    anio_materia: string;
    cant_inscriptos: number;
    fecha_inicio: string;
    fecha_limite: string;
    materia: string;
    profesor: string;
    carrera: string;
    id_inscripcion_cursada?: number;
}
