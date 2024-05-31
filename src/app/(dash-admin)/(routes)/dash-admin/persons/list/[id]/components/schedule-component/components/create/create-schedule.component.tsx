"use client"
import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Schedule } from "../../inteface/"
import { useAddScheduleMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/create/store/service';

interface Props {
    idPerson?: number;
    dataPerson?: any;
    onClose?: any;
    update?: any
}

export default function CreateScheduleComponent({ idPerson, dataPerson, onClose, update }: Props) {
    const [addSchelude, { data, isLoading }] = useAddScheduleMutation()

    const formik = useFormik<Schedule>({
        initialValues: {
            nombre_horario: '',
            usuario: {
                id_usuario: dataPerson.usuario.id_usuario,
                username: dataPerson?.usuario.username,
                rol: {
                    id_rol: dataPerson?.usuario.rol.id_rol,
                    descripcion: dataPerson?.usuario.rol.descripcion,
                    valor: dataPerson?.usuario.rol.valor ,
                    estado: dataPerson?.usuario.rol.estado
                },
                estado: dataPerson?.usuario.estado
            },
            empleado: {
                id_empleado: dataPerson?.id_empleado || 0,
                tipo_documento: {
                    id_cabecera: dataPerson?.tipo_documento.id_cabecera || 0,
                    id_cabecera_detalle: dataPerson?.tipo_documento.id_cabecera_detalle || 0,
                    descripcion: dataPerson?.tipo_documento.descripcion || '',
                    valor: dataPerson?.tipo_documento.valor || ''
                },
                numero: dataPerson?.numero || '',
                nombres: dataPerson?.nombres || '',
                telefono: dataPerson?.telefono || '',
                correo: dataPerson?.correo || '',
                sede: {
                    id_sede: dataPerson?.sede.id_sede || 0,
                    codigo: dataPerson?.sede.codigo || '',
                    nombres: dataPerson?.sede.nombres || '',
                    direccion: dataPerson?.sede.direccion || '',
                    telefono: dataPerson?.sede.telefono || '',
                    empresa: {
                        id_empresa: dataPerson?.sede.empresa.id_empresa || 0,
                        nro_documento: dataPerson?.sede.empresa.nro_documento || '',
                        nombres: dataPerson?.sede.empresa.nombres || '',
                        direccion: dataPerson?.sede.empresa.direccion || '',
                        estado: dataPerson?.sede.empresa.estado || false
                    },
                    estado: dataPerson?.sede.estado || false
                },
                titulo: {
                    id_cabecera: dataPerson?.titulo.id_cabecera || 3,
                    id_cabecera_detalle: dataPerson?.titulo.id_cabecera_detalle || 0,
                    descripcion: dataPerson?.titulo.descripcion || '',
                    valor: dataPerson?.titulo.valor || ''
                },
                dia_sin_refriguerio: {
                    id_cabecera: dataPerson?.dia_sin_refriguerio?.id_cabecera || 4,
                    id_cabecera_detalle: dataPerson?.dia_sin_refriguerio?.id_cabecera_detalle || 0,
                    descripcion: dataPerson?.dia_sin_refriguerio?.descripcion || '',
                    valor: dataPerson?.dia_sin_refriguerio?.valor || ''
                },
                empresa: {
                    id_empresa: dataPerson?.empresa.id_empresa || 0,
                    nro_documento: dataPerson?.empresa.nro_documento || '',
                    nombres: dataPerson?.empresa.nombres || '',
                    direccion: dataPerson?.empresa.direccion || '',
                    estado: dataPerson?.empresa.estado || false
                },
                usuario: {
                    id_usuario: dataPerson.usuario.id_usuario,
                    username: dataPerson?.usuario.username,
                    rol: {
                        id_rol: dataPerson?.usuario.rol.id_rol || 0,
                        descripcion: dataPerson?.usuario.rol.descripcion || '',
                        valor: dataPerson?.usuario.rol.valor || '',
                        estado: dataPerson?.usuario.rol.estado || false
                    },
                    estado: dataPerson?.usuario.estado || false
                },
                estado: dataPerson?.estado || false
            },
            horario_trabajo_detalle: [
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 8, descripcion: "Lunes", valor: "" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 37, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 48, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 58, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 64, descripcion: "17:00 p.m.", valor: "" },
                    estado: true
                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 9, descripcion: "Martes", valor: "" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 43, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 54, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 65, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 72, descripcion: "17:00 p.m.", valor: "" },
                    estado: true
                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 10, descripcion: "Miércoles", valor: "" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 40, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 48, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 57, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 61, descripcion: "17:00 p.m.", valor: "" },
                    estado: true
                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 11, descripcion: "Jueves", valor: "" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 42, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 53, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 64, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 72, descripcion: "17:00 p.m.", valor: "" },
                    estado: true
                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 12, descripcion: "Viernes", valor: "" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 43, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 55, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 66, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 71, descripcion: "17:00 p.m.", valor: "" },
                    estado: true
                },
                {
                    semana: { id_cabecera: 4, id_cabecera_detalle: 13, descripcion: "Sábado", valor: "" },
                    temprano_inicio: { id_cabecera: 10, id_cabecera_detalle: 45, descripcion: "08:00 a.m.", valor: "" },
                    temprano_final: { id_cabecera: 10, id_cabecera_detalle: 57, descripcion: "11:40 a.m.", valor: "" },
                    tarde_inicio: { id_cabecera: 10, id_cabecera_detalle: 68, descripcion: "15:00 p.m.", valor: "" },
                    tarde_final: { id_cabecera: 10, id_cabecera_detalle: 73, descripcion: "17:00 p.m.", valor: "" },
                    estado: true
                },
            ],
            estado: dataPerson?.estado || false
        },
        validationSchema: Yup.object({
            nombre_horario: Yup.string().required('Requerido'),
            usuario: Yup.object({
                username: Yup.string().required('Requerido')
            }),
            empleado: Yup.object({
                numero: Yup.string().required('Requerido'),
                nombres: Yup.string().required('Requerido'),
                telefono: Yup.string().required('Requerido'),
                correo: Yup.string().email('Correo inválido').required('Requerido')
            }),
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
                console.log(values);

                await addSchelude(values);
                update();
                alert("Creado correctamente!!")
                onClose();
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
        { id_cabecera_detalle: 44, descripcion: "15:20 p.m." },
        { id_cabecera_detalle: 45, descripcion: "15:40 p.m." },
        { id_cabecera_detalle: 46, descripcion: "16:00 p.m." },
        { id_cabecera_detalle: 47, descripcion: "16:20 p.m." },
        { id_cabecera_detalle: 48, descripcion: "16:40 p.m." },
        { id_cabecera_detalle: 49, descripcion: "17:00 p.m." },
        { id_cabecera_detalle: 50, descripcion: "18:20 p.m." },
        { id_cabecera_detalle: 51, descripcion: "18:40 p.m." }

    ];

    const handleSelectChange = (e: any, index: number, field: any, optionsArray: any) => {
        const value = parseInt(e.target.value);
        const option = optionsArray.find((opcion: any) => opcion.id_cabecera_detalle === value);
        formik.setFieldValue(`horario_trabajo_detalle[${index}].${field}`, option);
    };

    return (
        <PopupUpdate>
            <button onClick={onClose}>
                X
            </button>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre Horario</label>
                    <input
                        type="text"
                        name="nombre_horario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre_horario}
                        className="mt-1 p-2 border rounded w-full"
                    />
                    {formik.touched.nombre_horario && formik.errors.nombre_horario ? (
                        <div className="text-red-500">{formik.errors.nombre_horario}</div>
                    ) : null}
                </div>
                <div className="mb-4 ">
                    <label className="block text-gray-700">Horario de Trabajo Detalle</label>
                    <div className='flex gap-4'>
                        {formik.values.horario_trabajo_detalle?.map((detalle, index) => (
                            <div key={index} className="mb-4 p-4 border rounded">
                                <div className="mb-2">
                                    <label className="block text-gray-700">Semana {detalle.semana?.descripcion}</label>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700">Temprano Inicio</label>
                                    <select
                                        name={`horario_trabajo_detalle[${index}].temprano_inicio.id_cabecera_detalle`}
                                        onChange={(e) => handleSelectChange(e, index, 'temprano_inicio', opcionesInicioTemprano)}
                                        onBlur={formik.handleBlur}
                                        value={detalle.temprano_inicio?.id_cabecera_detalle || ''}
                                        className="mt-1 p-2 border rounded w-full"
                                    >
                                        {opcionesInicioTemprano.map((opcion) => (
                                            <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                {opcion.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    {/* {formik.touched.horario_trabajo_detalle?.[index]?.temprano_inicio?.id_cabecera_detalle && formik.errors.horario_trabajo_detalle?.[index]?.temprano_inicio?.id_cabecera_detalle ? (
                                        <div className="text-red-500 text-sm">{formik.errors.horario_trabajo_detalle?.[index]?.temprano_inicio?.id_cabecera_detalle}</div>
                                    ) : null} */}
                                </div>


                                <div className="mb-2">
                                    <label className="block text-gray-700">Temprano Final</label>
                                    <select
                                        name={`horario_trabajo_detalle[${index}].temprano_final.id_cabecera_detalle`}
                                        onChange={(e) => handleSelectChange(e, index, 'temprano_final', opcionesFinalTemprano)}
                                        onBlur={formik.handleBlur}
                                        value={detalle.temprano_final?.id_cabecera_detalle || ''}
                                        className="mt-1 p-2 border rounded w-full"
                                    >
                                        {opcionesFinalTemprano.map((opcion) => (
                                            <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                {opcion.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    {/* {formik.touched.horario_trabajo_detalle?.[index]?.temprano_final?.id_cabecera_detalle && formik.errors.horario_trabajo_detalle?.[index]?.temprano_final?.id_cabecera_detalle ? (
                                        <div className="text-red-500 text-sm">{formik.errors.horario_trabajo_detalle?.[index]?.temprano_final?.id_cabecera_detalle}</div>
                                    ) : null} */}
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700">Tarde Inicio</label>
                                    <select
                                        name={`horario_trabajo_detalle[${index}].tarde_inicio.id_cabecera_detalle`}
                                        onChange={(e) => handleSelectChange(e, index, 'tarde_inicio', opcionesInicioTarde)}
                                        onBlur={formik.handleBlur}
                                        value={detalle.tarde_inicio?.id_cabecera_detalle || ''}
                                        className="mt-1 p-2 border rounded w-full"
                                    >
                                        {opcionesInicioTarde.map((opcion) => (
                                            <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                {opcion.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    {/* {formik.touched.horario_trabajo_detalle?.[index]?.tarde_inicio?.id_cabecera_detalle && formik.errors.horario_trabajo_detalle?.[index]?.tarde_inicio?.id_cabecera_detalle ? (
                                        <div className="text-red-500 text-sm">{formik.errors.horario_trabajo_detalle?.[index]?.tarde_inicio?.id_cabecera_detalle}</div>
                                    ) : null} */}
                                </div>

                                <div className="mb-2">
                                    <label className="block text-gray-700">Tarde Final</label>
                                    <select
                                        name={`horario_trabajo_detalle[${index}].tarde_final.id_cabecera_detalle`}
                                        onChange={(e) => handleSelectChange(e, index, 'tarde_final', opcionesFinalTarde)}
                                        onBlur={formik.handleBlur}
                                        value={detalle.tarde_final?.id_cabecera_detalle || ''}
                                        className="mt-1 p-2 border rounded w-full"
                                    >
                                        {opcionesFinalTarde.map((opcion) => (
                                            <option key={opcion.id_cabecera_detalle} value={opcion.id_cabecera_detalle}>
                                                {opcion.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    {/* {formik.touched.  */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Estado</label>
                    <input
                        type="checkbox"
                        name="estado"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.estado}
                        className="mt-1"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="button" className="mr-2 py-2 px-4 bg-gray-500 text-white rounded" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">{isLoading ? 'Creando...' : 'Crear'}</button>
                </div>
            </form>
        </PopupUpdate>
    )
}
