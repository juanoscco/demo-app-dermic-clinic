interface TipoDocumentoIdentidad {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface EstadoCivil {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface EstadoAntiguedad {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

export interface Patient {
    nombres: string;
    tipo_documento_identidad: TipoDocumentoIdentidad;
    numero_documento_identidad: string;
    telefono: string;
    nacimiento: string; // Puede ser string o Date, dependiendo de cómo lo manejes
    estado_civil: EstadoCivil;
    ocupacion: string;
    email: string;
    direccion: string;
    distrito: string;
    lugar_nacimiento: string;
    estado_antiguedad: EstadoAntiguedad;
    estado: boolean;
}


export interface PatientResponse {
    data: Patient;
    message: string;
}