"use client"
import React, { useState } from 'react'
import { users } from "@/mocks/Users/users.mocks"
import Link from 'next/link';


const itemsPerPage: number = 10; // Cambia esto según tu necesidad
// types.ts

export type User = {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    dni: string;
    rol: string;
    telefono: string;
};


export default function UserList() {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredUsers = users.filter((user) =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState<number>(0);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };
    const pageCount: number = Math.ceil(users.length / itemsPerPage);


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

    let sortedUsers = [...filteredUsers];

    if (sortConfig.key) {
        sortedUsers.sort((a, b) => {
            const aValue = a[sortConfig.key as keyof User];
            const bValue = b[sortConfig.key as keyof User];
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    const displayedUsers = sortedUsers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <React.Fragment>
            <h1 className='text-2xl '>Lista de usuarios</h1>
            <div className='flex xl:justify-between flex-col xl:flex-row mt-5 bg-white rounded-md p-4'>
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
                    <Link href='/dash-admin/persons/create'>
                        <button className='p-2 bg-sky-500 rounded-md text-white'>Crear</button>
                    </Link>
                </div>
            </div>

            <div className='bg-white p-2 rounded-md w-full xl:h-[30rem] h-full overflow-auto'>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-t border-gray-200">
                            <th className="px-4 py-2 text-left" onClick={() => handleSort('nombre')}>
                                Nombre {sortConfig.key === 'nombre' && (
                                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                )}
                            </th>
                            <th className="px-4 py-2 text-left" onClick={() => handleSort('apellidos')}>
                                Apellidos {sortConfig.key === 'apellidos' && (
                                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                )}
                            </th>
                            <th className="px-4 py-2 text-left" onClick={() => handleSort('email')}>
                                Email {sortConfig.key === 'email' && (
                                    <span className='ml-1'> {sortConfig.direction === 'ascending' ? '↑' : '↓'} </span>
                                )}
                            </th>
                            <th className="px-4 py-2 text-left" onClick={() => handleSort('dni')}>
                                DNI {sortConfig.key === 'dni' && (
                                    <span className='ml-1'> {sortConfig.direction === 'ascending' ? '↑' : '↓'} </span>
                                )}
                            </th>
                            <th className="px-4 py-2 text-left" onClick={() => handleSort('rol')}>
                                Rol {sortConfig.key === 'rol' && (
                                    <span className='ml-1'> {sortConfig.direction === 'ascending' ? '↑' : '↓'} </span>
                                )}
                            </th>
                            <th className="px-4 py-2 text-left" onClick={() => handleSort('telefono')}>
                                Teléfono {sortConfig.key === 'telefono' && (
                                    <span className='ml-1'> {sortConfig.direction === 'ascending' ? '↑' : '↓'} </span>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {displayedUsers.map((users) => (
                            <tr key={users.id} className='border-t border-gray-200'>
                                <td className='px-4 py-2'>{users.nombre} </td>
                                <td className="px-4 py-2">{users.apellidos}</td>
                                <td className="px-4 py-2">{users.email}</td>
                                <td className="px-4 py-2">{users.dni}</td>
                                <td className="px-4 py-2">{users.rol}</td>
                                <td className="px-4 py-2">{users.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
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
