interface Duracion {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface TipoProcedimiento {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface SubtipoProcedimiento {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

export interface Procedure {
    nombres: string;
    duracion: Duracion;
    anestesia: boolean;
    tipo_procedimiento: TipoProcedimiento;
    subtipo_procedimiento: SubtipoProcedimiento;
    estado: boolean;
}

export interface ProcedureResponse {
    data: Procedure,
    message: string,
}