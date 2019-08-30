export interface Analitico {
    apellido: string;
    nombre: string;
    dni: string;
    telefono: string;
    fecha_nacimiento?: string;
    domicilio?: string;
    tomo?: string;
    folio?: string;
    carrera: string;
    cohorte: number;
    materias: {
        materia: string;
        anio: number;
        nota_cuat_1: number;
        nota_cuat_2: number;
        nota_recuperatorio: number;
        asistencia: number;
        final: number;
        libro: number;
        folio: number;
    }[];
}
