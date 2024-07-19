"use client"
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@/components/popup/popup-alert';
import { useRouter } from 'next/navigation';


import { useAddInfrastructureMutation } from "@/app/(dashboard)/store"


export default function InfrastructureCreate() {

    const [addInfrastructure, { data, isLoading, isError }] = useAddInfrastructureMutation();

    const router = useRouter();



    const formik = useFormik({
        initialValues: {
            nombres: '',
            direccion: '',
            telefono: '',
            empresa: {
                id_empresa: 1,
            },
            estado: true,
            estado_eliminado: false
        },
        validationSchema: Yup.object({
            nombres: Yup.string().required('Requerido'),
            empresa: Yup.object({
                id_empresa: Yup.number().required('Requerido'),
            }),
            // estado: Yup.boolean().required('Requerido'),
        }),
        onSubmit: async (values, { resetForm }) => {
            await addInfrastructure(values);
            resetForm();
            router.push('./list')
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

                    </div>


                    <button
                        type='submit'
                        className=' bg-[#82b440] text-white hover:bg-green-700 text-xl '
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando...' : 'Crear Infraestructura'}
                    </button>
                    {/* {data && alert(data.message)} */}
                    {isError && <Alert type='error'>Error al crear infraestructura</Alert>}
                    {data && (
                        <Alert type='success'>{data.message}</Alert>
                    )}
                </form>
            </div>

        </React.Fragment >
    );
}

