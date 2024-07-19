import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update/';
import { Procedure } from "../../../../create/interface"

import { useUpdateProcedureMutation } from "@/app/(dashboard)/store"
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    onClose: any;
    id?: number;
    data?: any;
    update?: any
}

export function UpdateProceduresComponents({ onClose, id, data, update }: Props) {

    const [updateProcedure, { isLoading }] = useUpdateProcedureMutation();

    const { data: dataDurationOptions } = useGetFindHeadBoardQuery(5);
    const durationOptions = dataDurationOptions?.cabecera?.cabeceras_detalles;

    const { data: dataTypeProceduresOptions } = useGetFindHeadBoardQuery(6);
    const typeProceduresOptions = dataTypeProceduresOptions?.cabecera?.cabeceras_detalles;

    const { data: dataSubtypeProceduresOptions } = useGetFindHeadBoardQuery(7);
    const subtypeProceduresOptions = dataSubtypeProceduresOptions?.cabecera?.cabeceras_detalles;

    const formik = useFormik<Procedure>({
        initialValues: {
            id_procedimiento: id,
            empresa: {
                id_empresa: data.empresa.id_empresa
            },
            usuario_registro: {
                id_usuario: data.usuario_registro.id_usuario
            },
            nombres: data.nombres || "",
            duracion: {
                id_cabecera: 5,
                id_cabecera_detalle: data.duracion.id_cabecera_detalle || 17,
                descripcion: data.duracion.descripcion || "20 minutos",
                valor: data.duracion.valor || ""
            },
            anestesia: true,
            tipo_procedimiento: {
                id_cabecera: 6,
                id_cabecera_detalle: data.tipo_procedimiento.id_cabecera_detalle || 27,
                descripcion: data.tipo_procedimiento.descripcion || "Piel",
                valor: data.tipo_procedimiento.valor || ""
            },
            subtipo_procedimiento: {
                id_cabecera: 7,
                id_cabecera_detalle: data.subtipo_procedimiento.id_cabecera_detalle || 30,
                descripcion: data.subtipo_procedimiento.descripcion || "Privado",
                valor: data.subtipo_procedimiento.valor || ""
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
        onSubmit: async (values) => {
            try {
                await updateProcedure({ procedureId: values.id_procedimiento, procedureData: values }).unwrap();
                alert('Acualizacion exitosa!')
                update();
                onClose();

            } catch (error) {
                alert(error)
            }
        }
    })


    const handleDuracionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        const selectedOption = durationOptions.find((option: any) => option.id_cabecera_detalle === selectedId);

        if (selectedOption) {
            formik.setFieldValue('duracion.id_cabecera_detalle', selectedId);
            formik.setFieldValue('duracion.descripcion', selectedOption.descripcion);
        }
    };
    const anestesiaOptions = [
        { value: 'true', label: "Sí" },
        { value: 'false', label: "No" },
    ];

    // const typeProceduresOptions = [
    //     { id: 27, descripcion: 'Piel' },
    //     { id: 28, descripcion: 'Otros' },
    // ];

    // const subtypeProceduresOptions = [
    //     { id: 29, descripcion: 'Público' },
    //     { id: 30, descripcion: 'Privado' },
    // ];

    const handleTypeProceduresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = typeProceduresOptions.find((option: any) => option.id_cabecera_detalle === parseInt(e.target.value));
        formik.setFieldValue('tipo_procedimiento.id_cabecera_detalle', selectedOption?.id_cabecera_detalle);
        formik.setFieldValue('tipo_procedimiento.descripcion', selectedOption?.descripcion);
    };

    const handleSubtypeProceduresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = subtypeProceduresOptions.find((option: any) => option.id_cabecera_detalle === parseInt(e.target.value));
        formik.setFieldValue('subtipo_procedimiento.id_cabecera_detalle', selectedOption?.id_cabecera_detalle);
        formik.setFieldValue('subtipo_procedimiento.descripcion', selectedOption?.descripcion);
    };


    return (
        <PopupUpdate>
            <button className='flex justify-end w-full text-2xl' onClick={onClose}>x</button>
            <h1 className='font-bold text-2xl mb-4'>Actualizar Datos</h1>
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
                        {durationOptions.map((option: any) => (
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
                        {typeProceduresOptions?.map((option: any) => (
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
                        {subtypeProceduresOptions?.map((option: any) => (
                            <option key={option.id_cabecera_detalle} value={option.id_cabecera_detalle}>
                                {option.descripcion}
                            </option>
                        ))}
                    </select>
                    {formik.errors.subtipo_procedimiento?.descripcion && formik.touched.subtipo_procedimiento?.descripcion ? (
                        <div>{formik.errors.subtipo_procedimiento.descripcion}</div>
                    ) : null}
                </div>
                <div className="border border-gray-300 text-left p-2">
                    <label className='text-font-777 text-sm'>Estado <span className="text-red-500">*</span></label>
                    <select
                        name='estado'
                        value={formik.values.estado ? 'true' : 'false'}
                        onChange={(e) => formik.setFieldValue('estado', e.target.value === 'true')}
                        className='w-full py-2 outline-none px-1'
                    >
                        {/* <option value=""></option> */}
                        <option value="true">Habilitado</option>
                        <option value="false">Desabilitado</option>
                    </select>
                </div>
                <button className='bg-[#82b440] p-2 text-white' type='submit'>{isLoading ? 'Editando..' : 'Actualizar'}</button>
            </form>
        </PopupUpdate>
    )
}
