"use client"
import React, { useEffect } from 'react';
import { GetDniApiHook } from "@/config/hook-dni/";
import { useAddPacienteMutation } from "./store/service/";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@/components/popup/popup-alert';

export default function PatientsCreate() {

    // 
    const [addPaciente, { isLoading: loadingPatient, data: dataPatient, error: errorPatient, isError }] = useAddPacienteMutation();

    //DNI 
    const { data: dniData, isLoading: loadingDni, handleClick, setDni, error: errorDni } = GetDniApiHook();

    const formik = useFormik({
        initialValues: {
            nombres: "",
            empresa: {
                id_empresa: 1
            },
            usuario_registro: {
                id_usuario: 2
            },
            tipo_documento_identidad: {
                id_cabecera: 2,
                id_cabecera_detalle: 3,
                descripcion: "DNI",
                valor: ""
            },
            numero_documento_identidad: "",
            telefono: "",
            nacimiento: "",
            estado_civil: {
                id_cabecera: 8,
                id_cabecera_detalle: 31,
                descripcion: "Soltero/a",
                valor: ""
            },
            ocupacion: "",
            email: "",
            direccion: "",
            distrito: "",
            lugar_nacimiento: "",
            estado_antiguedad: {
                id_cabecera: 9,
                id_cabecera_detalle: 35,
                descripcion: "Nuevo",
                valor: ""
            },
            estado: true
        },
        validationSchema: Yup.object({
            nombres: Yup.string().required('Requerido'),
            tipo_documento_identidad: Yup.object({
                descripcion: Yup.string().required('Requerido'),
            }).required('Requerido'),
            numero_documento_identidad: Yup.string().required('Requerido'),
            telefono: Yup.string()
                .matches(/^[0-9]+$/, 'El teléfono debe contener solo números')
                .required('Requerido'),
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
        }),
        onSubmit: async (values, { resetForm }) => {
            // console.log(values);
            await addPaciente(values);
            resetForm();
        },
    });
    const estadosAntiguedad = [
        { id: 35, descripcion: "Nuevo" },
        { id: 36, descripcion: "Antiguo" }
    ];
    const estadosCiviles = [
        { id: 31, descripcion: "Soltero/a" },
        { id: 32, descripcion: "Casado/a" },
        { id: 33, descripcion: "Divorciado/a" },
        { id: 34, descripcion: "Viudo/a" }
    ];

    useEffect(() => {
        if (dniData && dniData.nombre) {
            formik.setFieldValue('nombres', dniData.nombre);
        }
    }, [dniData, formik.setFieldValue]);


    if (loadingPatient) return (
        <div className="space-y-4 p-4 border border-gray-200 rounded-md shadow-md">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
    )


    return (
        <React.Fragment>
            <h1 className='text-2xl'>Crear paciente</h1>
            <section className='mt-4 p-4 bg-white'>
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
                        {formik.touched.numero_documento_identidad && formik.errors.numero_documento_identidad ? (
                            <div className='text-red-400'>{formik.errors.numero_documento_identidad}</div>
                        ) : null}
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
                        {formik.touched.nombres && formik.errors.nombres ? (
                            <div className='text-red-400'>{formik.errors.nombres}</div>
                        ) : null}
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
                        {formik.touched.telefono && formik.errors.telefono ? (
                            <div className='text-red-400'>{formik.errors.telefono}</div>
                        ) : null}
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
                        {formik.touched.nacimiento && formik.errors.nacimiento ? (
                            <div className='text-red-400'>{formik.errors.nacimiento}</div>
                        ) : null}
                    </div>
                    <div className='border border-gray-300 text-left p-2'>
                        <label htmlFor="estado_civil">Estado Civil</label>
                        <select
                            id="estado_civil"
                            name="estado_civil.id_cabecera_detalle"
                            className='w-full py-2 outline-none px-1'
                            onChange={(e) => {
                                formik.handleChange(e);
                                const selectedOption = estadosCiviles.find(
                                    (estado) => estado.id.toString() === e.target.value
                                );
                                formik.setFieldValue(
                                    'estado_civil.descripcion',
                                    selectedOption ? selectedOption.descripcion : ''
                                );
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.estado_civil.id_cabecera_detalle}
                        >
                            <option value="">Selecciona una opción</option>
                            {estadosCiviles.map(estado => (
                                <option key={estado.id} value={estado.id}>
                                    {estado.descripcion}
                                </option>
                            ))}
                        </select>
                        {formik.touched.estado_civil?.id_cabecera_detalle && formik.errors.estado_civil?.id_cabecera_detalle ? (
                            <div className='text-red-400'>{formik.errors.estado_civil.id_cabecera_detalle}</div>
                        ) : null}
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
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-red-400'>{formik.errors.email}</div>
                        ) : null}
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
                        {formik.touched.ocupacion && formik.errors.ocupacion ? (
                            <div className='text-red-400'>{formik.errors.ocupacion}</div>
                        ) : null}
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
                        {formik.touched.direccion && formik.errors.direccion ? (
                            <div className='text-red-400'>{formik.errors.direccion}</div>
                        ) : null}
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
                        {formik.touched.distrito && formik.errors.distrito ? (
                            <div className='text-red-400'>{formik.errors.distrito}</div>
                        ) : null}
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
                        {formik.touched.lugar_nacimiento && formik.errors.lugar_nacimiento ? (
                            <div className='text-red-400'>{formik.errors.lugar_nacimiento}</div>
                        ) : null}
                    </div>
                    <div className='border border-gray-300 text-left p-2'>
                        <label htmlFor="estado_antiguedad">Estado</label>
                        <select
                            id="estado_antiguedad"
                            name="estado_antiguedad.id_cabecera_detalle"
                            className='w-full py-2 outline-none px-1'
                            onChange={(e) => {
                                formik.handleChange(e);
                                const selectedOption = estadosAntiguedad.find(
                                    (estado) => estado.id.toString() === e.target.value
                                );
                                formik.setFieldValue(
                                    'estado_antiguedad.descripcion',
                                    selectedOption ? selectedOption.descripcion : ''
                                );
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.estado_antiguedad.id_cabecera_detalle}
                        >
                            <option value="">Selecciona una opción</option>
                            {estadosAntiguedad.map(estado => (
                                <option key={estado.id} value={estado.id}>
                                    {estado.descripcion}
                                </option>
                            ))}
                        </select>
                        {formik.touched.estado_antiguedad?.id_cabecera_detalle && formik.errors.estado_antiguedad?.id_cabecera_detalle ? (
                            <div className='text-red-400'>{formik.errors.estado_antiguedad.id_cabecera_detalle}</div>
                        ) : null}
                    </div>

                    <button className='w-full bg-[#82b440] shadow-xl p-3 rounded-sm text-white' type='submit'>Enviar</button>
                    {errorPatient && <Alert type='error'>Error en enviar el paciente</Alert>}
                    {dataPatient && <Alert type='success'>Estado: {dataPatient.message}</Alert>}

                </form>
            </section>
        </React.Fragment>
    )
}
