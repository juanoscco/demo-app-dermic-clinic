import React from 'react'

import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';
import { PopupUpdate } from '@/components/popup/popup-update'
import { Schedule } from "./interface/"

import { useUpdateScheduleMutation } from "@/app/(dashboard)/store"
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    idUpdate?: number;
    dataUpdate?: any;
    onClose?: any
    update?: any
}

export default function UpdateScheduleComponent({ idUpdate, dataUpdate, update, onClose }: Props) {
    const [updateSchedule, { data, isLoading }] = useUpdateScheduleMutation()

    const { data: dataTimeOptiones } = useGetFindHeadBoardQuery(10);
    const timeOptions = dataTimeOptiones?.cabecera?.cabeceras_detalles


    const formik = useFormik<Schedule>({
        initialValues: {
            id_horario_trabajo: idUpdate,
            nombre_horario: 'Horario',
            usuario_registro: {
                id_usuario: dataUpdate?.usuario?.id_usuario,
            },
            empleado: {
                id_empleado: dataUpdate?.empleado.id_empleado,
            },
            empresa: {
                id_empresa: dataUpdate?.empresa.id_empresa,
            },
            horario_trabajo_detalle: [
                {
                    semana: {
                        id_cabecera: 4,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[0]?.semana.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[0]?.semana.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[0]?.semana.valor,
                    },
                    temprano_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[0].temprano_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[0].temprano_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[0].temprano_inicio.valor,
                    },
                    temprano_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[0].temprano_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[0].temprano_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[0].temprano_final.valor,
                    },
                    tarde_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[0].tarde_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[0].tarde_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[0].tarde_inicio.valor,
                    },
                    tarde_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[0].tarde_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[0].tarde_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[0].tarde_final.valor,
                    },
                    estado: dataUpdate.horario_trabajo_detalles[0].estado,
                    estado_eliminado: false
                },
                {
                    semana: {
                        id_cabecera: 4,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[1].semana.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[1].semana.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[1].semana.valor,
                    },
                    temprano_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[1].temprano_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[1].temprano_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[1].temprano_inicio.valor,
                    },
                    temprano_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[1].temprano_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[1].temprano_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[1].temprano_final.valor,
                    },
                    tarde_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[1].tarde_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[1].tarde_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[1].tarde_inicio.valor,
                    },
                    tarde_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[1].tarde_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[1].tarde_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[1].tarde_final.valor,
                    },
                    estado: dataUpdate.horario_trabajo_detalles[1].estado,
                    estado_eliminado: false

                },
                {
                    semana: {
                        id_cabecera: 4,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[2].semana.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[2].semana.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[2].semana.valor,
                    },
                    temprano_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[2].temprano_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[2].temprano_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[2].temprano_inicio.valor,
                    },
                    temprano_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[2].temprano_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[2].temprano_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[2].temprano_final.valor,
                    },
                    tarde_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[2].tarde_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[2].tarde_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[2].tarde_inicio.valor,
                    },
                    tarde_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[2].tarde_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[2].tarde_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[2].tarde_final.valor,
                    },
                    estado: dataUpdate.horario_trabajo_detalles[2].estado,
                    estado_eliminado: false

                },
                {
                    semana: {
                        id_cabecera: 4,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[3]?.semana.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[3]?.semana.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[3]?.semana.valor,
                    },
                    temprano_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[3]?.temprano_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[3]?.temprano_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[3]?.temprano_inicio.valor,
                    },
                    temprano_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[3]?.temprano_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[3]?.temprano_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[3]?.temprano_final.valor,
                    },
                    tarde_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[3]?.tarde_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[3]?.tarde_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[3]?.tarde_inicio.valor,
                    },
                    tarde_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[3]?.tarde_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[3]?.tarde_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[3]?.tarde_final.valor,
                    },
                    estado: dataUpdate.horario_trabajo_detalles[3]?.estado,
                    estado_eliminado: false

                },
                {
                    semana: {
                        id_cabecera: 4,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[4]?.semana.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[4]?.semana.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[4]?.semana.valor,
                    },
                    temprano_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[4]?.temprano_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[4]?.temprano_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[4]?.temprano_inicio.valor,
                    },
                    temprano_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[4]?.temprano_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[4]?.temprano_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[4]?.temprano_final.valor,
                    },
                    tarde_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[4]?.tarde_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[4]?.tarde_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[4]?.tarde_inicio.valor,
                    },
                    tarde_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[4]?.tarde_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[4]?.tarde_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[4]?.tarde_final.valor,
                    },
                    estado: dataUpdate.horario_trabajo_detalles[4]?.estado,
                    estado_eliminado: false

                },
                {
                    semana: {
                        id_cabecera: 4,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[5]?.semana.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[5]?.semana.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[5]?.semana.valor,
                    },
                    temprano_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[5]?.temprano_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[5]?.temprano_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[5]?.temprano_inicio.valor,
                    },
                    temprano_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[5]?.temprano_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[5]?.temprano_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[5]?.temprano_final.valor,
                    },
                    tarde_inicio: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[5]?.tarde_inicio.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[5]?.tarde_inicio.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[5]?.tarde_inicio.valor,
                    },
                    tarde_final: {
                        id_cabecera: 10,
                        id_cabecera_detalle: dataUpdate.horario_trabajo_detalles[5]?.tarde_final.id_cabecera_detalle,
                        descripcion: dataUpdate.horario_trabajo_detalles[5]?.tarde_final.descripcion,
                        valor: dataUpdate.horario_trabajo_detalles[5]?.tarde_final.valor,
                    },
                    estado: dataUpdate.horario_trabajo_detalles[5]?.estado,
                    estado_eliminado: false

                },
            ],

            estado: dataUpdate.estado || false,
            estado_eliminado: false

        },
        validationSchema: Yup.object({
            nombre_horario: Yup.string().required('Requerido'),
            horario_trabajo_detalles: Yup.array().of(
                Yup.object({
                    semana: Yup.object({
                        descripcion: Yup.string().required('Required'),
                    }),
                    temprano_inicio: Yup.object({
                        descripcion: Yup.string().required('Required'),
                    }),
                    temprano_final: Yup.object({
                        descripcion: Yup.string().required('Required'),
                    }),
                    tarde_inicio: Yup.object({
                        descripcion: Yup.string().required('Required'),
                    }),
                    tarde_final: Yup.object({
                        descripcion: Yup.string().required('Required'),
                    }),
                })
            )
        }),
        onSubmit: async (values) => {
            try {
                console.log(values);
                await updateSchedule({ scheduleId: values.id_horario_trabajo, scheduleData: values }).unwrap();
                onClose();
                update();

            } catch (error) {
                console.error(error)
            }

        }
    });

    const opcionesInicioTemprano = [
        { id_cabecera_detalle: 47, descripcion: "08:00 a.m." },
        { id_cabecera_detalle: 48, descripcion: "08:20 a.m." },
        { id_cabecera_detalle: 49, descripcion: "08:40 a.m." },
        { id_cabecera_detalle: 50, descripcion: "09:00 a.m." },
        { id_cabecera_detalle: 51, descripcion: "09:20 a.m." },
        { id_cabecera_detalle: 52, descripcion: "09:40 a.m." },
        { id_cabecera_detalle: 53, descripcion: "10:00 a.m." },
    ];

    const opcionesFinalTemprano = [
        { id_cabecera_detalle: 54, descripcion: "10:20 a.m." },
        { id_cabecera_detalle: 55, descripcion: "10:40 a.m." },
        { id_cabecera_detalle: 56, descripcion: "11:00 a.m." },
        { id_cabecera_detalle: 57, descripcion: "11:20 a.m." },
        { id_cabecera_detalle: 58, descripcion: "11:40 a.m." },
        { id_cabecera_detalle: 59, descripcion: "12:00 p.m." },
        { id_cabecera_detalle: 60, descripcion: "12:20 p.m." },
        { id_cabecera_detalle: 61, descripcion: "12:40 p.m." }

    ];

    const opcionesInicioTarde = [
        { id_cabecera_detalle: 62, descripcion: "13:00 p.m." },
        { id_cabecera_detalle: 63, descripcion: "13:20 p.m." },
        { id_cabecera_detalle: 64, descripcion: "13:40 p.m." },
        { id_cabecera_detalle: 65, descripcion: "14:00 p.m." },
        { id_cabecera_detalle: 66, descripcion: "14:20 p.m." },
        { id_cabecera_detalle: 67, descripcion: "14:40 p.m." },
        { id_cabecera_detalle: 68, descripcion: "15:00 p.m." }
    ];

    const opcionesFinalTarde = [
        { id_cabecera_detalle: 69, descripcion: "15:20 p.m." },
        { id_cabecera_detalle: 70, descripcion: "15:40 p.m." },
        { id_cabecera_detalle: 71, descripcion: "16:00 p.m." },
        { id_cabecera_detalle: 72, descripcion: "16:20 p.m." },
        { id_cabecera_detalle: 73, descripcion: "16:40 p.m." },
        { id_cabecera_detalle: 74, descripcion: "17:00 p.m." },
        { id_cabecera_detalle: 75, descripcion: "17:20 p.m." },
        { id_cabecera_detalle: 76, descripcion: "17:40 p.m." },
        { id_cabecera_detalle: 77, descripcion: "18:00 p.m." },
        { id_cabecera_detalle: 78, descripcion: "18:20 p.m." },
        { id_cabecera_detalle: 79, descripcion: "18:40 p.m." },
        { id_cabecera_detalle: 80, descripcion: "19:00 p.m." },
        { id_cabecera_detalle: 81, descripcion: "19:20 p.m." },
        { id_cabecera_detalle: 82, descripcion: "19:40 p.m." },
        { id_cabecera_detalle: 83, descripcion: "20:00 p.m." },
        { id_cabecera_detalle: 84, descripcion: "20:20 p.m." },
        { id_cabecera_detalle: 85, descripcion: "20:40 p.m." },
        { id_cabecera_detalle: 86, descripcion: "21:00 p.m." },
    ];


    // const handleSelectChange = (e: any, index: number, field: any, optionsArray: any) => {
    //     const value = parseInt(e.target.value);
    //     const option = optionsArray.find((opcion: any) => opcion.id_cabecera_detalle === value);
    //     formik.setFieldValue(`horario_trabajo_detalles[${index}].${field}`, option);
    // };

    const handleActivationToggle = (index: any, active: any) => {
        formik.setFieldValue(`horario_trabajo_detalle[${index}].estado`, active);
    };

    const handleSelectChange = (e: any, index: any, field: any, options: any) => {
        const value = options.find((option: any) => option.id_cabecera_detalle === parseFloat(e.target.value));
        formik.setFieldValue(`horario_trabajo_detalle[${index}].${field}`, value);
    };
    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-2xl'>Actualizar Horario</h1>
                <button onClick={onClose} className='text-xl'>x</button>
            </div>
            <form onSubmit={formik.handleSubmit}>
                {/* <div className="mb-4 flex gap-2">
                    <label className="block text-gray-700">Nombre Horario</label>
                    <input
                        type="text"
                        name="nombre_horario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre_horario}
                        className="mt-1 p-2 border border-gray-300 rounded w-full outline-none"
                    />
                    {formik.touched.nombre_horario && formik.errors.nombre_horario ? (
                        <div className="text-red-500 flex items-center">{formik.errors.nombre_horario}</div>
                    ) : null}
                </div> */}


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {formik.values.horario_trabajo_detalle?.map((detalle, index) => (
                        <div key={index} className='border border-gray-300  p-4 '>
                            <h1 className="font-bold text-lg">{detalle?.semana.descripcion}</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded">
                                <div className="flex flex-col gap-3">
                                    <div className="mb-2">
                                        <label className="block text-gray-700">Temprano Inicio</label>
                                        <select
                                            name={`horario_trabajo_detalles[${index}].temprano_inicio.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'temprano_inicio', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.temprano_inicio?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion: any) => (
                                                <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                    {opcion.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">Tarde Inicio</label>
                                        <select
                                            name={`horario_trabajo_detalles[${index}].tarde_inicio.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'tarde_inicio', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.tarde_inicio?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion: any) => (
                                                <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                    {opcion.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="mb-2">
                                        <label className="block text-gray-700">Temprano Final</label>
                                        <select
                                            name={`horario_trabajo_detalles[${index}].temprano_final.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'temprano_final', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.temprano_final?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion: any) => (

                                                <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                    {opcion.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">Tarde Final</label>
                                        <select
                                            name={`horario_trabajo_detalles[${index}].tarde_final.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'tarde_final', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.tarde_final?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion: any) => (
                                                <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                    {opcion.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleActivationToggle(index, true)}
                                        className={`w-full h-9 p-1 ${detalle.estado ? 'bg-gray-300 cursor-default' : 'bg-blue-500 text-white'} rounded`}
                                    >
                                        Activar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleActivationToggle(index, false)}
                                        className={`w-full h-9 p-1 ${!detalle.estado ? 'bg-gray-300 cursor-default' : 'bg-red-500 text-white'} rounded`}
                                    >
                                        Desactivar
                                    </button>
                                </>
                            </div>
                        </div>

                    ))}
                </div>

                <div className="flex justify-end mt-3">
                    <button type="button" className="mr-2 py-2 px-4 bg-gray-500 text-white rounded" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">{isLoading ? 'Actualizar...' : 'Actualizar'}</button>
                </div>
            </form>
        </PopupUpdate>
    )
}