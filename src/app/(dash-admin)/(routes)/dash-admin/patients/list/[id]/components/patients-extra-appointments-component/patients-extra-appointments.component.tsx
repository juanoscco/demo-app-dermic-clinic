"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetExtraAppointmentsQuery } from '@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/list/store/service';
import { formatTime } from '@/utils/formatTime';

interface Props {
    dataPatient?: any
}

export function PatientsExtraAppointmentsComponent({ dataPatient }: Props) {
    const { data: dataExtraAppointment, isLoading: dataExtraAppointmentLoad, isError: errorExtraAppointment, refetch: refetchExtraAppointment } = useGetExtraAppointmentsQuery({ limit: 150000, page: 0, filter: '' });
    const extraAppointments = dataExtraAppointment?.data?.content;

    const [currentPage, setCurrentPage] = useState(1);
    const [filterTerm, setFilterTerm] = useState('');

    const filterPatientWithExtraAppointment = useCallback(() => {
        if (!extraAppointments || !dataPatient) return [];
        let filteredExtraAppointments = extraAppointments.filter((item: any) => item.paciente.id_paciente === dataPatient.id_paciente && item.estado);

        // Aplicar filtro por término de búsqueda
        if (filterTerm) {
            filteredExtraAppointments = filteredExtraAppointments.filter((extraAppointment: any) =>
                extraAppointment.fecha_cita.toLowerCase().includes(filterTerm.toLowerCase()) ||
                extraAppointment.empleado.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                extraAppointment.procedimiento.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                extraAppointment.sede.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                extraAppointment.sala_tratamiento.nombres.toLowerCase().includes(filterTerm.toLowerCase()) ||
                extraAppointment.sala_tratamiento.piso.toString().includes(filterTerm.toLowerCase()) ||
                formatTime(extraAppointment.hora_registro).toLowerCase().includes(filterTerm.toLowerCase()) ||
                formatTime(extraAppointment?.cita_extra_info.hora_entrada).toLowerCase().includes(filterTerm.toLowerCase()) ||
                formatTime(extraAppointment?.cita_extra_info.hora_atencion).toLowerCase().includes(filterTerm.toLowerCase()) ||
                formatTime(extraAppointment?.cita_extra_info.hora_salida).toLowerCase().includes(filterTerm.toLowerCase())
            );
        }

        return filteredExtraAppointments;
    }, [extraAppointments, dataPatient, filterTerm]);

    useEffect(() => {
        if (!dataExtraAppointmentLoad) {
            refetchExtraAppointment();
        }
    }, [dataExtraAppointmentLoad, refetchExtraAppointment])

    const filteredExtraAppointments = useMemo(() => filterPatientWithExtraAppointment(), [filterPatientWithExtraAppointment]);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredExtraAppointments.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterTerm(e.target.value);
    };

    const currentExtraAppointments = filteredExtraAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <React.Fragment>
            <div className="bg-white p-8 overflow-x-auto h-[35rem] rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Historial de citas Extras</h2>
                {dataExtraAppointmentLoad ? (
                    <div className="text-gray-700 text-center py-4">Cargando...</div>
                ) : errorExtraAppointment ? (
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
                        {filteredExtraAppointments.length > 0 ? (
                            <React.Fragment>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2">Fecha de la cita extra</th>
                                            <th className="py-2">Doctor</th>
                                            <th className="py-2">Motivo de la Visita</th>
                                            <th className="py-2">Sede</th>
                                            <th className="py-2">Sala</th>
                                            <th className="py-2">Piso</th>
                                            <th className="py-2">Hora Registrada</th>
                                            <th className="py-2">Entrada</th>
                                            <th className="py-2">Atención</th>
                                            <th className="py-2">Salida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentExtraAppointments.map((extraAppointment: any) => (
                                            <tr key={extraAppointment.id_cita} className="border-b">
                                                <td className="py-2">{extraAppointment.fecha_cita}</td>
                                                <td className="py-2">{extraAppointment.empleado.nombres}</td>
                                                <td className="py-2">{extraAppointment.procedimiento.nombres}</td>
                                                <td className="py-2">{extraAppointment.sede.nombres}</td>
                                                <td className="py-2">{extraAppointment.sala_tratamiento.nombres}</td>
                                                <td className="py-2">{extraAppointment.sala_tratamiento.piso}</td>
                                                <td className="py-2">{formatTime(extraAppointment.hora_registro)}</td>
                                                <td className="py-2">{formatTime(extraAppointment?.cita_extra_info.hora_entrada)}</td>
                                                <td className="py-2">{formatTime(extraAppointment?.cita_extra_info.hora_atencion)}</td>
                                                <td className="py-2">{formatTime(extraAppointment?.cita_extra_info.hora_salida)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </React.Fragment>
                        ) : (
                            <div className="text-gray-700 text-center py-4 h-3/6 flex justify-center items-center">No hay citas</div>
                        )}
                    </React.Fragment>
                )}
            </div>
            <div className="flex justify-end items-center gap-3 mt-4">
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
                    disabled={currentPage === totalPages && currentPage === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </React.Fragment >
    )
}
