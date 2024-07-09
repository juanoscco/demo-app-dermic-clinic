"use client"
import React, { useEffect } from 'react'
import { PopupUpdate } from "@/components/popup/popup-update/"
import { useUpdatePatientMutation } from "./store/service/patient-update.service";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@/components/popup/popup-alert';
import { GetDniApiHook } from '@/config/hook-dni';
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';

interface Props {
  onClose: any;
  id?: number;
  data?: any;
  update?: any
}
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
};
export function PatientUpdateComponent({ onClose, id, data, update }: Props) {

  const [updatePatient, { data: dataPatient, isLoading: loadingPatient, isError }] = useUpdatePatientMutation();

  const { data: dniData, isLoading: loadingDni, handleClick, setDni, error: errorDni } = GetDniApiHook();



  const { data: dataCivilState } = useGetFindHeadBoardQuery(8)

  const { data: dataStateOld } = useGetFindHeadBoardQuery(9)


  const civilState = dataCivilState?.cabecera?.cabeceras_detalles

  const stateOld = dataStateOld?.cabecera?.cabeceras_detalles

  const formik = useFormik({
    initialValues: {
      id_paciente: id,
      nombres: data?.nombres,
      empresa: {
        id_empresa: data.empresa.id_empresa
      },
      usuario_registro: {
        id_usuario: data.usuario_registro.id_usuario
      },
      tipo_documento_identidad: {
        id_cabecera: data.tipo_documento_identidad.id_cabecera,
        id_cabecera_detalle: data.tipo_documento_identidad.id_cabecera_detalle,
        descripcion: data.tipo_documento_identidad.descripcion || '',
        valor: data.tipo_documento_identidad.valor || ''
      },
      numero_documento_identidad: data?.numero_documento_identidad || '',
      telefono: data.telefono || '',
      nacimiento: formatDate(data.nacimiento),
      estado_civil: {
        id_cabecera: 8,
        id_cabecera_detalle: data.estado_civil.id_cabecera_detalle,
        descripcion: data.estado_civil.descripcion || '',
        valor: data.estado_civil.valor || ''
      },
      ocupacion: data.ocupacion || '',
      email: data.email || '',
      direccion: data.direccion || '',
      distrito: data.distrito || '',
      lugar_nacimiento: data.lugar_nacimiento || '',
      estado_antiguedad: {
        id_cabecera: 9,
        id_cabecera_detalle: data.estado_antiguedad.id_cabecera_detalle,
        descripcion: data.estado_antiguedad.descripcion || '',
        valor: data.estado_antiguedad.valor || ''
      },
      estado: data.estado,
      estado_eliminado: false
    },
    validationSchema: Yup.object({
      nombres: Yup.string().required('Requerido'),
      // tipo_documento_identidad: Yup.object({
      //   descripcion: Yup.string().required('Requerido'),
      // }).required('Requerido'),
      // numero_documento_identidad: Yup.string().required('Requerido'),
      telefono: Yup.string().required('Requerido'),
      // nacimiento: Yup.date().required('Requerido'),
      // estado_civil: Yup.object({
      //   descripcion: Yup.string().required('Requerido'),
      // }).required('Requerido'),
      // ocupacion: Yup.string().required('Requerido'),
      // email: Yup.string().email('Correo electrónico no válido').required('Requerido'),
      // direccion: Yup.string().required('Requerido'),
      // distrito: Yup.string().required('Requerido'),
      // lugar_nacimiento: Yup.string().required('Requerido'),
      // estado_antiguedad: Yup.object({
      //   descripcion: Yup.string().required('Requerido'),
      // }).required('Requerido'),
      // estado: Yup.boolean().required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        await updatePatient({ patientId: values.id_paciente, patientData: values }).unwrap().then(() => (
          update(),
          onClose()
        ));

      } catch (error) {
        console.log('Error al actualizar el paciente:', error);
      }
    }
  });


  useEffect(() => {
    if (dniData && dniData.nombre) {
      formik.setFieldValue('nombres', dniData.nombre);
    }
  }, [dniData, formik.setFieldValue]);




  return (
    <PopupUpdate>
      <div className='flex justify-between py-4'>
        <h1 className='text-2xl mb-3'>Actualizar Paciente</h1>

        <button className='text-2xl' onClick={onClose}>x</button>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className='border border-gray-300 text-left p-2'>
          <label className='text-font-777 text-sm' htmlFor="numero_documento_identidad">DNI  <span className="text-red-500">*</span></label>
          <div className='flex gap-3'>
            <input
              type="text"
              id="numero_documento_identidad"
              name="numero_documento_identidad"
              className='w-full py-2 outline-none px-1'
              onChange={(e) => {
                formik.handleChange(e);
                setDni(e.target.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.numero_documento_identidad}
            />

            <button onClick={handleClick} disabled={loadingDni}
              className='bg-[#82b440] text-white py-2 px-4 rounded-sm'>
              {loadingDni ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          {errorDni && <div className='text-red-400'>Error en DNI</div>}
        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="nombres">Apellidos y Nombres <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            className='w-full py-2 outline-none px-1 capitalize'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombres.toLowerCase()}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="telefono">Teléfono<span className="text-red-500">*</span></label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            className='w-full py-2 outline-none px-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telefono}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="nacimiento">Fecha de Nacimiento <span className="text-red-500">*</span></label>
          <input
            type="date"
            id="nacimiento"
            name="nacimiento"
            className='w-full py-2 outline-none px-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nacimiento}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="estado_civil">Estado Civil</label>
          <select
            id="estado_civil"
            name="estado_civil.id_cabecera_detalle"
            className='w-full py-2 outline-none px-1'
            onChange={(e) => {
              formik.handleChange(e);
              const selectedOption = civilState?.find(
                (estado: any) => estado.id_cabecera_detalle.toString() === e.target.value
              );
              formik.setFieldValue(
                'estado_civil.descripcion',
                selectedOption ? selectedOption.descripcion : ''
              );
            }}
            onBlur={formik.handleBlur}
            value={formik.values.estado_civil.id_cabecera_detalle}
          >

            {civilState?.filter((estado: any) => estado.id_cabecera_detalle !== 43).map((estado: any) => (
              <option key={estado.id_cabecera_detalle} value={estado.id_cabecera_detalle}>
                {estado.descripcion}
              </option>
            ))}


          </select>

        </div>

        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className='w-full py-2 outline-none px-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="tipo_documento_identidad">Ocupacion</label>
          <input
            type="text"
            id="ocupacion"
            name="ocupacion"
            className='w-full py-2 outline-none px-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ocupacion}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className='w-full py-2 outline-none px-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.direccion}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="distrito">Distrito</label>
          <input
            type="text"
            id="distrito"
            name="distrito"
            className='w-full py-2 outline-none px-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.distrito}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="lugar_nacimiento">Lugar de Nacimiento</label>
          <input
            type="text"
            id="lugar_nacimiento"
            name="lugar_nacimiento"
            className='w-full py-2 outline-none px-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lugar_nacimiento}
          />

        </div>
        <div className='border border-gray-300 text-left p-2'>
          <label htmlFor="estado_antiguedad">Estado</label>
          <select
            id="estado_antiguedad"
            name="estado_antiguedad.id_cabecera_detalle"
            className='w-full py-2 outline-none px-1'
            onChange={(e) => {
              formik.handleChange(e);
              const selectedOption = stateOld?.find(
                (estado: any) => estado.id_cabecera_detalle.toString() === e.target.value
              );
              formik.setFieldValue(
                'estado_antiguedad.descripcion',
                selectedOption ? selectedOption.descripcion : ''
              );
            }}
            onBlur={formik.handleBlur}
            value={formik.values.estado_antiguedad.id_cabecera_detalle}
          >

            {stateOld
              ?.map((estado: any) => (
                <option key={estado.id_cabecera_detalle} value={estado.id_cabecera_detalle}>
                  {estado.descripcion}
                </option>
              ))}

          </select>

        </div>

        <button
          className='w-full bg-[#82b440] shadow-xl p-3 rounded-sm text-white'
          type='submit'>{loadingPatient ? 'Actualizando...' : 'Actualizar'}</button>
      </form>
      {isError && <Alert type='error'>Error al guardar cambios</Alert>}

    </PopupUpdate>
  )
}
