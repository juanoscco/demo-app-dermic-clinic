"use client"
import React, { useState } from 'react'
import { procedures } from '@/mocks/procedures/procedures.mocks'
import Link from "next/link"

type Procedure = {
    id: number;
    nombre: string;
    duracion: string;
    conAnestesia: boolean;
    tipo: string;
    subtipo: string;
    estado: string;
};
export default function Datatable() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredProcedures = procedures.filter((procedure) =>
        procedure.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState<number>(0);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };
    const itemsPerPage: number = 10; // Establece el número de procedimientos por página
    const pageCount: number = Math.ceil(filteredProcedures.length / itemsPerPage);

    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({
        key: null,
        direction: 'ascending',
    });

    const handleSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    let sortedProcedures = [...filteredProcedures];

    if (sortConfig.key) {
        sortedProcedures.sort((a, b) => {
            const aValue = a[sortConfig.key as keyof typeof procedures[0]];
            const bValue = b[sortConfig.key as keyof typeof procedures[0]];
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    const displayedProcedures = sortedProcedures.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <React.Fragment>
            <div className='flex xl:justify-between flex-col xl:flex-row p-3 mt-2 bg-white rounded-t-md '>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar"
                    className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
                />
                {/* TODO: FALTA HACER QUE FUNCIONE EL EXCEL Y EL IMPRIMIR */}
                <div className='flex items-center gap-3'>
                    <button className='p-2 bg-green-500 rounded-md text-white'>
                        Excel
                    </button>
                    <button className='bg-gray-500 p-2 text-white rounded-md'>
                        Imprimir
                    </button>
                    <Link href='/dash-admin/procedures/create'>
                        <button className='p-2 bg-sky-500 rounded-md text-white'>Crear</button>
                    </Link>
                </div>

            </div>
            <section className='bg-white rounded-md w-full xl:h-[30rem] h-full overflow-x-auto '>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className="border-t border-gray-200">
                            <th className="px-4 py-2 text-left">Nombre</th>
                            <th className="px-4 py-2 text-left">Duracion</th>
                            {/* <th className="px-4 py-2 text-left">Anestecia</th> */}
                            <th className="px-4 py-2 text-left">Tipo</th>
                            <th className="px-4 py-2 text-left">Sub tipo</th>
                            <th className="px-4 py-2 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProcedures.map((procedure) => (
                            <tr key={procedure.id} className='border-t border-gray-200'>
                                <td className='px-4 py-2'>{procedure.nombre}</td>
                                <td className='px-4 py-2'>{procedure.duracion}</td>
                                {/* <td className='px-4 py-2'>{procedure.conAnestesia}</td> */}
                                <td className='px-4 py-2'>{procedure.tipo}</td>
                                <td className='px-4 py-2'>{procedure.subtipo}</td>
                                <td className='px-4 py-2'>{procedure.estado}</td>
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
        </React.Fragment>
    )
}
