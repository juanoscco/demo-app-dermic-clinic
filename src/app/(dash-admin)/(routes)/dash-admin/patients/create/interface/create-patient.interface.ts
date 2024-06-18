interface Empresa {
    id_empresa: number;
}

interface UsuarioRegistro {
    id_usuario: number;
}

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
    id_paciente?: number;
    nombres: string;
    empresa: Empresa;
    usuario_registro: UsuarioRegistro;
    tipo_documento_identidad: TipoDocumentoIdentidad;
    numero_documento_identidad: string;
    telefono: string;
    nacimiento: string;
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