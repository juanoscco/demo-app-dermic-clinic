"use client"
import React, { useState, useEffect } from 'react'
import { PopupUpdate } from '@/components/popup/popup-update'

import { useFormik } from 'formik';
import {
    useGetEmployeesQuery,
    useUpdateInfoExtraAppointmentMutation,
    useUpdateExtraAppointmentScheduleMutation, 
    useGetExtraAppointmentByIdQuery
} from '@/app/(dashboard)/store';

interface Props {
    id?: any;
    close?: any;
    refetchAppointemnt?: any;
}

const formatTime = (timeString: Date) => {

    if (!timeString) return "";
    const date = new Date(`2000-01-01T${timeString}Z`); // Agregamos una fecha arbitraria para usar los métodos de Date

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convertir a formato de 12 horas
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe mostrarse como '12'

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};

export default function DetailpopupExtraAppointmentComponent({ id, close, refetchAppointemnt }: Props) {

    const { data, isLoading, error, refetch } = useGetExtraAppointmentByIdQuery(id);
    const { data: dataEmployee, error: errorEmployee, isLoading: loadEmployee, refetch: refetchEmployee } = useGetEmployeesQuery({ limit: 40000, page: 0, filter: '' })

    const employees = dataEmployee?.data?.content;

    const [button1Disabled, setButton1Disabled] = useState(false);
    const [button2Disabled, setButton2Disabled] = useState(false);
    const [button3Disabled, setButton3Disabled] = useState(false);

    const [updateScheduleExtraAppointment, { isLoading: appointmentLoad, error: appointmentError }] = useUpdateExtraAppointmentScheduleMutation()

    const [updateInfoExtra, { isLoading: updateInfoExtraLoad }] = useUpdateInfoExtraAppointmentMutation()

    const appointmentExtraData = data?.data

    const filterEmployee = employees?.filter((item: any) => item.usuario.id_usuario === appointmentExtraData?.usuario_registro.id_usuario)

    useEffect(() => {
        if (!loadEmployee && !isLoading) {
            refetchEmployee();
            refetch()
        }
    }, [loadEmployee, refetchEmployee, isLoading, refetch])

    const handleUpdateClick = (buttonNumber: any) => {
        let appointmentScheduleId;
        switch (buttonNumber) {
            case 1:
                appointmentScheduleId = appointmentExtraData?.cita_extra_info?.id_cita_extra_info;
                if (appointmentScheduleId && !button1Disabled) {
                    setButton1Disabled(true);
                    updateScheduleExtraAppointment({ appointmentScheduleId }).then(() => {
                        refetch();
                        refetchAppointemnt();
                    });
                }
                break;
            case 2:
                appointmentScheduleId = appointmentExtraData?.cita_extra_info?.id_cita_extra_info;
                if (appointmentScheduleId && !button2Disabled) {
                    setButton2Disabled(true);
                    updateScheduleExtraAppointment({ appointmentScheduleId }).then(() => {
                        refetch();
                        refetchAppointemnt();
                    });
                }
                break;
            case 3:
                appointmentScheduleId = appointmentExtraData?.cita_extra_info?.id_cita_extra_info;
                if (appointmentScheduleId && !button3Disabled) {
                    setButton3Disabled(true);
                    updateScheduleExtraAppointment({ appointmentScheduleId }).then(() => {
                        refetch();
                        refetchAppointemnt();
                    });
                }
                break;
            default:
                break;
        }
    };

    const formik = useFormik({
        initialValues: {
            notas: appointmentExtraData?.cita_extra_info.notas || '',
            minutos_alarma: appointmentExtraData?.cita_extra_info.minutos_alarma || 0
        },
        onSubmit: async (values) => {
            await updateInfoExtra({ appointmentInfoExtraId: id, appointmentInfoExtraData: values }).unwrap().then(() => {
                // console.log({ id, values });
                close();
                refetch();
            }).catch((err) => console.error(err))
        }
    });
    return (
        <PopupUpdate>
            <div className="flex justify-between items-center md:flex-row px-4 space-y-4 md:space-y-0 md:space-x-4">
                <h1 className="font-bold text-lg">Horario Cita</h1>
                <button onClick={close}>x</button>
            </div>
            <section className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
                {/* Información de la cita */}
                <article className="flex-1 bg-white p-6 border border-gray-300 rounded-lg">
                    <h1 className="capitalize text-gray-700 text-xl font-semibold mb-2 underline">Detalles de la cita</h1>
                    {/* <span className="block text-gray-700 text-lg font-semibold mb-2">ID: <span className="font-normal">{id}</span></span> */}

                    <p className="capitalize text-gray-700 text-lg font-semibold mb-2">Paciente: <span className="font-normal">{appointmentExtraData?.paciente.nombres.toLowerCase()}</span></p>
                    <p className="text-gray-700 text-lg font-semibold mb-2">Telefono: <span className="font-normal">{appointmentExtraData?.paciente.telefono}</span></p>

                    <p className="text-gray-700 text-lg font-semibold mb-2">DNI: <span className="font-normal">{appointmentExtraData?.paciente.numero_documento_identidad}</span></p>
                    <p className="text-gray-700 text-lg font-semibold mb-2">Sala: <span className="font-normal">{appointmentExtraData?.sala_tratamiento.nombres}</span></p>
                    <span className="block text-gray-700 text-lg font-semibold mb-2">Procedimiento: <span className="font-normal">{appointmentExtraData?.procedimiento.nombres}</span></span>
                    <p className="capitalize text-gray-700 text-lg font-semibold mb-2">Doctor Especialista: <span className="font-normal">{appointmentExtraData?.empleado.nombres.toLowerCase()}</span></p>
                    <p className="text-gray-700 text-lg font-semibold">Fecha de la cita: <span className="font-normal">{appointmentExtraData?.fecha_cita}</span></p>
                    <p className="capitalize text-gray-700 text-lg font-semibold mb-2">Cita extra creada por: <span className="font-normal capitalize">{loadEmployee ? '....' : filterEmployee[0]?.nombres.toLowerCase()}</span></p>

                </article>


                {/* Notas y alarma */}
                <section className="flex-1 bg-white p-6 border border-gray-300 rounded-lg">
                    <article className='flex justify-between'>
                        <div>
                            <h1>Llegada</h1>
                            <button
                                className='h-16 w-16 rounded-md text-white bg-green-900'
                                onClick={() => handleUpdateClick(1)}
                                disabled={button1Disabled}
                            >
                                {
                                    isLoading ? "..." :
                                        appointmentLoad ? "..." : formatTime(appointmentExtraData?.cita_extra_info?.hora_entrada)}
                            </button>
                        </div>
                        <div>
                            <h1>Entrada</h1>
                            <button className='h-16 w-16 rounded-md  bg-yellow-300'
                                onClick={() => handleUpdateClick(2)}
                                disabled={button2Disabled}
                            >
                                {
                                    isLoading ? "..." :
                                        appointmentLoad ? "..." : formatTime(appointmentExtraData?.cita_extra_info?.hora_atencion)}
                            </button>
                        </div>
                        <div>
                            <h1>Salida</h1>
                            <button className='h-16 w-16 rounded-md bg-blue-800 text-white'
                                onClick={() => handleUpdateClick(3)}
                                disabled={button3Disabled}
                            >
                                {
                                    isLoading ? "..." :
                                        appointmentLoad ? "..." : formatTime(appointmentExtraData?.cita_extra_info?.hora_salida)}

                            </button>
                        </div>
                    </article>
                    <div className='divide-y'></div>
                    <form onSubmit={formik.handleSubmit}>
                        <article className="mb-4">
                            <p className="font-bold text-gray-700 mb-2">Minutos Alarma</p>
                            <input
                                value={formik.values.minutos_alarma}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="minutos_alarma"
                                type="number"
                                className='border px-3 border-gray-300 w-full h-12 rounded-md' />
                        </article>
                        <article className="mb-4">
                            <p className="font-bold text-gray-700 mb-2">Notas</p>
                            <textarea value={formik.values.notas}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="notas"
                                className='border p-3 text-sm outline-none w-full border-gray-300 rounded-sm'
                            >
                            </textarea>
                        </article>
                        <div className='flex justify-end items-center gap-2'>
                            <button className='bg-red-500 p-2 text-white rounded hover:bg-red-600' type='button' onClick={close}>Cancelar</button>
                            <button
                                className=" bg-blue-500 p-2 text-white  rounded hover:bg-blue-600"
                                type='submit'>{updateInfoExtraLoad ? 'Actualizando...' : 'Actualizar'}
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </PopupUpdate>
    )
}
