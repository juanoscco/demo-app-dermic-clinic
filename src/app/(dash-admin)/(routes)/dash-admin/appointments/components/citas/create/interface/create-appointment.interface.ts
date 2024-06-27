interface Procedimiento {
    id_procedimiento: number;
}

interface Empresa {
    id_empresa: number;
}

interface UsuarioRegistro {
    id_usuario: number;
}

interface Paciente {
    id_paciente: number;
    nombres?: string;
}

interface Sede {
    id_sede: number;
}

interface Empleado {
    id_empleado: number;
    nombres?:string
}

interface Hora {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}
interface Room {
    id_sala_tratamiento: number;
}

export interface Appointment {
    procedimiento: Procedimiento;
    sala_tratamiento?: Room;
    empresa: Empresa;
    usuario_registro: UsuarioRegistro;
    paciente: Paciente;
    sede: Sede;
    fecha_cita: string;
    empleado: Empleado;
    hora: Hora;
    estado: boolean;
}

export interface ResponseAppointment {
    data: Appointment;
    message: string;
}