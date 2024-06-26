import React from 'react'

interface Props {
    dataAppointment?: any
}

export default function DoctorComponent({ dataAppointment }: Props) {
    return (
        <section>
            {/* datos */}
            <section className=" p-6 rounded-lg shadow-md">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Correo:</p>
                        <p className="text-gray-800">{dataAppointment?.empleado.correo}</p>
                        <p className="text-gray-600 text-sm mt-2">Nombre de usuario:</p>
                        <p className="text-gray-800">{dataAppointment?.empleado.usuario.username}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Nombres:</p>
                        <p className="text-gray-800 capitalize">{dataAppointment?.empleado.nombres.toLowerCase()}</p>
                        <p className="text-gray-600 text-sm mt-2">Documento:</p>
                        <p className="text-gray-800">{dataAppointment?.empleado.tipo_documento.descripcion} {dataAppointment?.empleado.numero}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Día sin refrigerio:</p>
                        <p className="text-gray-800">{dataAppointment?.empleado.dia_sin_refriguerio.descripcion}</p>
                        <p className="text-gray-600 text-sm mt-2">Fecha de registro:</p>
                        <p className="text-gray-800">{dataAppointment?.fecha_registro}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600 text-sm">Sede:</p>
                        <p className="text-gray-800">{dataAppointment?.empleado.sede.nombres}</p>
                        <p className="text-gray-600 text-sm mt-2">Título:</p>
                        <p className="text-gray-800">{dataAppointment?.empleado.titulo.descripcion}</p>
                    </div>
                </div>
            </section>



        </section>
    )
}
