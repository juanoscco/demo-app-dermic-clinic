"use client"
import React from 'react'
import { useAddProcedureMutation } from './store/service'
import { Procedure } from "./interface"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { decodeToken } from '@/app/(dash-admin)/utils';
import { useRouter } from 'next/navigation';
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';

export default function ProceduresCreate() {
    const [addProcedure, { data, isLoading, isError }] = useAddProcedureMutation();

    const { data: dataDurationOptions } = useGetFindHeadBoardQuery(5);
    const durationOptions = dataDurationOptions?.cabecera?.cabeceras_detalles;

    const { data: dataTypeProceduresOptions } = useGetFindHeadBoardQuery(6);
    const typeProceduresOptions = dataTypeProceduresOptions?.cabecera?.cabeceras_detalles;

    const { data: dataSubtypeProceduresOptions } = useGetFindHeadBoardQuery(7);
    const subtypeProceduresOptions = dataSubtypeProceduresOptions?.cabecera?.cabeceras_detalles;

    const handleDuracionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        const selectedOption = durationOptions.find((option:any) => option.id_cabecera_detalle === selectedId);

        if (selectedOption) {
            formik.setFieldValue('duracion.id_cabecera_detalle', selectedId);
            formik.setFieldValue('duracion.descripcion', selectedOption.descripcion);
        }
    };
    const anestesiaOptions = [
        { value: 'true', label: "Sí" },
        { value: 'false', label: "No" },
    ];

    const handleTypeProceduresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = typeProceduresOptions.find((option:any) => option.id_cabecera_detalle === parseInt(e.target.value));
        formik.setFieldValue('tipo_procedimiento.id_cabecera_detalle', selectedOption?.id_cabecera_detalle);
        formik.setFieldValue('tipo_procedimiento.descripcion', selectedOption?.descripcion);
    };

    const handleSubtypeProceduresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = subtypeProceduresOptions.find((option:any) => option.id_cabecera_detalle === parseInt(e.target.value));
        formik.setFieldValue('subtipo_procedimiento.id_cabecera_detalle', selectedOption?.id_cabecera_detalle);
        formik.setFieldValue('subtipo_procedimiento.descripcion', selectedOption?.descripcion);
    };

    const decoded = decodeToken({});

    const router = useRouter();

    const formik = useFormik<Procedure>({
        initialValues: {
            nombres: "",
            duracion: {
                id_cabecera: 5,
                id_cabecera_detalle: 18,
                descripcion: "--Seleccione--",
                valor: ""
            },
            empresa: {
                id_empresa: decoded?.id_empresa
            },
            usuario_registro: {
                id_usuario: decoded?.id_usuario
            },
            anestesia: true,
            tipo_procedimiento: {
                id_cabecera: 6,
                id_cabecera_detalle: 31,
                descripcion: "--Seleccione--",
                valor: ""
            },
            subtipo_procedimiento: {
                id_cabecera: 7,
                id_cabecera_detalle: 35,
                descripcion: "--Seleccione--",
                valor: ""
            },
            estado: true,
            estado_eliminado: false
        },
        validationSchema: Yup.object({
            nombres: Yup.string().required('Requerido'),
            duracion: Yup.object({
                id_cabecera: Yup.number().required('Requerido'),
                id_cabecera_detalle: Yup.number().required('Requerido'),
                descripcion: Yup.string().required('Requerido'),
                valor: Yup.string().optional()
            }),
            anestesia: Yup.boolean().required('Requerido'),
            tipo_procedimiento: Yup.object({
                id_cabecera: Yup.number().required('Requerido'),
                id_cabecera_detalle: Yup.number().required('Requerido'),
                descripcion: Yup.string().required('Requerido'),
                valor: Yup.string().optional()
            }),
            subtipo_procedimiento: Yup.object({
                id_cabecera: Yup.number().required('Requerido'),
                id_cabecera_detalle: Yup.number().required('Requerido'),
                descripcion: Yup.string().required('Requerido'),
                valor: Yup.string().optional()
            }),
            estado: Yup.boolean().required('Requerido')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                addProcedure(values)
                // alert("Procedimiento creado satisfactoriamente!")
                resetForm();
                router.push('./list')
            } catch (error) {
                alert(error)
            }
        }
    })

    return (
        <React.Fragment>
            <h1 className='text-2xl'>Crear procedimiento</h1>
            <section className='mt-4 p-4 bg-white'>
                <form className="grid grid-cols-1 md:grid-cols-2 rounded-sm gap-5" onSubmit={formik.handleSubmit}>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Nombre <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className='w-full py-2 outline-none px-1'
                            name="nombres"
                            value={formik.values.nombres}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.nombres && formik.touched.nombres ? (
                            <div>{formik.errors.nombres}</div>
                        ) : null}
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Duracion <span className="text-red-500">*</span></label>
                        {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
                        <select
                            className='w-full py-2 outline-none px-1'
                            name="duracion.id_cabecera_detalle"
                            value={formik.values.duracion.id_cabecera_detalle}
                            onChange={handleDuracionChange}
                        >
                            {durationOptions?.map((option:any) => (
                                <option key={option.id_cabecera_detalle} value={option.id_cabecera_detalle}>
                                    {option.descripcion}
                                </option>
                            ))}
                        </select>
                        {formik.errors.duracion?.descripcion && formik.touched.duracion?.descripcion ? (
                            <div>{formik.errors.duracion.descripcion}</div>
                        ) : null}
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Anestecia <span className="text-red-500">*</span></label>
                        {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
                        <select
                            className='w-full py-2 outline-none px-1'
                            name="anestesia"
                            onChange={(event) => formik.setFieldValue('anestesia', event.target.value === 'true')}
                            value={formik.values.anestesia.toString()}

                        >
                            {anestesiaOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {formik.errors.anestesia && formik.touched.anestesia ? (
                            <div>{formik.errors.anestesia}</div>
                        ) : null}
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Tipo <span className="text-red-500">*</span></label>
                        <select
                            className='w-full py-2 outline-none px-1'
                            name="tipo_procedimiento.id_cabecera_detalle"
                            value={formik.values.tipo_procedimiento.id_cabecera_detalle}
                            onChange={handleTypeProceduresChange}
                        >
                            {typeProceduresOptions?.map((option:any) => (
                                <option key={option.id_cabecera_detalle} value={option.id_cabecera_detalle}>
                                    {option.descripcion}
                                </option>
                            ))}
                        </select>
                        {formik.errors.tipo_procedimiento?.descripcion && formik.touched.tipo_procedimiento?.descripcion ? (
                            <div>{formik.errors.tipo_procedimiento.descripcion}</div>
                        ) : null}
                    </div>

                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Subtipo <span className="text-red-500">*</span></label>
                        <select
                            className='w-full py-2 outline-none px-1'
                            name="subtipo_procedimiento.id_cabecera_detalle"
                            value={formik.values.subtipo_procedimiento.id_cabecera_detalle}
                            onChange={handleSubtypeProceduresChange}
                        >
                            {subtypeProceduresOptions?.map((option:any) => (
                                <option key={option.id_cabecera_detalle} value={option.id_cabecera_detalle}>
                                    {option.descripcion}
                                </option>
                            ))}
                        </select>
                        {formik.errors.subtipo_procedimiento?.descripcion && formik.touched.subtipo_procedimiento?.descripcion ? (
                            <div>{formik.errors.subtipo_procedimiento.descripcion}</div>
                        ) : null}
                    </div>
                    {/* <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Estado <span className="text-red-500">*</span></label>
                        <select
                            name='estado'
                            value={formik.values.estado ? 'true' : 'false'}
                            onChange={(e) => formik.setFieldValue('estado', e.target.value === 'true')}
                            className='w-full py-2 outline-none px-1'
                        >
                            <option value="true">Habilitado</option>
                            <option value="false">Desabilitado</option>
                        </select>
                    </div> */}
                    <button className='bg-[#82b440] p-2 text-white' type='submit'>{isLoading ? 'Creando...' : 'Crear'}</button>
                </form>
            </section>
        </React.Fragment>
    )
}
