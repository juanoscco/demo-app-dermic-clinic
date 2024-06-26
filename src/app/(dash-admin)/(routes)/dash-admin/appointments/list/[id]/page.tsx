"use client"
import React, { useState } from 'react'
import { useGetAppointmentByIdQuery } from '../../components/citas/find-by-id/store/service'
import { TabPanel } from '@/components/TabPanel/TabPanel.component'
import { Tab } from "@/components/TabPanel/interface/TabPanel.model"

import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { useUpdateAppointmentMutation } from '../../components/citas/update/store/service'
import PatientComponent from './components/patient/patient.component'
import DoctorComponent from './components/doctor/doctor.component'
import DetailComponent from './components/detail/detail.component'
import CalendarComponent from './components/calendar/calendar.component'
import { useRouter } from 'next/navigation'

interface Props {
    params: {
        id: number
    }
}

interface DataDetailAppointment {
    id_cita?: number;
    procedimiento: {
        id_procedimiento: number | null;
    };
    sala_tratamiento: {
        id_sala_tratamiento: number;
    };
    empresa: {
        id_empresa: number;
    };
    usuario_registro: {
        id_usuario: number;
    };
    paciente: {
        id_paciente: number;
        nombres?: string;
    };
    sede: {
        id_sede: number;
    };
    fecha_cita: string;
    empleado: {
        id_empleado: number | null;
    };
    hora: {
        id_cabecera: number;
        id_cabecera_detalle: number;
        descripcion: string;
        valor: string;
    };
    estado: boolean;
}

interface Patient {
    id_paciente: number;
    nombres: string;
    email: string;
    direccion: string;
    estado_antiguedad: { descripcion: string };
    estado_civil: { descripcion: string };
    lugar_nacimiento: string;
    numero_documento_identidad: string;
    telefono: string
}


export default function DetailsAppointment({ params }: Props) {

    const { data, isLoading, error, refetch } = useGetAppointmentByIdQuery(params.id);
    const [updateAppointment, { data: appointmentUpdate, isLoading: appointmentLoad }] = useUpdateAppointmentMutation();

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);


    const dataDetailAppointment = data?.data;

    const initialValues: DataDetailAppointment = {
        id_cita: dataDetailAppointment?.id_cita,
        procedimiento: {
            id_procedimiento: dataDetailAppointment?.procedimiento.id_procedimiento
        },
        sala_tratamiento: {
            id_sala_tratamiento: dataDetailAppointment?.sala_tratamiento.id_sala_tratamiento
        },
        empresa: {
            id_empresa: dataDetailAppointment?.empresa.id_empresa || 1
        },
        usuario_registro: {
            id_usuario: dataDetailAppointment?.usuario_registro_id_usuario || 1
        },
        paciente: {
            id_paciente: dataDetailAppointment?.paciente.id_paciente,
            // nombres: dataDetailAppointment?.paciente.nombres
        },
        sede: {
            id_sede: dataDetailAppointment?.sede.id_sede
        },
        fecha_cita: dataDetailAppointment?.fecha_cita,
        empleado: {
            id_empleado: dataDetailAppointment?.empleado.id_empleado
        },
        hora: {
            id_cabecera: 10,
            id_cabecera_detalle: dataDetailAppointment?.hora.id_cabecera_detalle,
            descripcion: dataDetailAppointment?.hora.descripcion,
            valor: dataDetailAppointment?.hora.valor
        },
        estado: dataDetailAppointment?.estado

    };

    const [formValues, setFormValues] = useState<DataDetailAppointment>(initialValues);

    // TODO: PARA LA NUEVA VERSION PASAR A STEPS
    

    const tabs: Tab[] = [
        // solo info
        {
            id: 1,
            title: 'Doctor',
            content: <DoctorComponent dataAppointment={dataDetailAppointment} />
        },
        {
            id: 2,
            title: 'Paciente',
            content: <PatientComponent
                dataDetailAppointmentById={dataDetailAppointment}
                
            />,
            // puedes tambien actualizar el paciente
        },
        // actualizar! aqui hacer el formulario
        {
            id: 3,
            title: 'Detalles',
            content: <DetailComponent dataAppointment={dataDetailAppointment} />
            // hora, fecha, lugar, cuarto, hora entrada y salida
        },
        {
            id: 4,
            title: 'Calendario',
            content: <CalendarComponent
                dataDetailAppointmentById={dataDetailAppointment}
                refetch={refetch}
            />,
        }
      
    ];


    return (
        <div>
            <h1 className='text-2xl'>Area del detalle de la cita</h1>
            <TabPanel
                tabs={tabs}
            />
        </div>
    )
}
