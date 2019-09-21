export interface Horario {
    id_cursada?: number;
    dia: number;
    hora_inicio: string;
    modulos: number;
}

export interface Cursada {
    id: number;
    anio_cursada: number;
    anio_materia: string;
    cant_inscriptos?: number;
    fecha_inicio: string;
    fecha_limite: string;
    materia: string;
    profesor: string;
    carrera: string;
    id_inscripcion_cursada?: number;
    nota_cuat_1?: number;
    nota_cuat_2?: number;
    nota_recuperatorio?: number;
    asistencia: number;
    aprobada?: boolean;
    horarios: Horario[];
    id_profesor?: number;
}
