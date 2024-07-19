"use client"
import React, { useState } from 'react'
import { DeletePatientComponent } from '../../patient-delete/components';
import { PatientUpdateComponent } from '../../patient-update/patient-update.component';

interface Props {
    dataPatient?: any;
    refetch?: any
}

export function PatientsComponent({ dataPatient, refetch }: Props) {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const togglePopupDelete = () => {
        setShowPopupDelete(!showPopupDelete);
    }

    return (
        <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between mt-6">
                <h1 className='font-bold text-2xl'>Datos:</h1>
                <div className='flex gap-2'>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={togglePopup}
                    >
                        Editar
                    </button>
                    {showPopup
                        &&
                        <PatientUpdateComponent
                            onClose={togglePopup}
                            id={dataPatient.id_paciente}
                            data={dataPatient}
                            update={refetch}
                        />
                    }
                    <button
                        onClick={togglePopupDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Eliminar
                    </button>
                    {showPopupDelete && (
                        <DeletePatientComponent
                            onClose={togglePopupDelete}
                            id={dataPatient.id_paciente}
                            update={refetch}
                        />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-4">
                <div className="pb-2 border-b border-gray-300">
                    <h1 className="text-gray-600 text-sm">Paciente:</h1>
                    <span className="text-gray-800 capitalize">{dataPatient.nombres.toLowerCase()}</span>
                    <p className="text-gray-600 text-sm mt-2">DNI:</p>
                    <p className="text-gray-800">{dataPatient.numero_documento_identidad}</p>
                </div>

                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 text-sm">Teléfono:</p>
                    <p className="text-gray-800">{dataPatient.telefono}</p>
                    <p className="text-gray-600 text-sm">Email:</p>
                    <p className="text-gray-800">{dataPatient.email}</p>
                </div>
                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 font-sm">Fecha de Nacimiento:</p>
                    <p className="text-gray-800">{new Date(dataPatient.nacimiento).toLocaleDateString()}</p>
                    <p className="text-gray-600 font-sm">Estado Civil:</p>
                    <p className="text-gray-800">{dataPatient.estado_civil?.descripcion}</p>
                </div>
                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 font-sm">Ocupación:</p>
                    <p className="text-gray-800">{dataPatient.ocupacion}</p>
                    <p className="text-gray-600 font-sm">Dirección:</p>
                    <p className="text-gray-800">{dataPatient.direccion}</p>
                </div>
                <div className="pb-2 border-b border-gray-300">
                    <p className="text-gray-600 font-sm">Lugar de Nacimiento:</p>
                    <p className="text-gray-800">{dataPatient.lugar_nacimiento}</p>
                </div>

            </div>
        </div>
    )
}
