"use client"
import { PopupUpdate } from '@/components/popup/popup-update';
import React from 'react'
import { useAddInfrastructureRoomMutation } from './store/service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InfraRoom } from "./interface/"

interface Props {
  id?: number;
  dataInfra: any;
  update?: any;
  onClose?: any;
}

const validationSchema = Yup.object({
  sede: Yup.object({
    id_sede: Yup.number().required('ID de sede es requerido'),
    nombres: Yup.string().required('Nombre de la sede es requerido'),
    direccion: Yup.string().required('Dirección de la sede es requerida'),
    telefono: Yup.string().required('Teléfono de la sede es requerido'),
    empresa: Yup.object({
      id_empresa: Yup.number().required('ID de empresa es requerido'),
      nro_documento: Yup.string().required('Número de documento es requerido'),
      nombres: Yup.string().required('Nombre de la empresa es requerido'),
      direccion: Yup.string().required('Dirección de la empresa es requerida'),
      estado: Yup.boolean().required('Estado de la empresa es requerido'),
    }).required(),
    estado: Yup.boolean().required('Estado de la sede es requerido'),
  }).required(),
  nombres: Yup.string().required('Nombre es requerido'),
  piso: Yup.number()
    .typeError('Piso debe ser un número')
    .required('Piso es requerido'),
  estado: Yup.boolean().required('Estado es requerido'),
});


export default function CreateInfraRoomComponent({ id, dataInfra, update, onClose }: Props) {

  const [addRoom, { data, isLoading, isError }] = useAddInfrastructureRoomMutation()
  const formik = useFormik<InfraRoom>({
    initialValues: {
      sede: {
        id_sede: id || 1,
        nombres: dataInfra?.nombres || '',
        direccion: dataInfra?.direccion || '',
        telefono: dataInfra?.telefono || '',
        empresa: {
          id_empresa: dataInfra?.empresa?.id_empresa || '',
          nro_documento: dataInfra?.empresa?.nro_documento || '',
          nombres: dataInfra?.empresa?.nombres || '',
          direccion: dataInfra?.empresa?.direccion || '',
          estado: dataInfra?.empresa?.estado || true,
        },
        estado: dataInfra?.estado || true,
      },
      nombres: '',
      piso: 1,
      estado: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addRoom(values);
        update();
        alert("Creado correctamente")
        onClose();
      } catch (error) {
        console.error('Error adding infrastructure room:', error);
      }
    },
  });
  return (
    <PopupUpdate>
      <button className='flex justify-end w-full text-2xl' onClick={onClose}>x</button>
      <h1 className='text-2xl mb-5'>Creacion de cuarto</h1>
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
          {isLoading ? 'Creando...' : 'Crear Cuarto'}
        </button>
      </form>
    </PopupUpdate>
  )
}
