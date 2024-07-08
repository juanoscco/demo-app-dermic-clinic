"use client"
import { useGetAppointmentListQuery } from '@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/list/store/service';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
    dataPatient?: any
}
import { formatTime } from '@/utils/formatTime';

export function PatientsAppointmentsComponent({ dataPatient }: Props) {
    const { data: dataAppointment, isLoading: loadAppointment, isError: errorAppointment, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, id_empleado: 0 });
    const appointments = dataAppointment?.data?.content;

    const [currentPage, setCurrentPage] = useState(1);
    const [filterTerm, setFilterTerm] = useState('');

    const filterPatientWithAppointment = useCallback(() => {
        if (!appointments || !dataPatient) return [];
        let filteredAppointments = appointments.filter((item: any) => item.paciente.id_paciente === dataPatient.id_paciente && item.estado);

        // Aplicar filtro por término de búsqueda
        if (filterTerm) {
            filteredAppointments = filteredAppointments.filter((appointment: any) =>
                appointment.fecha_cita.toLowerCase().includes(filterTerm.toLowerCase()) ||
                appointment.empleado.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                appointment.procedimiento.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                appointment.sede.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                appointment.sala_tratamiento.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                appointment.sala_tratamiento.piso.toString().includes(filterTerm.toLowerCase()) ||
                appointment.horario.descripcion.toLowerCase().includes(filterTerm.toLowerCase())
            );
        }

        return filteredAppointments;
    }, [appointments, dataPatient, filterTerm]);

    useEffect(() => {
        if (!loadAppointment) {
            refetchAppointment();
        }
    }, [loadAppointment, refetchAppointment])

    const filteredAppointments = useMemo(() => filterPatientWithAppointment(), [filterPatientWithAppointment]);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterTerm(e.target.value);
    };

    const currentAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <React.Fragment>
            <div className="bg-white p-8 overflow-x-auto h-[35rem] rounded-lg ">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Historial de citas del paciente</h2>
                {loadAppointment ? (
                    <div className="text-gray-700 text-center py-4">Cargando...</div>
                ) : errorAppointment ? (
                    <div className="text-red-500 text-center py-4">Error al cargar los datos. Inténtalo de nuevo.</div>
                ) : (
                    <React.Fragment>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="px-3 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none"
                            value={filterTerm}
                            onChange={handleFilterChange}
                        />
                        {filteredAppointments.length > 0 ? (
                            <React.Fragment>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 text-left">Fecha de la cita</th>
                                            <th className="py-2 text-left">Doctor</th>
                                            <th className="py-2 text-left">Motivo de la Visita</th>
                                            <th className="py-2 text-left">Sede</th>
                                            <th className="py-2 text-left">Sala</th>
                                            <th className="py-2 text-left">Piso</th>
                                            <th className="py-2 text-left">Hora</th>
                                            <th className="py-2 text-left">Entrada</th>
                                            <th className="py-2 text-left">Atención</th>
                                            <th className="py-2 text-left">Salida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentAppointments.map((appointment: any) => (
                                            <tr key={appointment.id_cita} className="border-b">
                                                <td className="py-2">{appointment.fecha_cita}</td>
                                                <td className="py-2">{appointment.empleado.nombres}</td>
                                                <td className="py-2">{appointment.procedimiento.nombres}</td>
                                                <td className="py-2">{appointment.sede.nombres}</td>
                                                <td className="py-2">{appointment.sala_tratamiento.nombres}</td>
                                                <td className="py-2">{appointment.sala_tratamiento.piso}</td>
                                                <td className="py-2">{appointment.horario.descripcion}</td>
                                                <td className="py-2">{formatTime(appointment.cita_info.hora_entrada)}</td>
                                                <td className="py-2">{formatTime(appointment.cita_info.hora_atencion)}</td>
                                                <td className="py-2">{formatTime(appointment.cita_info.hora_salida)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </React.Fragment>
                        ) : (
                            <div className="text-gray-700 text-center py-4">No hay citas</div>
                        )}
                    </React.Fragment>
                )}

            </div>
            <div className="flex justify-end items-center gap-2 mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </React.Fragment>
    )
}
