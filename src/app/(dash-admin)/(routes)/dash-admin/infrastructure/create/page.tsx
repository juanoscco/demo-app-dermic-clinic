"use client"
import React from 'react'
import { useAddInfrastructureMutation } from './store/service';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function InfrastructureCreate() {
    const [addInfrastructure, { data, isLoading, isError, error }] = useAddInfrastructureMutation();
    const formik = useFormik({
        initialValues: {
            nombres: '',
            direccion: '',
            telefono: '',
            empresa: {
                id_empresa: 1,
                nro_documento: '20605571078',
                nombres: 'M & S CONSULTORES EN TECNOLOGIA S.A.C.',
                direccion: 'CIUDAD SOL DE COLLIQUE',
                estado: true,
            },
            estado: true,
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
        onSubmit: (values) => {
            // console.log(values)
            addInfrastructure(values);
        },
    });
    return (
        <React.Fragment>
            <h1 className='text-2xl'>Creacion de infraestructura</h1>
            <div className='mt-4 p-4 bg-white'>
                <form
                    onSubmit={formik.handleSubmit}
                    className='grid grid-cols-1 md:grid-cols-2 gap-5'
                >
                    <div
                        className='border border-gray-300 text-left p-2'
                    >
                        <label>Nombre</label>
                        <input
                            type='text'
                            name='nombres'
                            value={formik.values.nombres}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full py-2 outline-none px-1'
                        />
                        {formik.touched.nombres && formik.errors.nombres ? (
                            <div className='text-red-500 text-sm'>{formik.errors.nombres}</div>
                        ) : null}
                    </div>

                    <div
                        className='border border-gray-300 text-left p-2'
                    >
                        <label>Direccion</label>
                        <input
                            type='text'
                            name='direccion'
                            value={formik.values.direccion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full py-2 outline-none px-1'
                        />
                        {formik.touched.direccion && formik.errors.direccion ? (
                            <div className='text-red-500 text-sm'>{formik.errors.direccion}</div>
                        ) : null}
                    </div>

                    <div
                        className='border border-gray-300 text-left p-2'
                    >
                        <label>Telefono</label>
                        <input
                            type='text'
                            name='telefono'
                            value={formik.values.telefono}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full py-2 outline-none px-1'
                        />
                        {formik.touched.telefono && formik.errors.telefono ? (
                            <div className='text-red-500 text-sm'>{formik.errors.telefono}</div>
                        ) : null}
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


                    <button
                        type='submit'
                        className='mt-4 px-4 py-2 bg-[#82b440] text-white hover:bg-green-700'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando...' : 'Crear Infraestructura'}
                    </button>
                    {/* {data && alert(data.message)} */}
                    {isError && <div className='text-red-500 text-sm mt-2'>Error al crear infraestructura</div>}
                    {data && (
                        <p>{data.message}</p>
                    )}
                </form>
            </div>

        </React.Fragment >
    );
}

