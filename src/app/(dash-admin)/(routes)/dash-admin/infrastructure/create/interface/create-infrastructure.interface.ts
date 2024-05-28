interface Company {
    id_empresa: number;
    nro_documento: string;
    nombres: string;
    direccion: string;
    estado: boolean;
}

export interface Headquarters {
    nombres: string;
    direccion: string;
    telefono: string;
    empresa: Company;
    estado: boolean;
}

export interface ResponseHeadquartes{
    data: Headquarters;
    message: string;
}