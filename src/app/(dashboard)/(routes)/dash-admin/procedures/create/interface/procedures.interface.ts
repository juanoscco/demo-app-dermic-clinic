interface Empresa {
    id_empresa: number;
}

interface UsuarioRegistro {
    id_usuario: number;
}

interface Detalle {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface Procedimiento {
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
    id_procedimiento?: number;
    nombres: string;
    empresa: Empresa;
    usuario_registro: UsuarioRegistro;
    duracion: Detalle;
    anestesia: boolean;
    tipo_procedimiento: Procedimiento;
    subtipo_procedimiento: SubtipoProcedimiento;
    estado: boolean;
    estado_eliminado:boolean
}

export interface ResponseProcedure {
    data: Procedure;
    message: string;
}