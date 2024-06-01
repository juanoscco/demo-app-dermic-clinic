"use client"
import React from 'react'
import { useAddAgendaMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/create/store/service'
import { PopupUpdate } from '@/components/popup/popup-update'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AgendaOpening } from "../../inteface/"

interface Props {
    id?: number | any;
    data?: any;
    onClose?: any;
    update?: any
}


const validationSchema = Yup.object({
    usuario: Yup.object({
        id_usuario: Yup.number().required('Required'),
        username: Yup.string().required('Required'),
        rol: Yup.object({
            id_rol: Yup.number().required('Required'),
            descripcion: Yup.string().required('Required'),
            valor: Yup.string().required('Required'),
            estado: Yup.boolean().required('Required')
        }).required('Required'),
        estado: Yup.boolean().required('Required')
    }).required('Required'),
    empleado: Yup.object({
        id_empleado: Yup.number().required('Required'),
        tipo_documento: Yup.object({
            id_cabecera: Yup.number().required('Required'),
            id_cabecera_detalle: Yup.number().required('Required'),
            descripcion: Yup.string().required('Required'),
            valor: Yup.string().required('Required')
        }).required('Required'),
        numero: Yup.string().required('Required'),
        nombres: Yup.string().required('Required'),
        telefono: Yup.string().required('Required'),
        correo: Yup.string().email('Invalid email').required('Required'),
        sede: Yup.object({
            id_sede: Yup.number().required('Required'),
            codigo: Yup.string().required('Required'),
            nombres: Yup.string().required('Required'),
            direccion: Yup.string().required('Required'),
            telefono: Yup.string().required('Required'),
            empresa: Yup.object({
                id_empresa: Yup.number().required('Required'),
                nro_documento: Yup.string().required('Required'),
                nombres: Yup.string().required('Required'),
                direccion: Yup.string().required('Required'),
                estado: Yup.boolean().required('Required')
            }).required('Required'),
            estado: Yup.boolean().required('Required')
        }).required('Required'),
        titulo: Yup.object({
            id_cabecera: Yup.number().required('Required'),
            id_cabecera_detalle: Yup.number().required('Required'),
            descripcion: Yup.string().required('Required'),
            valor: Yup.string().required('Required')
        }).required('Required'),
        dia_sin_refriguerio: Yup.object({
            id_cabecera: Yup.number().required('Required'),
            id_cabecera_detalle: Yup.number().required('Required'),
            descripcion: Yup.string().required('Required'),
            valor: Yup.string().required('Required')
        }).required('Required'),
        empresa: Yup.object({
            id_empresa: Yup.number().required('Required'),
            nro_documento: Yup.string().required('Required'),
            nombres: Yup.string().required('Required'),
            direccion: Yup.string().required('Required'),
            estado: Yup.boolean().required('Required')
        }).required('Required'),
        usuario: Yup.object({
            id_usuario: Yup.number().required('Required'),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            rol: Yup.object({
                id_rol: Yup.number().required('Required'),
                descripcion: Yup.string().required('Required'),
                valor: Yup.string().required('Required'),
                estado: Yup.boolean().required('Required')
            }).required('Required'),
            estado: Yup.boolean().required('Required')
        }).required('Required'),
        estado: Yup.boolean().required('Required')
    }).required('Required'),
    fecha_apertura: Yup.string().required('Required'),
    hora_inicio: Yup.string().required('Required'),
    hora_final: Yup.string().required('Required'),
    estado: Yup.boolean().required('Required')
});

