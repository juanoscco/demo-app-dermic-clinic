"use client";
import React from 'react';
import { PopupUpdate } from "@/components/popup/popup-update/"
import { useInfrastructureUpdateMutation } from './store/service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Headquarters, Props } from "./interface"

export default function InfraUpdateComponent({ onClose, id, data, update }: Props) {

    const [updateInfra, { isLoading, error }] = useInfrastructureUpdateMutation();

    const formik = useFormik<Headquarters>({
        initialValues: {
            id_sede: id,
            nombres: data.nombres,
            codigo: data.codigo,
            direccion: data.direccion,
            telefono: data.telefono,
            empresa: {
                id_empresa: data.empresa.id_empresa,
                nro_documento: data.empresa.nro_documento,
                nombres: data.empresa.nombres,
                direccion: data.empresa.direccion,
                estado: data.empresa.estado,
            },
            estado: data.estado,
        },
        validationSchema: Yup.object({
            nombres: Yup.string().required('Requerido'),
            direccion: Yup.string().required('Requerido'),
            telefono: Yup.string().required('Requerido'),
            empresa: Yup.object({
                id_empresa: Yup.number().required('Requerido'),
                nro_documento: Yup.string().required('Requerido'),
                nombres: Yup.string().required('Requerido'),
                direccion: Yup.string().required('Requerido'),
                estado: Yup.boolean().required('Requerido'),
            }),
            estado: Yup.boolean().required('Requerido'),
        }),
        onSubmit: async (values) => {
            await updateInfra({ infrastructureId: values.id_sede, infrastructureData: values })
            update();
            onClose();
        },
    });
    return (
        <PopupUpdate>
            <button className='flex justify-end w-full text-2xl' onClick={onClose}>x</button>
            <h1 className='text-2xl mb-4'>Actualizar Infraestructura</h1>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4">
                <div className='border border-gray-300 text-left p-2'>
                    <label className='block text-sm font-medium'>Nombres</label>
                    <input
                        type='text'
                        name='nombres'
                        value={formik.values.nombres}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='mt-1 block w-full outline-none'
                    />
                    {formik.touched.nombres && formik.errors.nombres ? (
                        <div className='text-red-500 text-sm'>{formik.errors.nombres}</div>
                    ) : null}
                </div>

                <div className='border border-gray-300 text-left p-2'>
                    <label className='block text-sm font-medium'>Direccion</label>
                    <input
                        type='text'
                        name='direccion'
                        value={formik.values.direccion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='mt-1 block w-full outline-none'
                    />
                    {formik.touched.direccion && formik.errors.direccion ? (
                        <div className='text-red-500 text-sm'>{formik.errors.direccion}</div>
                    ) : null}
                </div>

                <div className='border border-gray-300 text-left p-2'>
                    <label className='block text-sm font-medium'>Telefono</label>
                    <input
                        type='text'
                        name='telefono'
                        value={formik.values.telefono}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='mt-1 block w-full outline-none'
                    />
                    {formik.touched.telefono && formik.errors.telefono ? (
                        <div className='text-red-500 text-sm'>{formik.errors.telefono}</div>
                    ) : null}
                </div>

                {/* <div>
                    <label className='block text-sm font-medium'>Empresa</label>
                    <div className='space-y-2'>
                        <input
                            type='text'
                            name='empresa.nro_documento'
                            value={formik.values.empresa.nro_documento}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                        {formik.touched.empresa?.nro_documento && formik.errors.empresa?.nro_documento ? (
                            <div className='text-red-500 text-sm'>{formik.errors.empresa.nro_documento}</div>
                        ) : null}
                        <input
                            type='text'
                            name='empresa.nombres'
                            value={formik.values.empresa.nombres}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                        {formik.touched.empresa?.nombres && formik.errors.empresa?.nombres ? (
                            <div className='text-red-500 text-sm'>{formik.errors.empresa.nombres}</div>
                        ) : null}
                        <input
                            type='text'
                            name='empresa.direccion'
                            value={formik.values.empresa.direccion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                        {formik.touched.empresa?.direccion && formik.errors.empresa?.direccion ? (
                            <div className='text-red-500 text-sm'>{formik.errors.empresa.direccion}</div>
                        ) : null}
                    </div>
                </div> */}

                <div className='border border-gray-300 text-left p-2'>
                    <label className='block text-sm font-medium'>Estado</label>
                    <select
                        name='estado'
                        value={formik.values.estado ? 'true' : 'false'}
                        onChange={(e) => formik.setFieldValue('estado', e.target.value === 'true')}
                        className='mt-1 block w-full outline-none'
                    >
                        <option value='true'>Habilitado</option>
                        <option value='false'>Deshabilitado</option>
                    </select>
                    {formik.touched.estado && formik.errors.estado ? (
                        <div className='text-red-500 text-sm'>{formik.errors.estado}</div>
                    ) : null}
                </div>

                <button
                    type='submit'
                    className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700'
                    disabled={isLoading}
                >
                    {isLoading ? 'Actualizando...' : 'Actualizar'}
                </button>

                {error && <div className='text-red-500 text-sm mt-2'>{'Error al actualizar infraestructura'}</div>}
            </form>
        </PopupUpdate>
    )
}
