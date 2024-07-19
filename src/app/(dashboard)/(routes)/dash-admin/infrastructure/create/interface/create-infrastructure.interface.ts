interface Company {
    id_empresa: number;
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