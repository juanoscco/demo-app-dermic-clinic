interface UsuarioRegistro {
    id_usuario: number;
    estado_eliminado:boolean
}

interface Empleado {
    id_empleado: number;
}

interface Hora {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface Empresa {
    id_empresa: number;
}

export interface Exception {
    id_excepcion?: number;
    usuario_registro: UsuarioRegistro;
    empleado: Empleado;
    fecha_ausente_desde: string;
    fecha_ausente_hasta: string;
    hora_inicio: Hora;
    hora_final: Hora;
    empresa: Empresa;
    motivo: string;
    estado: boolean;
    estado_eliminado:boolean

}

export interface ResponseException {
    data: Exception;
    message: string;
}