interface Company {
    id_empresa: number;
    nro_documento: string;
    nombres: string;
    direccion: string;
    estado: boolean;
}

export interface Headquarters {
    id_sede?: number;
    nombres: string;
    direccion: string;
    telefono: string;
    empresa: Company;
    estado: boolean;
}

export interface Props {
    onClose: any;
    id?: number;
    data?: any;
    update?: any
}
