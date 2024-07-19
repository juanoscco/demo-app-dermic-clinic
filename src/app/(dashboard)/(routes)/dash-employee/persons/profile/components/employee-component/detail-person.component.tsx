"use client"
import React, { useState } from 'react'
import { DeleteEmployeeComponent } from "./components/employee-delete/components"
import { EmployeeUpdateComponent } from "./components/employee-update/employee-update.component"

interface Props {
    dataEmployee?: any;
    refetch?: any;
}

const formatDateTime = (dateTimeString: any) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    // Formato deseado: YYYY-MM-DD HH:mm
    const formattedDateTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} / ${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    return formattedDateTime;
};
export function DetailPersonComponent({ dataEmployee, refetch }: Props) {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const togglePopupDelete = () => {
        setShowPopupDelete(!showPopupDelete);
    };
    return (
        <div className="bg-white p-6 rounded-lg">
            <div className='flex justify-between py-2'>
                <h1 className='font-bold text-2xl'>Datos</h1>
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
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={togglePopupDelete}
                    >
                        Eliminar
                    </button>
                    {showPopupDelete && (
                        <DeleteEmployeeComponent
                            onClose={togglePopupDelete}
                            id={dataEmployee?.id_empleado}
                            update={refetch}
                        />
                    )}
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
