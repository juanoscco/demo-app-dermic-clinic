"use client";
import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update';

import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';

import { useAddExceptionMutation } from "@/app/(dashboard)/store"

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    id?: number | any;
    data?: any;
    onClose?: any;
    update?: any
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
    fecha_ausente_desde: Yup.date()
        // .max(today, 'La fecha debe ser hoy o anterior')
        .required('Required'),
    fecha_ausente_hasta: Yup.date()
        // .min(today, 'La fecha debe ser hoy o en el futuro')
        .required('Required'),
    motivo: Yup.string().required('Required')
});



export function CreateExceptionComponents({ id, data, onClose, update }: Props) {
    const [addException, { isLoading }] = useAddExceptionMutation();
    const { data: dataTimeOptiones } = useGetFindHeadBoardQuery(10)
    const timeOptions = dataTimeOptiones?.cabecera?.cabeceras_detalles
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
                id_cabecera_detalle: 46,
                descripcion: "--Seleccione--",
                valor: ""
            },
            hora_final: {
                id_cabecera: 10,
                id_cabecera_detalle: 46,
                descripcion: "--Seleccione--",
                valor: ""
            },
            empresa: {
                id_empresa: data?.empresa.id_empresa
            },
            motivo: "",
            estado: true,
            estado_eliminado: false
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                await addException(values);
                update();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = timeOptions?.find((option: any) => option.id_cabecera_detalle === parseInt(e.target.value));
        formik.setFieldValue('hora_inicio.id_cabecera_detalle', selectedOption?.id_cabecera_detalle);
        formik.setFieldValue('hora_inicio.descripcion', selectedOption?.descripcion);
        formik.setFieldValue('hora_inicio.valor', selectedOption?.valor || '');
    };
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = timeOptions?.find((option: any) => option.id_cabecera_detalle === parseInt(e.target.value));
        formik.setFieldValue('hora_final.id_cabecera_detalle', selectedOption?.id_cabecera_detalle);
        formik.setFieldValue('hora_final.descripcion', selectedOption?.descripcion);
        formik.setFieldValue('hora_final.valor', selectedOption?.valor || '');
    };
    return (
        <PopupUpdate>
            <div className='flex justify-between flex-wrap mb-4'>
                <h1 className='text-2xl'>Crear Excepcion</h1>
                <button onClick={onClose}>x</button>
            </div>
            <form onSubmit={formik.handleSubmit}
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
                        value={formik.values.hora_inicio.id_cabecera_detalle}
                        onChange={handleStartTimeChange}
                    >
                        {timeOptions?.map((option: any) => (
                            <option key={option.id_cabecera_detalle} value={option.id_cabecera_detalle}>
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
                        value={formik.values.hora_final.id_cabecera_detalle}
                        onChange={handleEndTimeChange}
                    >
                        {timeOptions?.map((option: any) => (
                            <option key={option.id_cabecera_detalle} value={option.id_cabecera_detalle}>
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
