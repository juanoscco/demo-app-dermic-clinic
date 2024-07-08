"use client"
import React, { useState } from 'react'
import { decodeToken } from '@/app/(dash-admin)/utils';

import { EmployeeUpdateComponent, useGetEmployeeByIdQuery } from '../persons/list/[id]';
import { formatDateTime } from "@/utils/FormatDate/"

export default function ConfigUser() {
    const decoded = decodeToken({});

    const { data, error, isLoading, refetch } = useGetEmployeeByIdQuery(decoded?.id_empleado);
    const dataEmployee = data?.data;

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="bg-white p-6 rounded-lg">
            <h1 className='font-bold text-2xl'>Configuracion</h1>
            <div className='flex justify-between py-2'>
                <h1 className='font-bold text-xl capitalize'>Datos usuario: {dataEmployee?.nombres.toLowerCase()}</h1>
                <div className="flex gap-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={togglePopup}
                    >
                        Editar
                    </button>
                    {showPopup &&
                        <EmployeeUpdateComponent
                            onClose={togglePopup}
                            id={dataEmployee?.id_empleado}
                            data={dataEmployee}
                            update={refetch}
                        />
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-4">
                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 text-sm">Nombres:</p>
                    <p className="text-gray-800 capitalize">{dataEmployee?.nombres.toLowerCase()}</p>
                    <p className="text-gray-600 text-sm mt-2">Documento:</p>
                    <p className="text-gray-800">{dataEmployee?.tipo_documento.descripcion} {dataEmployee?.numero}</p>
                </div>
                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 text-sm">Correo:</p>
                    <p className="text-gray-800">{dataEmployee?.correo}</p>
                    <p className="text-gray-600 text-sm mt-2">Nombre de usuario:</p>
                    <p className="text-gray-800">{dataEmployee?.usuario.username}</p>
                </div>

                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 text-sm">Día sin refrigerio:</p>
                    <p className="text-gray-800">{dataEmployee?.dia_sin_refriguerio.descripcion}</p>
                    <p className="text-gray-600 text-sm mt-2">Hora y Fecha de registro:</p>
                    <p className="text-gray-800">{formatDateTime(dataEmployee?.fechaRegistro)}</p>
                </div>
                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 text-sm">Sede:</p>
                    <p className="text-gray-800">{dataEmployee?.sede.nombres}</p>
                    <p className="text-gray-600 text-sm mt-2">Título:</p>
                    <p className="text-gray-800">{dataEmployee?.titulo.descripcion}</p>
                </div>
            </div>


        </div>
    )
}
