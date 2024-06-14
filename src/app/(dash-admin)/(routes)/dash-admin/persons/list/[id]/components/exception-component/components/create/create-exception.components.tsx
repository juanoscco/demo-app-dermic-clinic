"use client";
import React from 'react'
import { useAddExceptionMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/create/store/service';
import { PopupUpdate } from '@/components/popup/popup-update';
import { useFormik } from 'formik';
import * as Yup from 'yup';
interface Props {
    id?: number | any;
    data?: any;
    onClose?: any;
    update?: any
}

const today = new Date();
today.setHours(0, 0, 0, 0); // Para ignorar la parte de la hora

const validationSchema = Yup.object({
    fecha_ausente_desde: Yup.date()
        // .max(today, 'La fecha debe ser hoy o anterior')
        .required('Required'),
    fecha_ausente_hasta: Yup.date()
        // .min(today, 'La fecha debe ser hoy o en el futuro')
        .required('Required'),
    motivo: Yup.string().required('Required')
});

const timeOptions = [
    { id_cabecera_detalle: 40, descripcion: "09:00 a.m." },
    { id_cabecera_detalle: 41, descripcion: "09:20 a.m." },
    { id_cabecera_detalle: 42, descripcion: "09:40 a.m." },
    { id_cabecera_detalle: 43, descripcion: "10:00 a.m." },
    { id_cabecera_detalle: 44, descripcion: "10:20 a.m." },
    { id_cabecera_detalle: 45, descripcion: "10:40 a.m." },
    { id_cabecera_detalle: 46, descripcion: "11:00 a.m." },
    { id_cabecera_detalle: 47, descripcion: "11:20 a.m." },
    { id_cabecera_detalle: 48, descripcion: "11:40 a.m." },
    { id_cabecera_detalle: 49, descripcion: "12:00 p.m." },
    { id_cabecera_detalle: 50, descripcion: "12:20 p.m." },
    { id_cabecera_detalle: 51, descripcion: "12:40 p.m." },
    { id_cabecera_detalle: 52, descripcion: "13:00 p.m." },
    { id_cabecera_detalle: 53, descripcion: "13:20 p.m." },
    { id_cabecera_detalle: 54, descripcion: "13:40 p.m." },
    { id_cabecera_detalle: 55, descripcion: "14:00 p.m." },
    { id_cabecera_detalle: 56, descripcion: "14:20 p.m." },
    { id_cabecera_detalle: 57, descripcion: "14:40 p.m." },
    { id_cabecera_detalle: 58, descripcion: "15:00 p.m." },
    { id_cabecera_detalle: 59, descripcion: "15:20 p.m." },
    { id_cabecera_detalle: 60, descripcion: "15:40 p.m." },
    { id_cabecera_detalle: 61, descripcion: "16:00 p.m." },
    { id_cabecera_detalle: 62, descripcion: "16:20 p.m." },
    { id_cabecera_detalle: 63, descripcion: "16:40 p.m." },
    { id_cabecera_detalle: 64, descripcion: "17:00 p.m." },
    { id_cabecera_detalle: 65, descripcion: "17:20 p.m." },
    { id_cabecera_detalle: 66, descripcion: "17:40 p.m." },
    { id_cabecera_detalle: 67, descripcion: "18:00 p.m." }
];

export function CreateExceptionComponents({ id, data, onClose, update }: Props) {
    const [addException, { isLoading }] = useAddExceptionMutation();
    // console.log(data)
    const formik = useFormik({
        initialValues: {
            usuario_registro: {
                id_usuario: data?.usuario.id_usuario
            },
            empleado: {
                id_empleado: data?.id_empleado
            },
            fecha_ausente_desde: "",
            fecha_ausente_hasta: "",
            hora_inicio: {
                id_cabecera: 10,
                id_cabecera_detalle: 43,
                descripcion: "10:00 a.m.",
                valor: ""
            },
            hora_final: {
                id_cabecera: 10,
                id_cabecera_detalle: 46,
                descripcion: "11:00 a.m.",
                valor: ""
            },
            empresa: {
                id_empresa: data?.empresa.id_empresa
            },
            motivo: "",
            estado: true
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                // console.log(values)
                await addException(values);
                update();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <PopupUpdate>
            <div className='flex justify-between flex-wrap mb-4'>
                <h1 className='text-2xl'>Crear Excepcion</h1>
                <button onClick={onClose}>x</button>
            </div>            <form onSubmit={formik.handleSubmit}
                className='grid grid-cols-1 md:grid-cols-2 gap-5'
            >
                <div className='border border-gray-300 text-left p-2'>
                    <label htmlFor="fecha_ausente_desde">Fecha Ausente Desde</label>
                    <input
                        type="date"
                        id="fecha_ausente_desde"
                        className='w-full py-2 outline-none px-1'

                        {...formik.getFieldProps('fecha_ausente_desde')}
                    />
                    {formik.touched.fecha_ausente_desde && formik.errors.fecha_ausente_desde ? (
                        <div>{formik.errors.fecha_ausente_desde}</div>
                    ) : null}
                </div>

                <div className='border border-gray-300 text-left p-2'>
                    <label htmlFor="fecha_ausente_hasta">Fecha Ausente Hasta</label>
                    <input
                        type="date"
                        id="fecha_ausente_hasta"
                        className='w-full py-2 outline-none px-1'

                        {...formik.getFieldProps('fecha_ausente_hasta')}
                    />
                    {formik.touched.fecha_ausente_hasta && formik.errors.fecha_ausente_hasta ? (
                        <div>{formik.errors.fecha_ausente_hasta}</div>
                    ) : null}
                </div>

                <div className='border border-gray-300 text-left p-2'>
                    <label htmlFor="hora_inicio">Hora Inicio</label>
                    <select
                        id="hora_inicio"
                        className='w-full py-2 outline-none px-1'

                        {...formik.getFieldProps('hora_inicio.descripcion')}
                    >
                        {timeOptions.map(option => (
                            <option key={option.id_cabecera_detalle} value={option.descripcion}>
                                {option.descripcion}
                            </option>
                        ))}
                    </select>
                    {formik.touched.hora_inicio?.descripcion && formik.errors.hora_inicio?.descripcion ? (
                        <div>{formik.errors.hora_inicio.descripcion}</div>
                    ) : null}
                </div>

                <div className='border border-gray-300 text-left p-2'>
                    <label htmlFor="hora_final">Hora Final</label>
                    <select
                        id="hora_final"
                        className='w-full py-2 outline-none px-1'

                        {...formik.getFieldProps('hora_final.descripcion')}
                    >
                        {timeOptions.map(option => (
                            <option key={option.id_cabecera_detalle} value={option.descripcion}>
                                {option.descripcion}
                            </option>
                        ))}
                    </select>
                    {formik.touched.hora_final?.descripcion && formik.errors.hora_final?.descripcion ? (
                        <div>{formik.errors.hora_final.descripcion}</div>
                    ) : null}
                </div>

                <div className='border border-gray-300 text-left p-2'>
                    <label htmlFor="motivo">Motivo</label>
                    <input
                        type="text"
                        id="motivo"
                        className='w-full py-2 outline-none px-1'

                        {...formik.getFieldProps('motivo')}
                    />
                    {formik.touched.motivo && formik.errors.motivo ? (
                        <div>{formik.errors.motivo}</div>
                    ) : null}
                </div>
                <button
                    className='px-4 py-2 bg-[#82b440] text-white hover:bg-green-700'
                    type="submit"
                    disabled={formik.isSubmitting}>
                    {isLoading ? 'Creando...' : 'Crear'}
                </button>
            </form>
        </PopupUpdate>
    )
}
