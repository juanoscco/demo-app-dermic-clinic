"use client"
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PopupUpdate } from '@/components/popup/popup-update';
import { AgendaOpening } from "../../inteface";

import { useUpdateAgendaMutation } from "@/app/(dashboard)/store"

interface Props {
    onClose?: any;
    update?: any;
    dataAgendaUpdate?: any;
    idAgendaUpdate?: number;
}
const validationSchema = Yup.object({
    fecha_apertura: Yup.string().required('Required'),
    hora_inicio: Yup.string().required('Required'),
    hora_final: Yup.string().required('Required'),
    estado: Yup.boolean().required('Required')
});

export function UpdateAgendaComponent({ idAgendaUpdate, dataAgendaUpdate, update, onClose }: Props) {
    const [updateAgenda, { isLoading }] = useUpdateAgendaMutation()
    console.log(dataAgendaUpdate)
    const formik = useFormik<AgendaOpening>({
        initialValues: {
            usuario_registro: {
                id_usuario: dataAgendaUpdate?.usuario_registro.id_usuario,
            },
            empleado: {
                id_empleado: dataAgendaUpdate?.empleado.id_empleado,
            },
            empresa: {
                id_empresa: dataAgendaUpdate?.empresa.id_empresa
            },
            id_agenda: idAgendaUpdate,
            fecha_apertura: dataAgendaUpdate?.fecha_apertura,
            hora_inicio: dataAgendaUpdate?.hora_inicio,
            hora_final: dataAgendaUpdate?.hora_final,
            estado: true,
            estado_eliminado: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                await updateAgenda({ agendaId: values.id_agenda, agendaData: values })
                update()
                onClose()
            } catch (error) {
                console.error("Error !!")
            }
        }
    });
    return (
        <PopupUpdate>
            <button onClick={onClose}>x</button>
            <form
                onSubmit={formik.handleSubmit}
                className='grid grid-cols-1 md:grid-cols-2 gap-5'
            >
                <div className='border border-gray-300 text-left p-2'>
                    <label>Dia de apertura</label>
                    <input
                        type="date"
                        name="fecha_apertura"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_apertura}
                        className='w-full py-2 outline-none px-1'

                    />
                    {formik.errors.fecha_apertura ? <div>{formik.errors.fecha_apertura}</div> : null}
                </div>
                <div className='border border-gray-300 text-left p-2'>
                    <label>Hora Inicio</label>
                    <input
                        type="time"
                        name="hora_inicio"
                        onChange={(e) => {
                            const time = e.target.value;
                            const formattedTime = new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-GB', { hour12: false });
                            formik.setFieldValue('hora_inicio', formattedTime);
                        }}
                        value={formik.values.hora_inicio.substring(0, 5)}
                        className='w-full py-2 outline-none px-1'
                    />
                    {formik.errors.hora_inicio ? <div>{formik.errors.hora_inicio}</div> : null}
                </div>
                <div className='border border-gray-300 text-left p-2'>
                    <label>Hora Final</label>
                    <input
                        type="time"
                        name="hora_final"
                        onChange={(e) => {
                            const time = e.target.value;
                            const formattedTime = new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-GB', { hour12: false });
                            formik.setFieldValue('hora_final', formattedTime);
                        }}
                        value={formik.values.hora_final ? formik.values.hora_final.substring(0, 5) : ''}
                        className='w-full py-2 outline-none px-1'
                    />
                    {formik.errors.hora_final ? <div>{formik.errors.hora_final}</div> : null}
                </div>


                <button
                    className='px-4 py-2 bg-[#82b440] text-white hover:bg-green-700'

                    type="submit">
                    {isLoading ? 'Editando...' : 'Editar'}
                </button>
            </form>
        </PopupUpdate>
    )
}
