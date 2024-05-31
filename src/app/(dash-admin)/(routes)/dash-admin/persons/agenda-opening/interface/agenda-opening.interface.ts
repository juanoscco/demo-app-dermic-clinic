interface Rol {
    id_rol: number;
    descripcion: string;
    valor: string;
    estado: boolean;
}

interface Usuario {
    id_usuario: number;
    username: string;
    password?: string; // Opcional, ya que no siempre está presente
    rol: Rol;
    estado: boolean;
}

interface TipoDocumento {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
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

interface Titulo {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface DiaSinRefrigerio {
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
    dia_sin_refriguerio: DiaSinRefrigerio;
    empresa: Empresa;
    usuario: Usuario;
    estado: boolean;
}

export interface Agenda {
    id_agenda?: number;
    usuario: Usuario;
    empleado: Empleado;
    fecha_apertura: string;
    hora_inicio: string;
    hora_final: string;
    estado: boolean;
}

export interface ResponseAgenda{
    data: Agenda;
    message: string;
}