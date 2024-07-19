import React from 'react'
interface Props {
    dataAppointment?: any
}
export default function DetailComponent({ dataAppointment }: Props) {
    return (
        <section className="p-6 rounded-lg  bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                {/* Sede */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Ubicacion</h2>
                    <div>
                        <p className="text-gray-600 text-sm">Nombre:</p>
                        <p className="text-gray-800 font-medium">{dataAppointment?.sede.nombres}</p>
                        <p className="text-gray-600 text-sm mt-2">Dirección:</p>
                        <p className="text-gray-800">{dataAppointment?.sede.direccion}</p>
                        <p className="text-gray-600 text-sm mt-2">Teléfono:</p>
                        <p className="text-gray-800">{dataAppointment?.sede.telefono}</p>
                    </div>
                </div>

                {/* Sala de Tratamiento */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Sala de Tratamiento</h2>
                    <div>
                        <p className="text-gray-600 text-sm">Nombre:</p>
                        <p className="text-gray-800 font-medium">{dataAppointment?.sala_tratamiento.nombres}</p>
                        <>
                        <p className="text-gray-600 text-sm mt-2">Piso:</p>
                        <span className="text-gray-800">{dataAppointment?.sala_tratamiento.piso}</span>
                        </>
                    </div>
                </div>

                {/* Procedimiento */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Procedimiento</h2>
                    <div>
                        <p className="text-gray-600 text-sm">Nombre:</p>
                        <p className="text-gray-800 font-medium">{dataAppointment?.procedimiento.nombres}</p>
                        <p className="text-gray-600 text-sm mt-2">Tipo de Procedimiento:</p>
                        <p className="text-gray-800">{dataAppointment?.procedimiento.tipo_procedimiento.descripcion}</p>
                        <p className="text-gray-600 text-sm mt-2">Subtipo de Procedimiento:</p>
                        <p className="text-gray-800">{dataAppointment?.procedimiento.subtipo_procedimiento.descripcion}</p>
                    </div>
                </div>

                {/* Fecha de la cita y hora */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Fecha y Hora de la Cita</h2>
                    <div>
                        <p className="text-gray-600 text-sm">Hora:</p>
                        <p className="text-gray-800 font-medium">{dataAppointment?.hora.descripcion}</p>
                        <p className="text-gray-600 text-sm mt-2">Fecha de Cita:</p>
                        <p className="text-gray-800">{dataAppointment?.fecha_cita}</p>
                        <p className="text-gray-600 text-sm mt-2">Fecha de Registro:</p>
                        <p className="text-gray-800">{dataAppointment?.fecha_registro}</p>
                    </div>
                </div>
            </div>
        </section>

    )
}
