interface Sede {
    id_sede: number;
}

interface UsuarioRegistro {
    id_usuario: number;
}

interface Empresa {
    id_empresa: number;
}

export interface InfraRoom {
    sede: Sede;
    usuario_registro: UsuarioRegistro;
    empresa: Empresa;
    nombres: string;
    piso: number | string;
    estado: boolean;
}

export interface ReponseInfraRoom {
    data: InfraRoom;
    message: string;
}