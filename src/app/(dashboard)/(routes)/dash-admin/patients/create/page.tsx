"use client"
import React, { useEffect, useState } from 'react';
// import { GetDniApiHook } from "@/config/hook-dni/";
// import { useAddPatientMutation } from "./store/service";
import { useAddPatientMutation } from "@/app/(dashboard)/store/";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@/components/popup/popup-alert';
import { Patient } from './interface';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/app/(dashboard)/utils';

import { useGetClientsOptiabiQuery, GetDniApiHook } from "@/config/"

export default function PatientsCreate() {

    const router = useRouter();


    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: dataClients, isLoading: clientsLoading, refetch: clientsRefetch } = useGetClientsOptiabiQuery({ page: 0, limit: 8, names: searchTerm })
    const clients = dataClients?.data?.content

    // 
    const [addPatient, { data: dataPatient, isLoading: loadingPatient, error: errorPatient }] = useAddPatientMutation();

    //DNI 
    const { data: dniData, isLoading: loadingDni, handleClick, setDni, error: errorDni } = GetDniApiHook();

    // Ejemplo de uso
    const decoded = decodeToken({});
    // console.log(decoded);
    const formik = useFormik<Patient>({
        initialValues: {
            nombres: "",
            empresa: {
                id_empresa: decoded?.id_empresa
            },
            usuario_registro: {
                id_usuario: decoded?.id_usuario
            },
            tipo_documento_identidad: {
                id_cabecera: 2,
                id_cabecera_detalle: 5,
                descripcion: 'DNI',
                valor: '',
            },
            numero_documento_identidad: "",
            telefono: "",
            nacimiento: "",
            estado_civil: {
                id_cabecera: 8,
                id_cabecera_detalle: 38,
                descripcion: "--Seleccione--",
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
            estado: true,
            estado_eliminado: false
        },
        validationSchema: Yup.object({
            nombres: Yup.string().required('Requerido'),
            // numero_documento_identidad: Yup.string().required('Requerido'),
            telefono: Yup.string()
                .matches(/^[0-9]+$/, 'El teléfono debe contener solo números')
                .required('Requerido'),

            email: Yup.string().email('Correo electrónico no válido'),

        }),
        onSubmit: async (values, { resetForm }) => {
            // console.log(values);
            try {
                console.log(values);
                await addPatient(values);
                resetForm();
                router.push("./list")
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });
    const estadosAntiguedad = [
        { id: 44, descripcion: "Nuevo" },
        { id: 45, descripcion: "Antiguo" }
    ];
    const estadosCiviles = [
        { id: 38, descripcion: "--Seleccione--" },
        { id: 39, descripcion: "Soltero/a" },
        { id: 40, descripcion: "Casado/a" },
        { id: 41, descripcion: "Divorciado/a" },
        { id: 42, descripcion: "Viudo/a" }
    ];
    // Cerrar dropdown al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.target.closest('.dropdown-container')) {
                setShowDropdown(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSearchClick = () => {
        clientsRefetch();
        setShowDropdown(true);
    };

    const handleClientSelect = (client: any) => {
        formik.setFieldValue('nombres', client.Cliente);
        formik.setFieldValue('numero_documento_identidad', client.DNI);
        setShowDropdown(false);
    };

    useEffect(() => {
        if (dniData && dniData.nombre) {
            formik.setFieldValue('nombres', dniData.nombre);
        }
    }, [dniData, formik.setFieldValue]);

    return (
        <React.Fragment>
            <h1 className='text-2xl'>Crear paciente</h1>
            <section className='mt-4 p-4 bg-white'>
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <div className='border border-gray-300 text-left p-2'>
                        <label className='text-font-777 text-sm' htmlFor="numero_documento_identidad">DNI</label>
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

                    {/* <div className='border border-gray-300 text-left p-2'>
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
                    </div> */}
                    <div className='border border-gray-300 text-left p-2 relative dropdown-container'>
                        <label htmlFor="nombres">Apellidos y Nombres <span className="text-red-500">*</span></label>
                        <div className='flex'>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                className='w-full py-2 outline-none px-1 capitalize'
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setSearchTerm(e.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombres}
                            />
                            <button type="button" onClick={handleSearchClick} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded'>
                                Buscar
                            </button>
                        </div>
                        {formik.touched.nombres && formik.errors.nombres ? (
                            <div className='text-red-400'>{formik.errors.nombres}</div>
                        ) : null}

                        {showDropdown && clients && (
                            <ul className='absolute bg-white border border-gray-300 w-full mt-1'>
                                {clients.map((client: any, index: number) => (
                                    <li
                                        key={index}
                                        onClick={() => handleClientSelect(client)}
                                        className='p-2 cursor-pointer hover:bg-gray-200'
                                    >
                                        {client.Cliente}
                                    </li>
                                ))}
                            </ul>
                        )}
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
                        <label htmlFor="nacimiento">Fecha de Nacimiento </label>
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

                    <button
                        className='w-full bg-[#82b440] shadow-xl p-3 rounded-sm text-white'
                        type='submit'>{loadingPatient ? 'Creando...' : 'Crear'}</button>
                </form>
                {dataPatient && (
                    <Alert type="success">
                        ¡Operación completada con éxito!
                    </Alert>
                )}

                {errorPatient && (
                    <Alert type="error">
                        ¡Ups! Algo salió mal.
                    </Alert>
                )}

            </section>
        </React.Fragment>
    )
}
