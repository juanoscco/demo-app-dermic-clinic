"use client";
import React, { useState, useEffect } from 'react';
import { CreateAgendaComponent } from './components/create/';
import { UpdateAgendaComponent } from './components/update'
import { useGetAgendaQuery } from '../../../../agenda-opening/components/list/store/service';
import { DeleteAgendaComponent } from './components/delete/delete-agenda.component';
import {formatTime, formatTimeExtra } from "@/utils/formatTime"

interface Props {
    idPerson?: number;
    dataPerson?: any;
}

const formatTimeToAmPm = (time: string) => {
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
export default function AgendaPersonComponent({ dataPerson, idPerson }: Props) {

    // Create
    const [showPopup, setShowPopup] = useState(false);
    // end to create

    // Update
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);
    const [selectedAgendaId, setSelectedAgendaId] = useState<number | null>(null);
    // end to update

    // Eliminar
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [selectedAgendaIdDelete, setSelectedAgendaIdDelete] = useState<number | null>(null);

    // Get datatable    const [filter, setFilter] = useState('');
    const { data, isLoading, refetch } = useGetAgendaQuery({ limit: 50000, perPage: 0, filter: '' })
    const [currentPage, setCurrentPage] = useState(1);
    const dataAgenda = data?.data?.content?.filter((agenda: any) => (agenda.empleado.id_empleado === idPerson && agenda.estado))
    const pageSize = 5; // Número de elementos por página
    // end to hooks

    // Calcular los datos para la página actual
    const paginatedData = dataAgenda?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(dataAgenda?.length / pageSize);

    // Función para manejar el avance de página
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Función para manejar el retroceso de página
    const goToPrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetch]);

    // Create
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    //End to create

    // update
    const togglePopupId = (id?: number) => {
        if (id) {
            setSelectedAgendaId(id)
        }
        setShowPopupUpdate(!showPopupUpdate)
    }
    // end to update

    const togglePopupIdDelete = (id?: number) => {
        if (id) {
            setSelectedAgendaIdDelete(id)
        }
        setShowPopupDelete(!showPopupDelete)
    }
    const selectedAgendaUpdate = selectedAgendaId !== null
        ? paginatedData.find((proc: any) => proc.id_agenda === selectedAgendaId)
        : null;

    const selectedAgendaDelete = selectedAgendaIdDelete !== null
        ? (paginatedData ? paginatedData.find((proc: any) => proc.id_agenda === selectedAgendaIdDelete) : null)
        : null;
    return (
        <div className="bg-white p-4 rounded-lg">
            <div className='flex flex-col sm:flex-row justify-between items-center mb-3'>
                <h1 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Apertura de agenda</h1>
                <button
                    onClick={togglePopup}
                    className="px-4 py-2 bg-[#82b440] text-white rounded hover:bg-[#6fa030] transition-colors duration-200"
                >
                    Crear
                </button>
            </div>

            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <section className="h-96 overflow-x-auto flex flex-col justify-between">
                    <div className="overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Apertura</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Inicio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Final</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedData && paginatedData.length > 0 ? (
                                    paginatedData
                                        .filter((agenda: any) => agenda.estado)
                                        .map((agenda: any, index: number) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agenda.fecha_apertura}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeToAmPm(agenda.hora_inicio)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeToAmPm(agenda.hora_final)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm  flex flex-wrap gap-1">
                                                    <button
                                                        className='text-yellow-500'
                                                        onClick={() => togglePopupId(agenda.id_agenda)}
                                                    >Editar</button>
                                                    <button
                                                        className='text-red-500'
                                                        onClick={() => togglePopupIdDelete(agenda.id_agenda)}
                                                    >Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No hay datos
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination mt-4 flex justify-between items-center">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border bg-[#82b440] text-white rounded disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span>
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border bg-[#82b440] text-white rounded disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </section>

            )}
            {showPopup && (
                <CreateAgendaComponent
                    id={idPerson}
                    data={dataPerson}
                    update={refetch}
                    onClose={togglePopup}
                />
            )}
            {showPopupUpdate && selectedAgendaId && (
                <UpdateAgendaComponent
                    idAgendaUpdate={selectedAgendaUpdate?.id_agenda}
                    dataAgendaUpdate={selectedAgendaUpdate}
                    onClose={togglePopupId}
                    update={refetch}
                />
            )}
            {showPopupDelete && selectedAgendaIdDelete && (
                <DeleteAgendaComponent id={selectedAgendaDelete?.id_agenda}
                    onClose={togglePopupIdDelete}
                    update={refetch}
                />
            )}
        </div>
    )
}
