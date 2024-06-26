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



export default function DetailsAppointment({ params }: Props) {

    const { data, isLoading, error, refetch } = useGetAppointmentByIdQuery(params.id);
    
    const dataDetailAppointment = data?.data;


    // TODO: PARA LA NUEVA VERSION PASAR A STEPS
    

    const tabs: Tab[] = [
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
        },
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
