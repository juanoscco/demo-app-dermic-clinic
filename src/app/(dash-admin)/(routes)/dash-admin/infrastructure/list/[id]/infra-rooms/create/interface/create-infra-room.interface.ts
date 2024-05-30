interface Empresa {
    id_empresa: number;
    nro_documento: string;
    nombres: string;
    direccion: string;
    estado: boolean;
}

interface Sede {
    id_sede: number;
    nombres: string;
    direccion: string;
    telefono: string;
    empresa: Empresa;
    estado: boolean;
}

export interface InfraRoom {
    sede: Sede;
    nombres: string;
    piso: number;
    estado: boolean;
}


export interface ReponseInfraRoom {
    data: InfraRoom;
    message: string;
}