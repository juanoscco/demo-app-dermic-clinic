import { PopupUpdate } from '@/components/popup/popup-update'
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateScheduleMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/update/store/service';
import { Schedule } from "../../inteface/"

interface Props {
    idUpdate?: number;
    dataUpdate?: any;
    onClose?: any
    update?: any
}

export default function UpdateScheduleComponent({ idUpdate, dataUpdate, update, onClose }: Props) {
    const [updateSchedule, { isLoading }] = useUpdateScheduleMutation()

    // console.log(dataUpdate)
    const formik = useFormik<Schedule>({
        initialValues: {
            id_horario_trabajo: idUpdate,
            nombre_horario: dataUpdate.nombre_horario,
            usuario: {
                id_usuario: dataUpdate.usuario.id_usuario,
                username: dataUpdate?.usuario.username,
                rol: {
                    id_rol: dataUpdate?.usuario.rol.id_rol,
                    descripcion: dataUpdate?.usuario.rol.descripcion,
                    valor: dataUpdate?.usuario.rol.valor,
                    estado: dataUpdate?.usuario.rol.estado
                },
                estado: dataUpdate?.usuario.estado
            },
            empleado: {
                id_empleado: dataUpdate?.empleado.id_empleado,
                tipo_documento: {
                    id_cabecera: dataUpdate?.empleado.tipo_documento.id_cabecera,
                    id_cabecera_detalle: dataUpdate?.empleado.tipo_documento.id_cabecera_detalle,
                    descripcion: dataUpdate?.empleado.tipo_documento.descripcion,
                    valor: dataUpdate?.empleado.tipo_documento.valor
                },
                numero: dataUpdate?.empleado.numero,
                nombres: dataUpdate?.empleado.nombres,
                telefono: dataUpdate?.empleado.telefono,
                correo: dataUpdate?.empleado.correo,
                sede: {
                    id_sede: dataUpdate?.empleado.sede.id_sede,
                    codigo: dataUpdate?.empleado.sede.codigo,
                    nombres: dataUpdate?.empleado.sede.nombres,
                    direccion: dataUpdate?.empleado.sede.direccion,
                    telefono: dataUpdate?.empleado.sede.telefono,
                    empresa: {
                        id_empresa: dataUpdate?.empleado.sede.empresa.id_empresa,
                        nro_documento: dataUpdate?.empleado.sede.empresa.nro_documento,
                        nombres: dataUpdate?.empleado.sede.empresa.nombres,
                        direccion: dataUpdate?.empleado.sede.empresa.direccion,
                        estado: dataUpdate?.empleado.sede.empresa.estado
                    },
                    estado: dataUpdate?.empleado.sede.estado
                },
                titulo: {
                    id_cabecera: dataUpdate?.empleado.titulo.id_cabecera,
                    id_cabecera_detalle: dataUpdate?.empleado.titulo.id_cabecera_detalle,
                    descripcion: dataUpdate?.empleado.titulo.descripcion,
                    valor: dataUpdate?.empleado.titulo.valor
                },
                dia_sin_refriguerio: {
                    id_cabecera: dataUpdate?.empleado.dia_sin_refriguerio?.id_cabecera,
                    id_cabecera_detalle: dataUpdate?.empleado.dia_sin_refriguerio?.id_cabecera_detalle,
                    descripcion: dataUpdate?.empleado.dia_sin_refriguerio?.descripcion,
                    valor: dataUpdate?.empleado.dia_sin_refriguerio?.valor
                },
                empresa: {
                    id_empresa: dataUpdate?.empleado.empresa.id_empresa,
                    nro_documento: dataUpdate?.empleado.empresa.nro_documento,
                    nombres: dataUpdate?.empleado.empresa.nombres,
                    direccion: dataUpdate?.empleado.empresa.direccion,
                    estado: dataUpdate?.empleado.empresa.estado
                },
                usuario: {
                    id_usuario: dataUpdate.empleado.usuario.id_usuario,
                    username: dataUpdate?.empleado.usuario.username,
                    rol: {
                        id_rol: dataUpdate?.empleado.usuario.rol.id_rol,
                        descripcion: dataUpdate?.empleado.usuario.rol.descripcion,
                        valor: dataUpdate?.empleado.usuario.rol.valor,
                        estado: dataUpdate?.empleado.usuario.rol.estado
                    },
                    estado: dataUpdate?.empleado.usuario.estado
                },
                estado: dataUpdate?.empleado.estado
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
            estado: dataUpdate?.estado || false
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

                await updateSchedule({ scheduleId: values.id_horario_trabajo, scheduleData: values }).unwrap();
                onClose();
                update();

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
            <button onClick={onClose} className='flex justify-end w-full'>x</button>
            <form onSubmit={formik.handleSubmit} className='overflow-y-auto'>
                <div className="mb-4 flex">
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
                <div className=" ">
                    {/* <label className="block text-gray-700">Horario de Trabajo Detalle</label> */}
                    <div className='flex flex-col gap-1'>
                        {formik.values.horario_trabajo_detalle?.map((detalle, index) => (
                            <div key={index} className='flex flex-col'>
                                <div className="mb-4 p-2 border rounded flex gap-3">
                                    <div className="mb-2">
                                        <label className="block text-gray-700">{detalle.semana?.descripcion}</label>
                                    </div>

                                    <div className='flex gap-3'>
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border border-gray-300 text-left p-2'>
                    <label className='block text-sm font-medium'>Estado</label>
                    <select
                        name='estado'
                        value={formik.values.estado ? 'true' : 'false'}
                        onChange={(e) => formik.setFieldValue('estado', e.target.value === 'true')}
                        className='w-full py-2 outline-none px-1'
                    >
                        <option value='true'>Habilitado</option>
                        <option value='false'>Deshabilitado</option>
                    </select>
                    {formik.touched.estado && formik.errors.estado ? (
                        <div className='text-red-500 text-sm'>{formik.errors.estado}</div>
                    ) : null}
                </div>
                <div className="flex justify-end mt-3">
                    <button type="button" className="mr-2 py-2 px-4 bg-gray-500 text-white rounded" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">{isLoading ? 'Editando...' : 'Editar'}</button>
                </div>
            </form>
        </PopupUpdate>
    )
}
