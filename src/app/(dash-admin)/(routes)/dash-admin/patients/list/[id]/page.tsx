"use client"
import React, { useState } from 'react'
import { useGetPatientByIdQuery } from './store/service'
import PatientUpdateComponent from './patient-update/patient-update.component'

interface Props {
    params: {
        id: number
    }
}

export default function DetailsPatients({ params }: Props) {

    const [showPopup, setShowPopup] = useState(false);

    const { data, error, isLoading, refetch } = useGetPatientByIdQuery(params.id);
    // Data
    const dataPatient = data?.data;

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading patient details</div>;


    // TODO: FALTA AGREGAR MAS DISEÑO UI
    return (
        <section className="flex flex-wrap lg:justify-between h-full">
            {/* Información del paciente */}
            <div className="w-full lg:w-1/2 p-4">
                <div className="bg-white p-8 w-full">
                    <h1 className="text-2xl font-bold">
                        Paciente:
                    </h1>
                    <span className='text-xl font-bold capitalize'>{dataPatient.nombres.toLowerCase()}</span>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">DNI:</p>
                        <p className="text-gray-900">{dataPatient.numero_documento_identidad}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Teléfono:</p>
                        <p className="text-gray-900">{dataPatient.telefono}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Email:</p>
                        <p className="text-gray-900">{dataPatient.email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Fecha de Nacimiento:</p>
                        <p className="text-gray-900">{new Date(dataPatient.nacimiento).toLocaleDateString()}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Estado Civil:</p>
                        <p className="text-gray-900">{dataPatient.estado_civil?.descripcion}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Ocupación:</p>
                        <p className="text-gray-900">{dataPatient.ocupacion}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Dirección:</p>
                        <p className="text-gray-900">{dataPatient.direccion}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Lugar de Nacimiento:</p>
                        <p className="text-gray-900">{dataPatient.lugar_nacimiento}</p>
                    </div>
                    <div className="flex justify-between mt-6">
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
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
            {/* Información del historial del paciente */}
            <div className="w-full lg:w-1/2 p-4">
                <div className="bg-white p-8 overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4">Historial del Paciente</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Consulta del 20/05/2023</h3>
                        <p className="text-gray-600 font-medium">Motivo de la Visita:</p>
                        <p className="text-gray-900 mb-2">Dolor de cabeza persistente</p>
                        <p className="text-gray-600 font-medium">Diagnóstico:</p>
                        <p className="text-gray-900 mb-2">Migraña</p>
                        <p className="text-gray-600 font-medium">Tratamiento:</p>
                        <p className="text-gray-900">Medicamento A 10mg, descansar y evitar estrés</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Consulta del 15/04/2023</h3>
                        <p className="text-gray-600 font-medium">Motivo de la Visita:</p>
                        <p className="text-gray-900 mb-2">Dolor abdominal</p>
                        <p className="text-gray-600 font-medium">Diagnóstico:</p>
                        <p className="text-gray-900 mb-2">Gastritis</p>
                        <p className="text-gray-600 font-medium">Tratamiento:</p>
                        <p className="text-gray-900">Medicamento B 20mg, dieta blanda</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Consulta del 10/03/2023</h3>
                        <p className="text-gray-600 font-medium">Motivo de la Visita:</p>
                        <p className="text-gray-900 mb-2">Revisión general</p>
                        <p className="text-gray-600 font-medium">Diagnóstico:</p>
                        <p className="text-gray-900 mb-2">Sin anomalías</p>
                        <p className="text-gray-600 font-medium">Tratamiento:</p>
                        <p className="text-gray-900">Continuar con hábitos saludables</p>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Añadir Consulta
                        </button>
                    </div>
                </div>
            </div>
        </section>

    )
}
