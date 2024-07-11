"use client"
import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Schedule } from "./inteface"
import { useAddScheduleMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/create/store/service';
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';

interface Props {
    idPerson?: number;
    dataPerson?: any;
    onClose?: any;
    update?: any
}

export default function CreateScheduleComponent({ idPerson, dataPerson, onClose, update }: Props) {
    const [addSchelude, { isLoading }] = useAddScheduleMutation()

    const { data: dataTimeOptiones } = useGetFindHeadBoardQuery(10)
    const timeOptions = dataTimeOptiones?.cabecera?.cabeceras_detalles;

    const formik = useFormik<Schedule>({
        initialValues: {
            nombre_horario: 'Horario de empleado',
            usuario_registro: {
                id_usuario: dataPerson.usuario.id_usuario,
            },
            empleado: {
                id_empleado: idPerson,
            },
            empresa: {
                id_empresa: dataPerson?.empresa.id_empresa,
            },
            horario_trabajo_detalle: [
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 12, descripcion: "Lunes", valor: "1" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 47, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 86, descripcion: "21:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 13, descripcion: "Martes", valor: "2" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 47, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 86, descripcion: "21:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 14, descripcion: "Miercoles", valor: "3" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 47, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 86, descripcion: "21:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 15, descripcion: "Jueves", valor: "4" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 47, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 86, descripcion: "21:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 16, descripcion: "Viernes", valor: "5" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 47, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 86, descripcion: "21:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 17, descripcion: "Sabado", valor: "6" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 47, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 86, descripcion: "21:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
            ],
            estado: dataPerson?.estado || false,
            estado_eliminado: false
        },
        validationSchema: Yup.object({
            nombre_horario: Yup.string().required('Requerido'),
            horario_trabajo_detalle: Yup.array().of(
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

                await addSchelude(values as any).then(() => {
                    console.log(values);
                    update();
                    onClose();
                }).catch((err) => alert(err));

            } catch (error) {
                console.error(error)
            }

        }
    });




    const handleActivationToggle = (index: any, active: any) => {
        formik.setFieldValue(`horario_trabajo_detalle[${index}].estado`, active);
    };

    const handleSelectChange = (e: any, index: number, field: any, optionsArray: any) => {
        const value = parseInt(e.target.value);
        const option = optionsArray.find((opcion: any) => opcion.id_cabecera_detalle === value);
        formik.setFieldValue(`horario_trabajo_detalle[${index}].${field}`, option);
    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center py-3'>
                <h1 className='text-2xl font-bold '>Crear Horario</h1>
                <button onClick={onClose} className='text-2xl font-bold'>x</button>
            </div>
            <form onSubmit={formik.handleSubmit}>



                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {formik.values.horario_trabajo_detalle?.map((detalle, index) => (
                        <div key={index} className='border border-gray-300  p-4 '>
                            <h1 className="font-bold text-lg">{detalle?.semana.descripcion}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded">
                                <div className="flex flex-col gap-3">
                                    <div className="mb-2">
                                        <label className="block text-gray-700">Temprano Inicio</label>
                                        <select
                                            name={`horario_trabajo_detalle[${index}].temprano_inicio.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'temprano_inicio', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.temprano_inicio?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion:any) => (
                                                <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                    {opcion.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">Tarde Inicio</label>
                                        <select
                                            name={`horario_trabajo_detalle[${index}].tarde_inicio.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'tarde_inicio', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.tarde_inicio?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion:any) => (
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
                                            name={`horario_trabajo_detalle[${index}].temprano_final.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'temprano_final', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.temprano_final?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion:any) => (
                                                <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                    {opcion.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">Tarde Final</label>
                                        <select
                                            name={`horario_trabajo_detalle[${index}].tarde_final.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'tarde_final', timeOptions)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.tarde_final?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {timeOptions?.map((opcion:any) => (
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
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">{isLoading ? 'Creando...' : 'Crear'}</button>
                </div>
            </form>
        </PopupUpdate>
    )
}
