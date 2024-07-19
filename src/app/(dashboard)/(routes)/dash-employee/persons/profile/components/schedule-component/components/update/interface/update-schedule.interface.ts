interface UsuarioRegistro {
    id_usuario: number | any;
}

interface Empleado {
    id_empleado?: number | any;
}

interface Empresa {
    id_empresa: number;
}

interface CabeceraDetalle {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface HorarioTrabajoDetalle {
    semana: CabeceraDetalle;
    temprano_inicio: CabeceraDetalle;
    temprano_final: CabeceraDetalle;
    tarde_inicio: CabeceraDetalle;
    tarde_final: CabeceraDetalle;
    estado: boolean;
    estado_eliminado?: boolean

}

export interface Schedule {
    id_horario_trabajo?: number;
    nombre_horario: string;
    usuario_registro: UsuarioRegistro | any;
    empleado?: Empleado;
    empresa?: Empresa;
    horario_trabajo_detalle: HorarioTrabajoDetalle[];
    estado: boolean;
    estado_eliminado?:boolean
}

export interface ResponseSchedule {
    data: Schedule;
    message: string;
}