"use client"
import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Schedule } from "./inteface"
import { useAddScheduleMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/create/store/service';

interface Props {
    idPerson?: number;
    dataPerson?: any;
    onClose?: any;
    update?: any
}

export default function CreateScheduleComponent({ idPerson, dataPerson, onClose, update }: Props) {
    const [addSchelude, { isLoading }] = useAddScheduleMutation()

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
                    semana: { id_cabecera: 4, id_cabecera_detalle: 8, descripcion: "Lunes", valor: "1" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 37, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 48, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 58, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 64, descripcion: "17:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 9, descripcion: "Martes", valor: "2" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 43, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 54, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 65, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 72, descripcion: "17:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 10, descripcion: "Miercoles", valor: "3" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 40, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 48, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 57, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 61, descripcion: "17:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 11, descripcion: "Jueves", valor: "4" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 42, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 53, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 64, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 72, descripcion: "17:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 12, descripcion: "Viernes", valor: "5" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 43, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 66, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 71, descripcion: "17:00 p.m.", valor: "" },
                    estado: false,
                    estado_eliminado: false

                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 13, descripcion: "Sabado", valor: "6" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 45, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 57, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 73, descripcion: "17:00 p.m.", valor: "" },
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

    const opcionesInicioTemprano = [
        { id_cabecera_detalle: 37, descripcion: "08:00 a.m." },
        { id_cabecera_detalle: 38, descripcion: "08:20 a.m." },
        { id_cabecera_detalle: 39, descripcion: "08:40 a.m." },
        { id_cabecera_detalle: 40, descripcion: "09:00 a.m." },
        { id_cabecera_detalle: 41, descripcion: "09:20 a.m." },
        { id_cabecera_detalle: 42, descripcion: "09:40 a.m." },
        { id_cabecera_detalle: 43, descripcion: "10:00 a.m." }
    ];

    const opcionesFinalTemprano = [
        { id_cabecera_detalle: 44, descripcion: "10:20 a.m." },
        { id_cabecera_detalle: 45, descripcion: "10:40 a.m." },
        { id_cabecera_detalle: 46, descripcion: "11:00 a.m." },
        { id_cabecera_detalle: 47, descripcion: "11:20 a.m." },
        { id_cabecera_detalle: 48, descripcion: "11:40 a.m." },
        { id_cabecera_detalle: 49, descripcion: "12:00 p.m." },
        { id_cabecera_detalle: 50, descripcion: "12:20 p.m." },
        { id_cabecera_detalle: 51, descripcion: "12:40 p.m." }

    ];

    const opcionesInicioTarde = [
        { id_cabecera_detalle: 52, descripcion: "13:00 p.m." },
        { id_cabecera_detalle: 53, descripcion: "13:20 p.m." },
        { id_cabecera_detalle: 54, descripcion: "13:40 p.m." },
        { id_cabecera_detalle: 55, descripcion: "14:00 p.m." },
        { id_cabecera_detalle: 56, descripcion: "14:20 p.m." },
        { id_cabecera_detalle: 57, descripcion: "14:40 p.m." },
        { id_cabecera_detalle: 58, descripcion: "15:00 p.m." }
    ];

    const opcionesFinalTarde = [
        { id_cabecera_detalle: 59, descripcion: "15:20 p.m." },
        { id_cabecera_detalle: 60, descripcion: "15:40 p.m." },
        { id_cabecera_detalle: 61, descripcion: "16:00 p.m." },
        { id_cabecera_detalle: 62, descripcion: "16:20 p.m." },
        { id_cabecera_detalle: 63, descripcion: "16:40 p.m." },
        { id_cabecera_detalle: 64, descripcion: "17:00 p.m." },
        { id_cabecera_detalle: 65, descripcion: "17:20 p.m." },
        { id_cabecera_detalle: 66, descripcion: "17:40 p.m." },
        { id_cabecera_detalle: 67, descripcion: "18:00 p.m." },
        { id_cabecera_detalle: 68, descripcion: "18:20 p.m." },
        { id_cabecera_detalle: 69, descripcion: "18:40 p.m." },
        { id_cabecera_detalle: 70, descripcion: "19:00 p.m." },
        { id_cabecera_detalle: 71, descripcion: "19:20 p.m." },
        { id_cabecera_detalle: 72, descripcion: "19:40 p.m." }
    ];


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
            <button onClick={onClose} className='flex justify-end w-full'>x</button>
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
                                            name={`horario_trabajo_detalle[${index}].temprano_inicio.id_cabecera_detalle`}
                                            onChange={(e) => handleSelectChange(e, index, 'temprano_inicio', opcionesInicioTemprano)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.temprano_inicio?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {opcionesInicioTemprano.map((opcion) => (
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
                                            onChange={(e) => handleSelectChange(e, index, 'tarde_inicio', opcionesInicioTarde)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.tarde_inicio?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {opcionesInicioTarde.map((opcion) => (
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
                                            onChange={(e) => handleSelectChange(e, index, 'temprano_final', opcionesFinalTemprano)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.temprano_final?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {opcionesFinalTemprano.map((opcion) => (
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
                                            onChange={(e) => handleSelectChange(e, index, 'tarde_final', opcionesFinalTarde)}
                                            onBlur={formik.handleBlur}
                                            value={detalle.tarde_final?.id_cabecera_detalle || ''}
                                            disabled={!detalle.estado}
                                            className="mt-1 p-2 border rounded w-full"
                                        >
                                            {opcionesFinalTarde.map((opcion) => (
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
