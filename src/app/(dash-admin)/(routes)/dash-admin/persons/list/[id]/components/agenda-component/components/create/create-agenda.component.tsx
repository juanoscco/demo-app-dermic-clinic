"use client"
import React from 'react'
import { useAddAgendaMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/create/store/service'
import { PopupUpdate } from '@/components/popup/popup-update'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AgendaOpening } from "../../inteface/"

interface Props {
    id?: number | any;
    data?: any;
    onClose?: any;
    update?: any
}


const validationSchema = Yup.object({
    fecha_apertura: Yup.string().required('Required'),
    hora_inicio: Yup.string().required('Required'),
    hora_final: Yup.string().required('Required'),
    estado: Yup.boolean().required('Required')
});

export  function CreateAgendaComponent({ id, data, onClose, update }: Props) {
    const [addAgenda, { isLoading }] = useAddAgendaMutation()

    const formik = useFormik<AgendaOpening>({
        initialValues: {
            usuario_registro: {
                id_usuario: id,
            },
            empleado: {
                id_empleado: id,
            },
            empresa: {
                id_empresa: 1
            },
            fecha_apertura: "",
            hora_inicio: "",
            hora_final: "",
            estado: true,
            estado_eliminado:false
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                await addAgenda(values)
                update()
                onClose()
            } catch (error) {
                console.error("Error !!")
            }
        }
    });
    return (
        <PopupUpdate>
            <button onClick={onClose}>X</button>
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
                    {isLoading ? 'Creando...' : 'Crear'}
                </button>
            </form>
        </PopupUpdate>
    )
}
