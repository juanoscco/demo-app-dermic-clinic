interface Company {
    id_empresa: number;
}

export interface Headquarters {
    id_sede?: number;
    nombres: string;
    codigo?: string;
    direccion: string;
    telefono: string;
    empresa: Company;
    estado: boolean;
    estado_eliminado: Boolean

}

export interface Props {
    onClose: any;
    id?: number;
    data?: any;
    update?: any
}
