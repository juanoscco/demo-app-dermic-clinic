"use client"
import React, { useState, useEffect } from 'react'

import { PopupUpdate } from '@/components/popup/popup-update/';
import { Employee } from '@/app/(dashboard)/(routes)/dash-admin/persons/create/interface';
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';
import { GetDniApiHook } from '@/config/hook-dni';

import { useGetInfrastructureQuery, useUpdateEmployeeMutation } from "@/app/(dashboard)/store"

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  onClose: any;
  id?: number;
  data?: any;
  update?: any
}


export function EmployeeUpdateComponent({ onClose, id, data, update }: Props) {
  const [selectedSede, setSelectedSede] = useState(null);

  const [updateEmployee, { isLoading: loadingEmployee, isError }] = useUpdateEmployeeMutation();

  const { data: dniData, isLoading: loadingDni, handleClick, setDni, error: errorDni } = GetDniApiHook();
  const { data: dataInfra, error: errorInfra, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 10, page: 0 })


  const { data: dataTitle } = useGetFindHeadBoardQuery(3)

  const { data: dataBreak } = useGetFindHeadBoardQuery(4)

  const formik = useFormik<Employee>({
    initialValues: {
      tipo_documento: {
        id_cabecera: 2,
        id_cabecera_detalle: 5,
        descripcion: 'DNI',
        valor: '',
      },
      id_empleado: id,
      numero: data.numero || '',
      nombres: data.nombres || '',
      telefono: data.telefono || '',
      correo: data.correo || '',
      sede: {
        id_sede: data.sede?.id_sede || 2,
        codigo: data.sede?.codigo || '',
        nombres: data.sede?.nombres || '',
        direccion: data.sede?.direccion || '',
        telefono: data.sede?.telefono || '',
        empresa: {
          id_empresa: 1,
          nro_documento: '20605571078',
          nombres: 'M & S CONSULTORES EN TECNOLOGIA S.A.C.',
          direccion: 'LT. 7 DPTO. 802 MZ. F ---- CIUDAD SOL DE COLLIQUE',
          estado: true,
        },
        estado: true,
      },
      titulo: {
        id_cabecera: data.titulo?.id_cabecera || 3,
        id_cabecera_detalle: data.titulo?.id_cabecera_detalle || 8,
        descripcion: data.titulo?.descripcion || '',
        valor: '',
      },
      dia_sin_refriguerio: {
        id_cabecera: data.dia_sin_refriguerio?.id_cabecera || 4,
        id_cabecera_detalle: data.dia_sin_refriguerio?.id_cabecera_detalle || 11,
        descripcion: data.dia_sin_refriguerio?.descripcion || '',
        valor: '',
      },
      empresa: {
        id_empresa: 1,
        nro_documento: '20605571078',
        nombres: 'M & S CONSULTORES EN TECNOLOGIA S.A.C.',
        direccion: 'LT. 7 DPTO. 802 MZ. F ---- CIUDAD SOL DE COLLIQUE',
        estado: true,
      },
      usuario: {
        id_usuario: data.usuario?.id_usuario,
        username: data.usuario?.username || '',
        password: data.usuario?.password || '',
        rol: {
          id_rol: data.usuario?.rol?.id_rol || 1,
          descripcion: data.usuario?.rol?.descripcion || 'ADMINISTRATOR',
          valor: data.usuario?.rol?.valor || 'ADMINISTRADOR',
          estado: true,
        },
        estado: true,
        estado_eliminado: false

      },
      estado: true,
      estado_eliminado: false

    },
    validationSchema: Yup.object({
      // numero: Yup.string().required('Requerido'),
      nombres: Yup.string().required('Requerido'),
      // telefono: Yup.string().required('Requerido'),
      // correo: Yup.string().email('Email inválido').required('Requerido'),
      // dia_sin_refriguerio: Yup.object({
      //   id_cabecera_detalle: Yup.number().required('Requerido'),
      //   descripcion: Yup.string().required('Requerido'),
      // }),
      // titulo: Yup.object({
      //   id_cabecera_detalle: Yup.number().required('Requerido'),
      //   descripcion: Yup.string().required('Requerido'),
      // }),
      // usuario: Yup.object({
      //   username: Yup.string().required('Requerido'),
      //   password: Yup.string().required('Requerido'),
      //   rol: Yup.object({
      //     id_rol: Yup.string().required('Requerido'),
      //   })
      // }),
      // estado: Yup.boolean().required('Requerido'),
    }),
    onSubmit: async (values) => {
      // console.log(values)
      try {
        console.log({ employeeId: values.id_empleado, employeeData: values });
        await updateEmployee({ employeeId: values.id_empleado, employeeData: values }).unwrap();
        update();
        onClose();
      } catch (error) {
        console.log('Error al actualizar el paciente:', error);
      }
    },
  });

  useEffect(() => {
    if (dniData && dniData.nombre) {
      formik.setFieldValue('nombres', dniData.nombre);
    }
  }, [dniData, formik.setFieldValue]);

  return (
    <PopupUpdate>
      <button className='flex justify-end w-full text-2xl' onClick={onClose}>x</button>
      <h1 className='mb-5 text-2xl font-bold'>Actualizar empleado</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>DNI <span className="text-red-500">*</span></label>
          <div className='flex gap-3'>
            <input
              type='text'
              id='numero'
              name='numero'
              value={formik.values.numero}
              onChange={(e) => {
                formik.handleChange(e);
                setDni(e.target.value);
              }}
              onBlur={formik.handleBlur}
              className='w-full py-2 outline-none px-1' />

            <button onClick={handleClick} disabled={loadingDni}
              className='bg-[#82b440] text-white py-2 px-4 rounded-sm'>
              {loadingDni ? 'Buscando...' : errorDni ? 'Error en la busqueda' : 'Buscar'}
            </button>
          </div>
          {formik.touched.numero && formik.errors.numero ? (
            <div className='text-red-500 text-sm'>{formik.errors.numero}</div>
          ) : null}
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Nombres <span className="text-red-500">*</span></label>
          <input
            type='text'
            id="nombres"
            name='nombres'
            value={formik.values.nombres.toLowerCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='w-full py-2 outline-none px-1 capitalize'
          />
          {formik.touched.nombres && formik.errors.nombres ? (
            <div className='text-red-500 text-sm'>{formik.errors.nombres}</div>
          ) : null}
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Teléfono <span className="text-red-500">*</span></label>
          <input
            type="text"
            id='telefono'
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
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Correo <span className="text-red-500">*</span></label>
          <input
            type='email'
            name='correo'
            value={formik.values.correo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='w-full py-2 outline-none px-1'
          />
          {formik.touched.correo && formik.errors.correo ? (
            <div className='text-red-500 text-sm'>{formik.errors.correo}</div>
          ) : null}
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Día sin refrigerio  <span className="text-red-500">*</span></label>
          <select
            name='dia_sin_refriguerio.id_cabecera_detalle'
            value={formik.values.dia_sin_refriguerio.id_cabecera_detalle}
            onChange={(e) => {
              const selectedValue: any = e.target.value;
              formik.setFieldValue('dia_sin_refriguerio.id_cabecera_detalle', parseInt(selectedValue, 10));
              const descripcion = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][selectedValue - 8];
              formik.setFieldValue('dia_sin_refriguerio.descripcion', descripcion);
            }}
            onBlur={formik.handleBlur}
            className='w-full py-2 outline-none px-1'
          >
            {dataBreak?.cabecera?.cabeceras_detalles.map((item: any) => (
              <option value={item.id_cabecera_detalle} key={item.id_cabecera_detalle}>
                {item.descripcion}
              </option>
            ))}
          </select>
          {formik.touched.dia_sin_refriguerio?.id_cabecera_detalle && formik.errors.dia_sin_refriguerio?.id_cabecera_detalle ? (
            <div className='text-red-500 text-sm'>{formik.errors.dia_sin_refriguerio.id_cabecera_detalle}</div>
          ) : null}
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Titulo <span className="text-red-500">*</span></label>
          <select
            name='titulo.id_cabecera_detalle'
            value={formik.values.titulo.id_cabecera_detalle}
            onChange={(e) => {
              const selectedValue: any = e.target.value;
              formik.setFieldValue('titulo.id_cabecera_detalle', parseInt(selectedValue, 10));
              const descripcion = ['Cosmiatras', 'Doctores', 'Secretarias'][selectedValue - 5];
              formik.setFieldValue('titulo.descripcion', descripcion);
            }}
            onBlur={formik.handleBlur}
            className='w-full py-2 outline-none px-1'

          >
            {/* <option value=""></option> */}
            {dataTitle?.cabecera?.cabeceras_detalles.map((item: any) => (
              <option value={item.id_cabecera_detalle} key={item.id_cabecera_detalle}>{item.descripcion}</option>
            ))}

          </select>
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Usuario <span className="text-red-500">*</span></label>
          <input
            type="text"
            name='usuario.username'
            value={formik.values.usuario.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='w-full py-2 outline-none px-1'
          />
          {formik.touched.usuario?.username && formik.errors.usuario?.username ? (
            <div className='text-red-500 text-sm'>{formik.errors.usuario.username}</div>
          ) : null}
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Contraseña <span className="text-red-500">*</span></label>
          <input
            type="password"
            name='usuario.password'
            value={formik.values.usuario.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='w-full py-2 outline-none px-1'
          />
          {formik.touched.usuario?.password && formik.errors.usuario?.password ? (
            <div className='text-red-500 text-sm'>{formik.errors.usuario.password}</div>
          ) : null}
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Rol <span className="text-red-500">*</span></label>
          {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
          <select
            className='w-full py-2 outline-none px-1'
            name='usuario.rol.id_rol'
            value={formik.values.usuario.rol.id_rol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {/* <option value=""></option> */}
            <option value={1}>Administrador</option>
            <option value={2}>Empleado</option>
            <option value={3}>Vizualizador</option>
            <option value={4}>Doctor</option>
          </select>
          {formik.touched.usuario?.rol?.id_rol && formik.errors.usuario?.rol?.id_rol ? (
            <div
              className='text-red-500 text-sm'
            >{formik.errors.usuario.rol.id_rol}</div>
          ) : null}
        </div>
        <div className="border border-gray-300 text-left p-2">
          <label className='text-font-777 text-sm'>Sede <span className="text-red-500">*</span></label>
          <select
            name='sede.id_sede'
            value={selectedSede || formik.values.sede.id_sede}
            onChange={(e) => {
              const selectedIdSede: any = e.target.value;
              setSelectedSede(selectedIdSede);
              const selectedSedeInfo = dataInfra?.data.content.find((item: any) => item.id_sede === parseInt(selectedIdSede));
              if (selectedSedeInfo) {
                formik.setFieldValue('sede.id_sede', selectedSedeInfo.id_sede);
                formik.setFieldValue('sede.codigo', selectedSedeInfo.codigo);
                formik.setFieldValue('sede.nombres', selectedSedeInfo.nombres);
                formik.setFieldValue('sede.direccion', selectedSedeInfo.direccion);
                formik.setFieldValue('sede.telefono', selectedSedeInfo.telefono);
              }
            }}
            onBlur={formik.handleBlur}
            className='w-full py-2 outline-none px-1'

          >
            {dataInfra?.data?.content.map((item: any) => (
              <option key={item.id_sede} value={item.id_sede}>{item.nombres}</option>
            ))}
          </select>
        </div>


        <button className='bg-[#82b440] p-2 text-white' type='submit'>
          {loadingEmployee ? 'Actualizando...' : 'actualizar'}
        </button>

      </form>
    </PopupUpdate>
  )
}
