"use client";
import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update'
import { useInfrastructureRoomUpdateMutation } from "@/app/(dashboard)/store"

import { InfraRoom } from "./interface";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    id?: number;
    dataUpdate?: any;
    onClose?: any;
    update?: any;
}
const validationSchema = Yup.object({
    sede: Yup.object({
        id_sede: Yup.number().required('ID de sede es requerido'),
    }).required(),
    nombres: Yup.string().required('Nombre es requerido'),
    piso: Yup.number()
        .typeError('Piso debe ser un número')
        .required('Piso es requerido'),
    estado: Yup.boolean().required('Estado es requerido'),
});

export default function UpdateInfraRoomsComponent({ id, dataUpdate, onClose, update }: Props) {
    // console.log(dataUpdate)
    const [updateRoom, { isLoading }] = useInfrastructureRoomUpdateMutation()
    const formik = useFormik<InfraRoom>({
        initialValues: {
            sede: {
                id_sede: dataUpdate?.sede.id_sede,
            },
            usuario_registro: {
                id_usuario: 1,
            },
            empresa: {
                id_empresa: dataUpdate?.empresa.id_empresa,
            },
            nombres: dataUpdate?.nombres,
            piso: dataUpdate?.piso,
            estado: dataUpdate?.estado,
            id_sala_tratamiento: dataUpdate?.id_sala_tratamiento,
            estado_eliminado: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await updateRoom({ infrastructureRoomId: values.id_sala_tratamiento, infrastructureRoomData: values }).unwrap();
                update();
                alert("Actualizado correctamente")

                onClose();
            } catch (error) {
                console.error('Error updating infrastructure room:', error);
            }
        },
    });

    return (
        <PopupUpdate>
            <button className='flex justify-end w-full text-2xl' onClick={onClose}>x</button>
            <form
                className='grid grid-cols-1 md:grid-cols-2 gap-5'
                onSubmit={formik.handleSubmit}>
                <div className='border border-gray-300 text-left p-2'>
                    <label>Nombre de la sala</label>
                    <input
                        type="text"
                        name="nombres"
                        value={formik.values.nombres}
                        onChange={formik.handleChange}
                        className='w-full py-2 outline-none px-1'

                    />
                    {formik.errors.nombres && formik.touched.nombres ? (
                        <div>{formik.errors.nombres}</div>
                    ) : null}
                </div>

                <div className='border border-gray-300 text-left p-2'>
                    <label>Piso</label>
                    <input
                        type="text"
                        name="piso"
                        value={formik.values.piso}
                        className='w-full py-2 outline-none px-1'

                        onChange={(e) => {
                            const value = e.target.value;
                            // Intenta convertir el valor a número
                            const parsedValue = parseInt(value, 10);
                            // Si es un número válido, actualiza el valor en Formik
                            formik.setFieldValue("piso", isNaN(parsedValue) ? value : parsedValue);
                        }}
                    />
                    {formik.errors.piso && formik.touched.piso ? (
                        <div>{formik.errors.piso}</div>
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
                    className='px-4 py-2 bg-[#82b440] text-white hover:bg-green-700'
                    disabled={isLoading}
                >
                    {isLoading ? 'Actualizando...' : 'Actualizar Cuarto'}
                </button>
            </form>
        </PopupUpdate>
    )
}
