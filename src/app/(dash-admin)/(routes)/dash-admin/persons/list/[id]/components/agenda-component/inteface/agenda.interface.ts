interface Role {
    id_rol: number;
    descripcion: string;
    valor: string;
    estado: boolean;
}

interface User {
    id_usuario: number;
    username: string;
    password?: string;
    rol: Role;
    estado: boolean;
}

interface DocumentType {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface Company {
    id_empresa: number;
    nro_documento: string;
    nombres: string;
    direccion: string;
    estado: boolean;
}

interface Location {
    id_sede: number;
    codigo: string;
    nombres: string;
    direccion: string;
    telefono: string;
    empresa: Company;
    estado: boolean;
}

interface Title {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface DayWithoutBreak {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

interface Employee {
    id_empleado: number;
    tipo_documento: DocumentType;
    numero: string;
    nombres: string;
    telefono: string;
    correo: string;
    sede: Location;
    titulo: Title;
    dia_sin_refriguerio: DayWithoutBreak;
    empresa: Company;
    usuario: User;
    estado: boolean;
}

export interface AgendaOpening {
    id_agenda?: number;
    usuario: User;
    empleado: Employee;
    fecha_apertura: string;
    hora_inicio: string;
    hora_final: string;
    estado: boolean;
}

export interface ResponseAgendaOpening {
    data: AgendaOpening;
    message: string;
}