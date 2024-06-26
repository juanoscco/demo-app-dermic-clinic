export interface ExtraAppointment {
    procedimiento: {
        id_procedimiento: number;
    };
    paciente: {
        id_paciente: number;
        nombres?: string;
    };
    sala_tratamiento: {
        id_sala_tratamiento: number;
    },
    empresa: {
        id_empresa: number;
    };
    usuario_registro: {
        id_usuario: number;
    };
    hora: {
        id_cabecera: number;
        id_cabecera_detalle: number;
        descripcion: string;
        valor: "";
    }
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