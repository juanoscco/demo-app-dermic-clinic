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
}

interface Sede {
    id_sede: number;
}

interface Empleado {
    id_empleado: number;
}

interface Hora {
    id_cabecera: number;
    id_cabecera_detalle: number;
    descripcion: string;
    valor: string;
}

export interface Appointment {
    procedimiento: Procedimiento;
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