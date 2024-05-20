"use client"
import React, { useState } from 'react'
import { users } from "@/mocks/Users/users.mocks"
import { exceptions } from "@/mocks/exceptions/exceptions.mocks";


export type Exception = {
    id: number;
    empleado: string;
    desde: string;
    hasta: string;
    horaInicial: string;
    horaFinal: string;
    motivo: string;
};

const itemsPerPage: number = 10; // Cambia esto según tu necesidad

export default function PersonsExceptions() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAddException = () => {
        toggleModal();
    };

    const handleSelectChange = (event: any) => {
        setSelectedEmployee(event.target.value);
    };

    // *-------------------------------------------

    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredExceptions = exceptions.filter((exception) =>
        exception.empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exception.motivo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState<number>(0);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const pageCount: number = Math.ceil(exceptions.length / itemsPerPage);

    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({
        key: null,
        direction: 'ascending',
    });

    const handleSort = (key: string) => {
        let direction: any = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    let sortedExceptions = [...filteredExceptions];

    if (sortConfig.key) {
        sortedExceptions.sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Exception];
            const bValue = b[sortConfig.key as keyof Exception];
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    const displayedExceptions = sortedExceptions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    return (
        <React.Fragment>
            <h1 className='text-2xl px-3 mb-3'>Excepciones</h1>
            <section className='gap-5 w-full h-full'>
                <section className=' rounded-md w-full h-full'>
                    <section className='bg-white flex justify-between items-center rounded-md p-4'>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar"
                            className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
                        />                        <div className='flex gap-3 items-center'>
                            <button onClick={toggleModal} className='bg-sky-600 text-white px-2 py-1 rounded-md'>Agregar</button>
                            <button className='bg-green-600 text-white px-2 py-1 rounded-md'>Excel</button>
                            <button className='bg-gray-400 text-white px-2 py-1 rounded-md'>Imprimir</button>
                        </div>
                    </section>
                    <section className='w-full bg-white h-4/6 rounded-md mt-4 overflow-x-auto'>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-4 py-2 text-left">Empleado</th>
                                    <th className="px-4 py-2 text-left">Desde</th>
                                    <th className="px-4 py-2 text-left">Hasta</th>
                                    <th className="px-4 py-2 text-left">Hora</th>
                                    <th className="px-4 py-2 text-left">Motivo</th>
                                    <th className="px-4 py-2 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedExceptions.map((exception) => (
                                    <tr key={exception.id} className='border-t border-gray-200'>
                                        <td className='px-4 py-2'>{exception.empleado}</td>
                                        <td className='px-4 py-2'>{exception.desde}</td>
                                        <td className='px-4 py-2'>{exception.hasta}</td>
                                        <td className='px-4 py-2'>
                                            {exception.horaInicial} - 
                                            {exception.horaFinal}
                                        </td>

                                        <td className='px-4 py-2'>{exception.motivo}</td>
                                        <td className='px-4 py-2 flex gap-2'>
                                            <p className='text-yellow-500'>Editar</p> <p className='text-red-500'>Eliminar</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    <div className="flex justify-start mt-5">
                        <ul className="flex">
                            {[...Array(pageCount)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer mx-1 px-3 py-1 ${currentPage === index ? 'bg-[#82b440] text-white' : 'bg-gray-300'
                                        }`}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

            </section>


            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl mb-4">Agregar Excepción</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empleado">
                                    Empleado
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="empleado"
                                    value={selectedEmployee}
                                    onChange={handleSelectChange}
                                >
                                    <option value="">Seleccionar empleado...</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.nombre} {user.apellidos}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desde">
                                    Desde
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desde"
                                    type="datetime-local" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hasta">
                                    Hasta
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hasta" type="datetime-local" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motivo">
                                    Motivo
                                </label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="motivo" placeholder="Motivo de la excepción"></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={toggleModal}>Cancelar</button>
                                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddException}>Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
