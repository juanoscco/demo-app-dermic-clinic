interface UsuarioRegistro {
    id_usuario: number;
}

interface Empleado {
    id_empleado: number;
}

interface Empresa {
    id_empresa: number;
}

export interface AgendaOpening {
    id_agenda?:number;
    usuario_registro: UsuarioRegistro;
    empleado: Empleado;
    empresa: Empresa;
    fecha_apertura: string;
    hora_inicio: string;
    hora_final: string;
    estado: boolean;
    estado_eliminado:boolean
}


export interface ResponseAgendaOpening {
    data: AgendaOpening;
    message: string;
}