export default function CreateAgendaComponent({ id, data, onClose, update }: Props) {
    const [addAgenda, { isLoading }] = useAddAgendaMutation()

    // console.log(data);
    const formik = useFormik<AgendaOpening>({
        initialValues: {
            usuario: {
                id_usuario: data?.usuario?.id_usuario,
                username: data?.usuario?.username,
                password: data?.usuario?.password,
                rol: {
                    id_rol: data?.usuario?.rol.id_rol,
                    descripcion: data?.usuario?.rol.descripcion,
                    valor: data?.usuario?.rol.valor || "",
                    estado: data?.usuario?.rol.estado
                },
                estado: data?.usuario?.estado || true
            },
            empleado: {
                id_empleado: id,
                tipo_documento: {
                    id_cabecera: data?.tipo_documento?.id_cabecera || 2,
                    id_cabecera_detalle: data?.tipo_documento?.id_cabecera_detalle,
                    descripcion: data?.tipo_documento?.descripcion,
                    valor: data?.tipo_documento?.valor
                },
                numero: data?.numero,
                nombres: data?.nombres,
                telefono: data?.telefono,
                correo: data?.correo,
                sede: {
                    id_sede: data?.sede?.id_sede,
                    codigo: data?.sede?.codigo,
                    nombres: data?.sede?.nombres,
                    direccion: data?.sede?.direccion,
                    telefono: data?.sede?.telefono,
                    empresa: {
                        id_empresa: data?.sede?.empresa?.id_empresa || 1,
                        nro_documento: data?.sede?.empresa?.nro_documento,
                        nombres: data?.sede?.empresa?.nombres,
                        direccion: data?.sede?.empresa?.direccion,
                        estado: data?.sede?.empresa?.estado
                    },
                    estado: data?.sede?.estado || true
                },
                titulo: {
                    id_cabecera: data?.titulo?.id_cabecera || 3,
                    id_cabecera_detalle: data?.titulo?.id_cabecera_detalle,
                    descripcion: data?.titulo?.descripcion,
                    valor: data?.titulo?.valor || ""
                },
                dia_sin_refriguerio: {
                    id_cabecera: data?.dia_sin_refriguerio?.id_cabecera || 4,
                    id_cabecera_detalle: data?.dia_sin_refriguerio?.id_cabecera_detalle,
                    descripcion: data?.dia_sin_refriguerio?.descripcion,
                    valor: data?.dia_sin_refriguerio?.valor || ""
                },
                empresa: {
                    id_empresa: data?.empresa?.id_empresa,
                    nro_documento: data?.empresa?.nro_documento,
                    nombres: data?.empresa?.nombres,
                    direccion: data?.empresa?.direccion,
                    estado: data?.empresa?.estado
                },
                usuario: {
                    id_usuario: data?.usuario?.id_usuario,
                    username: data?.usuario?.username,
                    password: data?.usuario?.password,
                    rol: {
                        id_rol: data?.usuario?.rol?.id_rol,
                        descripcion: data?.usuario?.rol?.descripcion,
                        valor: data?.usuario?.rol?.valor || "",
                        estado: data?.usuario?.rol?.estado
                    },
                    estado: data?.usuario?.estado || true
                },
                estado: data?.estado || true
            },
            fecha_apertura: "",
            hora_inicio: "",
            hora_final: "",
            estado: true
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            try {
                // await addAgenda(values)
                console.log(values)
            } catch (error) {
                console.error("Error !!")
            }
        }
    });
    return (
        <PopupUpdate>
            <button onClick={onClose}>X</button>
            <form onSubmit={formik.handleSubmit}>
                <div className='border border-gray-300 text-left p-2'>
                    <label>Dia de apertura</label>
                    <input
                        type="date"
                        name="fecha_apertura"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_apertura}
                        className='w-full py-2 outline-none px-1'

                    />
                    {formik.errors.fecha_apertura ? <div>{formik.errors.fecha_apertura}</div> : null}
                </div>
                <div className='border border-gray-300 text-left p-2'>
                    <label>Start Time</label>
                    <input
                        type="time"
                        name="hora_inicio"
                        onChange={formik.handleChange}
                        value={formik.values.hora_inicio}
                        className='w-full py-2 outline-none px-1'
                    />
                    {formik.errors.hora_inicio ? <div>{formik.errors.hora_inicio}</div> : null}
                </div>
                <div>
                    <label>End Time</label>
                    <input
                        type="time"
                        name="hora_final"
                        onChange={formik.handleChange}
                        value={formik.values.hora_final}
                    />
                    {formik.errors.hora_final ? <div>{formik.errors.hora_final}</div> : null}
                </div>

                <button type="submit">
                    {isLoading ? 'Creando...' : 'Crear'}
                </button>
            </form>
            {/* <form onSubmit={formik.handleSubmit} className="grid grid-cols-4 gap-4">
                <div>
                    <label htmlFor="usuario.id_usuario">ID Usuario</label>
                    <input
                        id="usuario.id_usuario"
                        name="usuario.id_usuario"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.usuario.id_usuario}
                    />
                    {formik.errors.usuario?.id_usuario ? <div>{formik.errors.usuario.id_usuario}</div> : null}
                </div>
                <div>
                    <label htmlFor="usuario.username">Username</label>
                    <input
                        id="usuario.username"
                        name="usuario.username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.usuario.username}
                    />
                    {formik.errors.usuario?.username ? <div>{formik.errors.usuario.username}</div> : null}
                </div>
                <div>
                    <label htmlFor="usuario.password">Password</label>
                    <input
                        id="usuario.password"
                        name="usuario.password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.usuario.password}
                    />
                    {formik.errors.usuario?.password ? <div>{formik.errors.usuario.password}</div> : null}
                </div>
                <div>
                    <label htmlFor="usuario.rol.id_rol">ID Rol</label>
                    <input
                        id="usuario.rol.id_rol"
                        name="usuario.rol.id_rol"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.usuario.rol.id_rol}
                    />
                    {formik.errors.usuario?.rol?.id_rol ? <div>{formik.errors.usuario.rol.id_rol}</div> : null}
                </div>
                <div>
                    <label htmlFor="usuario.rol.descripcion">Descripción Rol</label>
                    <input
                        id="usuario.rol.descripcion"
                        name="usuario.rol.descripcion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.usuario.rol.descripcion}
                    />
                    {formik.errors.usuario?.rol?.descripcion ? <div>{formik.errors.usuario.rol.descripcion}</div> : null}
                </div>
                <div>
                    <label htmlFor="usuario.rol.valor">Valor Rol</label>
                    <input
                        id="usuario.rol.valor"
                        name="usuario.rol.valor"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.usuario.rol.valor}
                    />
                    {formik.errors.usuario?.rol?.valor ? <div>{formik.errors.usuario.rol.valor}</div> : null}
                </div>
                <div>
                    <label htmlFor="usuario.rol.estado">Estado Rol</label>
                    <input
                        id="usuario.rol.estado"
                        name="usuario.rol.estado"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.usuario.rol.estado}
                    />
                    {formik.errors.usuario?.rol?.estado ? <div>{formik.errors.usuario.rol.estado}</div> : null}
                </div>
                <div>
                    <label htmlFor="usuario.estado">Estado Usuario</label>
                    <input
                        id="usuario.estado"
                        name="usuario.estado"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.usuario.estado}
                    />
                    {formik.errors.usuario?.estado ? <div>{formik.errors.usuario.estado}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.id_empleado">ID Empleado</label>
                    <input
                        id="empleado.id_empleado"
                        name="empleado.id_empleado"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.id_empleado}
                    />
                    {formik.errors.empleado?.id_empleado ? <div>{formik.errors.empleado.id_empleado}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.tipo_documento.id_cabecera">ID Cabecera Documento</label>
                    <input
                        id="empleado.tipo_documento.id_cabecera"
                        name="empleado.tipo_documento.id_cabecera"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.tipo_documento.id_cabecera}
                    />
                    {formik.errors.empleado?.tipo_documento?.id_cabecera ? <div>{formik.errors.empleado.tipo_documento.id_cabecera}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.tipo_documento.id_cabecera_detalle">ID Cabecera Detalle Documento</label>
                    <input
                        id="empleado.tipo_documento.id_cabecera_detalle"
                        name="empleado.tipo_documento.id_cabecera_detalle"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.tipo_documento.id_cabecera_detalle}
                    />
                    {formik.errors.empleado?.tipo_documento?.id_cabecera_detalle ? <div>{formik.errors.empleado.tipo_documento.id_cabecera_detalle}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.tipo_documento.descripcion">Descripción Documento</label>
                    <input
                        id="empleado.tipo_documento.descripcion"
                        name="empleado.tipo_documento.descripcion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.tipo_documento.descripcion}
                    />
                    {formik.errors.empleado?.tipo_documento?.descripcion ? <div>{formik.errors.empleado.tipo_documento.descripcion}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.tipo_documento.valor">Valor Documento</label>
                    <input
                        id="empleado.tipo_documento.valor"
                        name="empleado.tipo_documento.valor"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.tipo_documento.valor}
                    />
                    {formik.errors.empleado?.tipo_documento?.valor ? <div>{formik.errors.empleado.tipo_documento.valor}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.numero">Número</label>
                    <input
                        id="empleado.numero"
                        name="empleado.numero"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.numero}
                    />
                    {formik.errors.empleado?.numero ? <div>{formik.errors.empleado.numero}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.nombres">Nombres</label>
                    <input
                        id="empleado.nombres"
                        name="empleado.nombres"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.nombres}
                    />
                    {formik.errors.empleado?.nombres ? <div>{formik.errors.empleado.nombres}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.telefono">Teléfono</label>
                    <input
                        id="empleado.telefono"
                        name="empleado.telefono"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.telefono}
                    />
                    {formik.errors.empleado?.telefono ? <div>{formik.errors.empleado.telefono}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.correo">Correo</label>
                    <input
                        id="empleado.correo"
                        name="empleado.correo"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.correo}
                    />
                    {formik.errors.empleado?.correo ? <div>{formik.errors.empleado.correo}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.id_sede">ID Sede</label>
                    <input
                        id="empleado.sede.id_sede"
                        name="empleado.sede.id_sede"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.id_sede}
                    />
                    {formik.errors.empleado?.sede?.id_sede ? <div>{formik.errors.empleado.sede.id_sede}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.codigo">Código Sede</label>
                    <input
                        id="empleado.sede.codigo"
                        name="empleado.sede.codigo"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.codigo}
                    />
                    {formik.errors.empleado?.sede?.codigo ? <div>{formik.errors.empleado.sede.codigo}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.nombres">Nombres Sede</label>
                    <input
                        id="empleado.sede.nombres"
                        name="empleado.sede.nombres"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.nombres}
                    />
                    {formik.errors.empleado?.sede?.nombres ? <div>{formik.errors.empleado.sede.nombres}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.direccion">Dirección Sede</label>
                    <input
                        id="empleado.sede.direccion"
                        name="empleado.sede.direccion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.direccion}
                    />
                    {formik.errors.empleado?.sede?.direccion ? <div>{formik.errors.empleado.sede.direccion}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.telefono">Teléfono Sede</label>
                    <input
                        id="empleado.sede.telefono"
                        name="empleado.sede.telefono"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.telefono}
                    />
                    {formik.errors.empleado?.sede?.telefono ? <div>{formik.errors.empleado.sede.telefono}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.empresa.id_empresa">ID Empresa</label>
                    <input
                        id="empleado.sede.empresa.id_empresa"
                        name="empleado.sede.empresa.id_empresa"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.empresa.id_empresa}
                    />
                    {formik.errors.empleado?.sede?.empresa?.id_empresa ? <div>{formik.errors.empleado.sede.empresa.id_empresa}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.empresa.nro_documento">Nro Documento Empresa</label>
                    <input
                        id="empleado.sede.empresa.nro_documento"
                        name="empleado.sede.empresa.nro_documento"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.empresa.nro_documento}
                    />
                    {formik.errors.empleado?.sede?.empresa?.nro_documento ? <div>{formik.errors.empleado.sede.empresa.nro_documento}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.empresa.nombres">Nombres Empresa</label>
                    <input
                        id="empleado.sede.empresa.nombres"
                        name="empleado.sede.empresa.nombres"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.empresa.nombres}
                    />
                    {formik.errors.empleado?.sede?.empresa?.nombres ? <div>{formik.errors.empleado.sede.empresa.nombres}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.empresa.direccion">Dirección Empresa</label>
                    <input
                        id="empleado.sede.empresa.direccion"
                        name="empleado.sede.empresa.direccion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.sede.empresa.direccion}
                    />
                    {formik.errors.empleado?.sede?.empresa?.direccion ? <div>{formik.errors.empleado.sede.empresa.direccion}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.empresa.estado">Estado Empresa</label>
                    <input
                        id="empleado.sede.empresa.estado"
                        name="empleado.sede.empresa.estado"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.empleado.sede.empresa.estado}
                    />
                    {formik.errors.empleado?.sede?.empresa?.estado ? <div>{formik.errors.empleado.sede.empresa.estado}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.sede.estado">Estado Sede</label>
                    <input
                        id="empleado.sede.estado"
                        name="empleado.sede.estado"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.empleado.sede.estado}
                    />
                    {formik.errors.empleado?.sede?.estado ? <div>{formik.errors.empleado.sede.estado}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.titulo.id_cabecera">ID Cabecera Título</label>
                    <input
                        id="empleado.titulo.id_cabecera"
                        name="empleado.titulo.id_cabecera"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.titulo.id_cabecera}
                    />
                    {formik.errors.empleado?.titulo?.id_cabecera ? <div>{formik.errors.empleado.titulo.id_cabecera}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.titulo.id_cabecera_detalle">ID Cabecera Detalle Título</label>
                    <input
                        id="empleado.titulo.id_cabecera_detalle"
                        name="empleado.titulo.id_cabecera_detalle"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.titulo.id_cabecera_detalle}
                    />
                    {formik.errors.empleado?.titulo?.id_cabecera_detalle ? <div>{formik.errors.empleado.titulo.id_cabecera_detalle}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.titulo.descripcion">Descripción Título</label>
                    <input
                        id="empleado.titulo.descripcion"
                        name="empleado.titulo.descripcion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.titulo.descripcion}
                    />
                    {formik.errors.empleado?.titulo?.descripcion ? <div>{formik.errors.empleado.titulo.descripcion}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.titulo.valor">Valor Título</label>
                    <input
                        id="empleado.titulo.valor"
                        name="empleado.titulo.valor"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.titulo.valor}
                    />
                    {formik.errors.empleado?.titulo?.valor ? <div>{formik.errors.empleado.titulo.valor}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.dia_sin_refriguerio.id_cabecera">ID Cabecera Día sin Refriguerio</label>
                    <input
                        id="empleado.dia_sin_refriguerio.id_cabecera"
                        name="empleado.dia_sin_refriguerio.id_cabecera"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.dia_sin_refriguerio.id_cabecera}
                    />
                    {formik.errors.empleado?.dia_sin_refriguerio?.id_cabecera ? <div>{formik.errors.empleado.dia_sin_refriguerio.id_cabecera}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.dia_sin_refriguerio.id_cabecera_detalle">ID Cabecera Detalle Día sin Refriguerio</label>
                    <input
                        id="empleado.dia_sin_refriguerio.id_cabecera_detalle"
                        name="empleado.dia_sin_refriguerio.id_cabecera_detalle"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.dia_sin_refriguerio.id_cabecera_detalle}
                    />
                    {formik.errors.empleado?.dia_sin_refriguerio?.id_cabecera_detalle ? <div>{formik.errors.empleado.dia_sin_refriguerio.id_cabecera_detalle}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.dia_sin_refriguerio.descripcion">Descripción Día sin Refriguerio</label>
                    <input
                        id="empleado.dia_sin_refriguerio.descripcion"
                        name="empleado.dia_sin_refriguerio.descripcion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.dia_sin_refriguerio.descripcion}
                    />
                    {formik.errors.empleado?.dia_sin_refriguerio?.descripcion ? <div>{formik.errors.empleado.dia_sin_refriguerio.descripcion}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.dia_sin_refriguerio.valor">Valor Día sin Refriguerio</label>
                    <input
                        id="empleado.dia_sin_refriguerio.valor"
                        name="empleado.dia_sin_refriguerio.valor"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.dia_sin_refriguerio.valor}
                    />
                    {formik.errors.empleado?.dia_sin_refriguerio?.valor ? <div>{formik.errors.empleado.dia_sin_refriguerio.valor}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.empresa.id_empresa">ID Empresa Empleado</label>
                    <input
                        id="empleado.empresa.id_empresa"
                        name="empleado.empresa.id_empresa"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.empresa.id_empresa}
                    />
                    {formik.errors.empleado?.empresa?.id_empresa ? <div>{formik.errors.empleado.empresa.id_empresa}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.empresa.nro_documento">Nro Documento Empresa Empleado</label>
                    <input
                        id="empleado.empresa.nro_documento"
                        name="empleado.empresa.nro_documento"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.empresa.nro_documento}
                    />
                    {formik.errors.empleado?.empresa?.nro_documento ? <div>{formik.errors.empleado.empresa.nro_documento}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.empresa.nombres">Nombres Empresa Empleado</label>
                    <input
                        id="empleado.empresa.nombres"
                        name="empleado.empresa.nombres"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.empresa.nombres}
                    />
                    {formik.errors.empleado?.empresa?.nombres ? <div>{formik.errors.empleado.empresa.nombres}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.empresa.direccion">Dirección Empresa Empleado</label>
                    <input
                        id="empleado.empresa.direccion"
                        name="empleado.empresa.direccion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.empleado.empresa.direccion}
                    />
                    {formik.errors.empleado?.empresa?.direccion ? <div>{formik.errors.empleado.empresa.direccion}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.empresa.estado">Estado Empresa Empleado</label>
                    <input
                        id="empleado.empresa.estado"
                        name="empleado.empresa.estado"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.empleado.empresa.estado}
                    />
                    {formik.errors.empleado?.empresa?.estado ? <div>{formik.errors.empleado.empresa.estado}</div> : null}
                </div>
                <div>
                    <label htmlFor="empleado.estado">Estado Empleado</label>
                    <input
                        id="empleado.estado"
                        name="empleado.estado"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.empleado.estado}
                    />
                    {formik.errors.empleado?.estado ? <div>{formik.errors.empleado.estado}</div> : null}
                </div>
                <div>
                    <label htmlFor="fecha_apertura">Fecha Apertura</label>
                    <input
                        id="fecha_apertura"
                        name="fecha_apertura"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_apertura}
                    />
                    {formik.errors.fecha_apertura ? <div>{formik.errors.fecha_apertura}</div> : null}
                </div>
                <div>
                    <label htmlFor="hora_inicio">Hora Inicio</label>
                    <input
                        id="hora_inicio"
                        name="hora_inicio"
                        type="time"
                        onChange={formik.handleChange}
                        value={formik.values.hora_inicio}
                    />
                    {formik.errors.hora_inicio ? <div>{formik.errors.hora_inicio}</div> : null}
                </div>
                <div>
                    <label htmlFor="hora_final">Hora Final</label>
                    <input
                        id="hora_final"
                        name="hora_final"
                        type="time"
                        onChange={formik.handleChange}
                        value={formik.values.hora_final}
                    />
                    {formik.errors.hora_final ? <div>{formik.errors.hora_final}</div> : null}
                </div>
                <div>
                    <label htmlFor="estado">Estado</label>
                    <input
                        id="estado"
                        name="estado"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.estado}
                    />
                    {formik.errors.estado ? <div>{formik.errors.estado}</div> : null}
                </div>
                <button type="submit">Submit</button>
            </form> */}

        </PopupUpdate>
    )
}
