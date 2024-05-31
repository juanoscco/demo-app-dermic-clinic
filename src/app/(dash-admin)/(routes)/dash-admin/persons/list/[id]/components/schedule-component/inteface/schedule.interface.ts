interface Usuario {
    id_usuario: number;
    username: string;
    rol: {
        id_rol: number;
        descripcion: string;
        valor: string;
        estado: boolean;
    };
    estado: boolean;
}

interface Empresa {
    id_empresa: number;
    nro_documento: string;
    nombres: string;
    direccion: string;
    estado: boolean;
}

interface Sede {
    id_sede: number;
    codigo: string;
    nombres: string;
    direccion: string;
    telefono: string;
    empresa: Empresa;
    estado: boolean;
}

interface TipoDocumento {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface Titulo {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface DiaSinRefriguerio {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface Empleado {
    id_empleado: number;
    tipo_documento: TipoDocumento;
    numero: string;
    nombres: string;
    telefono: string;
    correo: string;
    sede: Sede;
    titulo: Titulo;
    dia_sin_refriguerio: DiaSinRefriguerio;
    empresa: Empresa;
    usuario: Usuario;
    estado: boolean;
}

interface Semana {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface HorarioDetalle {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface HorarioTrabajoDetalle {
    semana: Semana;
    temprano_inicio: HorarioDetalle;
    temprano_final: HorarioDetalle;
    tarde_inicio: HorarioDetalle;
    tarde_final: HorarioDetalle;
    estado: boolean;
}

export interface Schedule {
    id_horario_trabajo?: number;
    nombre_horario: string;
    usuario: Usuario;
    empleado: Empleado;
    horario_trabajo_detalle: HorarioTrabajoDetalle[];
    estado: boolean;
}

export interface ResponseSchedule {
    data: Schedule;
    message: string;
}