"use client"
import React, { useState, useEffect } from 'react'
import { GetDniApiHook } from "@/config/hook-dni"
import { useAddEmployeeMutation } from './store/services';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetInfrastructureQuery } from '../../infrastructure/list/store/service';
import { Alert } from '@/components/popup/popup-alert';
import { useRouter } from 'next/navigation';
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';

export default function UserCreate() {
    const router = useRouter()

    const [selectedSede, setSelectedSede] = useState(null);

    const { data: dniData, isLoading: loadingDni, handleClick, setDni, error: errorDni } = GetDniApiHook();
    const [addEmployee, { isLoading: loadingEmployee, data: dataEmployee, error: errorEmployee }] = useAddEmployeeMutation();

    const { data: dataInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 10, page: 0 });

    const { data: dataTitle } = useGetFindHeadBoardQuery(3)

    const { data: dataBreak } = useGetFindHeadBoardQuery(4)


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchInfra();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchInfra]);

    const formik = useFormik({
        initialValues: {
            tipo_documento: {
                id_cabecera: 2,
                id_cabecera_detalle: 5,
                descripcion: 'DNI',
                valor: '',
            },
            numero: '',
            nombres: '',
            telefono: '',
            correo: '',
            sede: {
                id_sede: 1,
            },
            titulo: {
                id_cabecera: 3,
                id_cabecera_detalle: 0,
                descripcion: '',
                valor: '',
            },
            dia_sin_refriguerio: {
                id_cabecera: 4,
                id_cabecera_detalle: 0,
                descripcion: '',
                valor: '',
            },
            empresa: {
                id_empresa: 1,
            },
            usuario: {
                username: '',
                password: '',
                rol: {
                    id_rol: 1,
                    descripcion: 'ADMINISTRATOR',
                    valor: 'ADMINISTRADOR',
                    estado: true,
                },
                estado: true,
                estado_eliminado: false

            },
            estado: true,
            estado_eliminado: false
        },
        validationSchema: Yup.object({
            nombres: Yup.string().required('Requerido'),
            telefono: Yup.string().required('Requerido'),
            correo: Yup.string().email('Email inválido'),
            sede: Yup.object().shape({
                id_sede: Yup.number().required('Requerido'),
            }),
            // titulo: Yup.object().shape({
            //     id_cabecera: Yup.number().required('Requerido'),
            //     id_cabecera_detalle: Yup.number().required('Requerido'),
            //     descripcion: Yup.string().required('Requerido'),
            // }),
            // dia_sin_refriguerio: Yup.object().shape({
            //     id_cabecera: Yup.number().required('Requerido'),
            //     id_cabecera_detalle: Yup.number().required('Requerido'),
            //     descripcion: Yup.string().required('Requerido'),
            // }),
            usuario: Yup.object().shape({
                username: Yup.string().required('Requerido'),
                password: Yup.string().required('Requerido'),
            }),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log(values)
            await addEmployee(values);
            resetForm();
            router.push('./list')
        },
    });

    useEffect(() => {
        if (dniData && dniData.nombre) {
            formik.setFieldValue('nombres', dniData.nombre);
        }
    }, [dniData, formik.setFieldValue]);

    return (
        <React.Fragment>
            <h1 className='text-2xl '>Crear usuarios</h1>
            <section className='mt-4 p-4 bg-white'>
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
                            {/* <option value={0}>Seleccione</option>
                            <option value={8}>Lunes</option>
                            <option value={9}>Martes</option>
                            <option value={10}>Miércoles</option>
                            <option value={11}>Jueves</option>
                            <option value={12}>Viernes</option>
                            <option value={13}>Sábado</option> */}
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
                            {/* <option value={0}>Seleccione</option>
                            <option value={5}>Cosmiatras</option>
                            <option value={6}>Doctores</option>
                            <option value={7}>Secretarias</option> */}
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
                            // autocomplete="usuario.password"
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
                            {/* <option value={2}>Empleado</option> */}
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
                                const selectedSedeInfo = dataInfra?.data.content.find((item: any) => item.id_sede === parseFloat(selectedIdSede));
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
                            {dataInfra?.data?.content
                                .filter((infra: any) => infra.estado)
                                .map((item: any) => (
                                    <option key={item.id_sede} value={item.id_sede}>{item.nombres}</option>
                                ))}
                        </select>
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
                        {formik.touched.estado && formik.errors.estado ? (
                            <div className='text-red-500 text-sm'>{formik.errors.estado}</div>
                        ) : null}
                    </div> */}

                    <button className='bg-[#82b440] p-2 text-white' type='submit'>
                        {loadingEmployee ? 'Creando...' : 'Crear'}
                    </button>

                </form>
                {dataEmployee && <Alert type='success'>{dataEmployee.message}</Alert>}
                {errorEmployee && <Alert type='error'>Error al crear empleado</Alert>}
            </section>
        </React.Fragment>
    )
}
