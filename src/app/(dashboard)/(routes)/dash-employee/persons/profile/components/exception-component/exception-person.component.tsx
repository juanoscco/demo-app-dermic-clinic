import React, { useState, useEffect } from 'react'
import { CreateExceptionComponents } from "./components/create"
import { UpdateExceptionComponent } from "./components/update"
import { DeleteExceptionComponent } from './components/delete/';

import { useGetExceptionsQuery } from "@/app/(dashboard)/store"


interface Props {
    dataPerson?: any;
    idPerson?: number
}

export default function ExceptionPersonComponent({ dataPerson, idPerson }: Props) {
    // Create
    const [showPopup, setShowPopup] = useState(false);
    // end to create

    // Update
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);
    const [selectedExceptionId, setSelectedExceptionId] = useState<number | null>(null);
    // end to update

    // Delete
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [selectedExceptionIdDelete, setSelectedExceptionIdDelete] = useState<number | null>(null);

    // Data
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, refetch } = useGetExceptionsQuery({ page: 0, limit: 30000, filter: '' })

    const dataException = data?.data?.content.filter((exception: any) => exception.empleado.id_empleado === idPerson);
    const pageSize = 5;

    // Calcular los datos para la página actual`
    const paginatedData = dataException?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(dataException?.length / pageSize);
    // End of data

    // Refetch
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetch]);
    // End refetch

    // update
    const togglePopupId = (id?: number) => {
        if (id) {
            setSelectedExceptionId(id)
        }
        setShowPopupUpdate(!showPopupUpdate)
    }
    // end to update

    // delete
    const togglePopupIdDelete = (id?: number) => {
        if (id) {
            setSelectedExceptionIdDelete(id)
        }
        setShowPopupDelete(!showPopupDelete)
    }

    // Función para manejar el avance de página
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Función para manejar el retroceso de página
    const goToPrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    // Create
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    //End to create

    // end to update
    // Selected exception
    const selectedExceptionUpdate = selectedExceptionId !== null
        ? paginatedData.find((proc: any) => proc.id_excepcion === selectedExceptionId)
        : null;
    // end selected exception

    const selectedExceptionDelete = selectedExceptionIdDelete !== null
        ? (paginatedData ? paginatedData?.find((proc: any) => proc.id_excepcion === selectedExceptionIdDelete) : null)
        : null;


    return (
        <div className="bg-white p-4 rounded-lg ">
            <div className='flex flex-col sm:flex-row justify-between items-center mb-3'>
                <h1
                    className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0"
                >Lista de excepciones</h1>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desde</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hasta</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedData && paginatedData.length > 0 ? (
                                    paginatedData
                                        .filter((exception: any) => exception.estado)
                                        .map((exception: any, index: number) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                    {exception.motivo}

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <h3>{exception.fecha_ausente_desde}</h3>
                                                    <span>{exception.hora_inicio.descripcion}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <h3>{exception.fecha_ausente_hasta}</h3>
                                                    <span>{exception.hora_final.descripcion}</span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm  flex flex-wrap gap-1">
                                                    <button
                                                        className='text-yellow-500'
                                                        onClick={() => togglePopupId(exception.id_excepcion)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className='text-red-500'
                                                        onClick={() => togglePopupIdDelete(exception.id_excepcion)}
                                                    >
                                                        Eliminar
                                                    </button>
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
                <CreateExceptionComponents
                    data={dataPerson}
                    id={idPerson}
                    onClose={togglePopup}
                    update={refetch}
                />
            )}
            {showPopupUpdate && selectedExceptionId &&
                (
                    <UpdateExceptionComponent
                        id={selectedExceptionUpdate?.id_excepcion}
                        data={selectedExceptionUpdate}
                        onClose={togglePopupId}
                        update={refetch}
                    />
                )}

            {showPopupDelete && selectedExceptionIdDelete && (
                <DeleteExceptionComponent
                    id={selectedExceptionDelete?.id_excepcion}
                    update={refetch}
                    onClose={togglePopupIdDelete}
                />
            )}
        </div>
    )
}
