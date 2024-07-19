interface Sede {
    id_sede: number;
    codigo: string;
    nombres: string;
    direccion: string;
    telefono: string;
    empresa: Empresa;
    estado: boolean;
}

interface Empresa {
    id_empresa: number;
    nro_documento: string;
    nombres: string;
    direccion: string;
    estado: boolean;
}

interface Rol {
    id_rol: number;
    descripcion: string;
    valor: string;
    estado: boolean;
}

interface Usuario {
    id_usuario?: number;
    username: string;
    password: string;
    rol: Rol;
    estado: boolean;
    estado_eliminado: boolean

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

interface TipoDocumento {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

export interface Employee {
    id_empleado?: number;

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
    estado_eliminado: boolean

}


export interface EmployeeReponse {
    data: Employee;
    message: string;
}