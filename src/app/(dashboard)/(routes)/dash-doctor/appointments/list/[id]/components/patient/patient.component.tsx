import React from 'react'

interface Props {
    dataDetailAppointmentById?: any;

}


export default function PatientComponent({
    dataDetailAppointmentById,
}: Props) {

    return (
        <section >
            {/* Datos */}
            <section className=" p-6 rounded-lg ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Nombre:</p>
                        <p className="capitalize text-gray-800 font-medium">{dataDetailAppointmentById?.paciente.nombres.toLowerCase()}</p>
                        <p className="text-gray-600 text-sm mt-2">Documento de Identidad:</p>
                        <p className="text-gray-800">{dataDetailAppointmentById?.paciente.numero_documento_identidad}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Email:</p>
                        <p className="text-gray-800">{dataDetailAppointmentById?.paciente.email}</p>
                        <p className="text-gray-600 text-sm mt-2">Teléfono:</p>
                        <p className="text-gray-800">{dataDetailAppointmentById?.paciente.telefono}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Dirección:</p>
                        <p className="text-gray-800">{dataDetailAppointmentById?.paciente.direccion}</p>
                        <p className="text-gray-600 text-sm mt-2">Lugar de nacimiento:</p>
                        <p className="text-gray-800">{dataDetailAppointmentById?.paciente.lugar_nacimiento}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Estado de antigüedad:</p>
                        <p className="text-gray-800">{dataDetailAppointmentById?.paciente.estado_antiguedad.descripcion}</p>
                        <p className="text-gray-600 text-sm mt-2">Estado civil:</p>
                        <p className="text-gray-800">{dataDetailAppointmentById?.paciente.estado_civil.descripcion}</p>
                    </div>
                </div>
            </section>
        </section>
    )
}
