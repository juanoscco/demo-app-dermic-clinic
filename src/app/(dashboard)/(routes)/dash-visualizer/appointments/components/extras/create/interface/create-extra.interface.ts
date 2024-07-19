export interface ExtraAppointment {
    procedimiento: {
        id_procedimiento: number;
    };
    sala_tratamiento: {
        id_sala_tratamiento: number;
    };
    paciente: {
        id_paciente: number;
        nombres?: string;
    };
    empresa: {
        id_empresa: number;
    };
    usuario_registro: {
        id_usuario: number;
    };
    sede: {
        id_sede: number;
    };
    fecha_cita: string;
    empleado: {
        id_empleado: number;
    };
    estado: boolean;
}

export interface ResponseExtraAppointment {
    data: ExtraAppointment;
    message: string;
}