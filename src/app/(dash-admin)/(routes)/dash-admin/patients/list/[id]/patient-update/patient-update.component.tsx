"use client"
import React from 'react'
import { PopupUpdate } from "@/components/popup/popup-update/"
import { useUpdatePatientMutation } from "./store/service/patient-update.service";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  onClose: any;
  id?: number;
  data?: any;
  update?: any
}

export default function PatientUpdateComponent({ onClose, id, data, update }: Props) {

  const [updatePatient, { isLoading, isError }] = useUpdatePatientMutation();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };


  const formik = useFormik({
    initialValues: {
      id_paciente: id,
      nombres: data?.nombres,
      empresa: {
        id_empresa: 1
      },
      usuario_registro: {
        id_usuario: 2
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
        id_cabecera: data.estado_civil.id_cabecera,
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
        id_cabecera: data.estado_antiguedad.id_cabecera,
        id_cabecera_detalle: data.estado_antiguedad.id_cabecera_detalle,
        descripcion: data.estado_antiguedad.descripcion || '',
        valor: data.estado_antiguedad.valor || ''
      },
      estado: data.estado
    },
    validationSchema: Yup.object({
      nombres: Yup.string().required('Requerido'),
      tipo_documento_identidad: Yup.object({
        descripcion: Yup.string().required('Requerido'),
      }).required('Requerido'),
      numero_documento_identidad: Yup.string().required('Requerido'),
      telefono: Yup.string().required('Requerido'),
      nacimiento: Yup.date().required('Requerido'),
      estado_civil: Yup.object({
        descripcion: Yup.string().required('Requerido'),
      }).required('Requerido'),
      ocupacion: Yup.string().required('Requerido'),
      email: Yup.string().email('Correo electrónico no válido').required('Requerido'),
      direccion: Yup.string().required('Requerido'),
      distrito: Yup.string().required('Requerido'),
      lugar_nacimiento: Yup.string().required('Requerido'),
      estado_antiguedad: Yup.object({
        descripcion: Yup.string().required('Requerido'),
      }).required('Requerido'),
      estado: Yup.boolean().required('Requerido'),
    }),
    onSubmit: async (values) => {
      // Llama a la mutación para actualizar al paciente
      try {
        await updatePatient({ pacienteId: values.id_paciente, pacienteData: values }).unwrap();
        console.log('Paciente actualizado exitosamente');
        update()
        onClose();
      } catch (error) {
        console.log('Error al actualizar el paciente:', error);
      }
    }
  });


  return (
    <PopupUpdate>
      <button className='flex justify-end w-full text-2xl' onClick={onClose}>x</button>
      <h1 className='text-2xl mb-3'>Actualizar Paciente</h1>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombres" className="block">Nombres</label>
          <input
            type="text"
            name="nombres"
            className="w-full p-2 border border-gray-300 rounded capitalize"
            value={formik.values.nombres.toLowerCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nombres && formik.errors.nombres && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.nombres} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="tipo_documento_identidad.descripcion" className="block">Tipo Documento Identidad</label>
          <input
            type="text"
            name="tipo_documento_identidad.descripcion"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.tipo_documento_identidad.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tipo_documento_identidad?.descripcion && formik.errors.tipo_documento_identidad?.descripcion && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.tipo_documento_identidad.descripcion} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="numero_documento_identidad" className="block">Número Documento Identidad</label>
          <input
            type="text"
            name="numero_documento_identidad"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.numero_documento_identidad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.numero_documento_identidad && formik.errors.numero_documento_identidad && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.numero_documento_identidad} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="telefono" className="block">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.telefono && formik.errors.telefono && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.telefono} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="nacimiento" className="block">Fecha de Nacimiento</label>
          <input
            type="date"
            name="nacimiento"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.nacimiento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nacimiento && formik.errors.nacimiento && (
            <div className="text-red-500 text-sm">{formik.errors.nacimiento}</div>
          )}
        </div>
        <div>
          <label htmlFor="estado_civil.descripcion" className="block">Estado Civil</label>
          <input
            type="text"
            name="estado_civil.descripcion"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.estado_civil.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.estado_civil?.descripcion && formik.errors.estado_civil?.descripcion && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors?.estado_civil?.descripcion} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="ocupacion" className="block">Ocupación</label>
          <input
            type="text"
            name="ocupacion"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.ocupacion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ocupacion && formik.errors.ocupacion && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.ocupacion} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.email} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="direccion" className="block">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.direccion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.direccion && formik.errors.direccion && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.direccion} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="distrito" className="block">Distrito</label>
          <input
            type="text"
            name="distrito"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.distrito}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.distrito && formik.errors.distrito && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.distrito} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="lugar_nacimiento" className="block">Lugar de Nacimiento</label>
          <input
            type="text"
            name="lugar_nacimiento"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.lugar_nacimiento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lugar_nacimiento && formik.errors.lugar_nacimiento && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.lugar_nacimiento} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="estado_antiguedad.descripcion" className="block">Estado Antigüedad</label>
          <input
            type="text"
            name="estado_antiguedad.descripcion"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.estado_antiguedad.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.estado_antiguedad?.descripcion && formik.errors.estado_antiguedad?.descripcion && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.estado_antiguedad.descripcion} */}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="estado" className="">Estado</label>
          <input
            type="checkbox"
            name="estado"
            className="m-1 border-gray-300 rounded"
            checked={formik.values.estado}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.estado && formik.errors.estado && (
            <div className="text-red-500 text-sm">
              {/* {formik.errors.estado} */}
            </div>
          )}
        </div>
        <div className="col-span-2">
          <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">Guardar</button>
          {isLoading && <div className="text-blue-500 mt-2">Cargando...</div>}
          {isError && <div className="text-red-500 mt-2">Error al guardar cambios</div>}
        </div>
      </form>

    </PopupUpdate>
  )
}
