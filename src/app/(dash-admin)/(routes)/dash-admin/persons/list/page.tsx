"use client"
import React, { useState, useEffect } from 'react'
import { useGetEmployeesQuery } from './store/service'
import { DatatableComponent } from "@/components/datatable/";
import Link from 'next/link';


export default function UserList() {
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const { data, error, isLoading, refetch } = useGetEmployeesQuery({ limit: perPage, page: currentPage - 1, filter })

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [filter, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading patients</div>;


    // console.log(data)
    const columns = [
        {
            title: 'Empleado',
            displayName: 'Nombre',
            field: 'nombres',
            render: (fieldValue: any, item: any) => (
                <div>
                    <h1>{fieldValue.toLowerCase()}</h1>
                    <span>DNI: {item.numero}</span>
                </div>
            )
        },
        {
            title: 'Datos',
            displayName: 'Datos',
            field: 'telefono',
            render: (fieldValue: any, item: any) => (
                <div>
                    <h1>{item.titulo.descripcion}</h1>
                    <span>{fieldValue}</span>
                </div>
            )
        },
        {
            title: 'Sede',
            displayName: 'Sede',
            field: 'sede',
            render: (fieldValue: any, item: any) => (
                <div>
                    <h1>{item.sede.nombres}</h1>
                    <span>{fieldValue.direccion}</span>
                </div>
            )
        },
        {
            title: 'Acciones',
            displayName: 'Acción',
            field: 'id_empleado',
            render: (fieldValue: any) => (
                <div>
                    <Link
                        href={`/dash-admin/persons/list/${fieldValue}`}
                        className='bg-gray-400 p-2 rounded-md text-white'>Detalle</Link>
                </div>
            ),
        },
    ]

    // const tableHTML = `          
    //       <table className="w-full border-collapse">
    //         <thead>
    //           <tr>
    //             <th className='px-4 py-2'>Nombre</th>
    //             <th className="px-4 py-2">Apellidos</th>
    //             <th className="px-4 py-2">Email</th>
    //             <th className="px-4 py-2">DNI</th>
    //             <th className="px-4 py-2">Rol</th>
    //             <th className="px-4 py-2">Teléfono</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           ${users.map(user => `
    //             <tr key=${user.id} className='border-t border-gray-200'>
    //               <td className='px-4 py-2'>${user.nombre}</td>
    //               <td className="px-4 py-2">${user.apellidos}</td>
    //               <td className="px-4 py-2">${user.email}</td>
    //               <td className="px-4 py-2">${user.dni}</td>
    //               <td className="px-4 py-2">${user.rol}</td>
    //               <td className="px-4 py-2">${user.telefono}</td>
    //             </tr>
    //           `).join('')}
    //         </tbody>
    //       </table>
    //     `;

    return (
        <React.Fragment>
            <h1 className='text-2xl '>Lista de empleados</h1>

            {/* <div className='flex xl:justify-between flex-col xl:flex-row mt-5 bg-white rounded-md p-4'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar"
                    className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
                />
                <div className='flex items-center gap-3'>
                    <button
                        className='p-2 bg-green-500 rounded-md text-white'
                        onClick={() => exportToExcel(users, "personal.xlsx")}
                    >
                        Excel
                    </button>
                    <button
                        className='bg-gray-500 p-2 text-white rounded-md'
                        onClick={() => handlePrint(tableHTML)}
                    >
                        Imprimir
                    </button>
                    <Link href='/dash-admin/persons/create'>
                        <button className='p-2 bg-sky-500 rounded-md text-white'>Crear</button>
                    </Link>
                </div>
            </div>

            <div className='bg-white p-2 rounded-md w-full xl:h-[30rem] h-full overflow-auto'>
                <table className="w-full border-collapse" >
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
                            <th className='className="px-4 py-2 text-left'>Accion</th>
                        </tr>
                    </thead>
                    <tbody >
                        {displayedUsers.map((users) => (
                            <tr key={users.id} className='border-t border-gray-200'>
                                <td className='px-4 py-2'>{users.nombre} </td>
                                <td className="px-4 py-2">{users.apellidos}</td>
                                <td className="px-4 py-2">{users.dni}</td>
                                <td className="px-4 py-2">{users.rol}</td>
                                <td>
                                    <Link href={`/dash-admin/persons/list/${users.slug}`}>ver detalles</Link>
                                </td>
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
            </div> */}

            <DatatableComponent
                data={data?.data}
                isLoading={isLoading}
                error={error}
                columns={columns}
                perPage={perPage}
                setPerPage={setPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                // refetch={refetch}
                setFilter={setFilter}
                filter={filter}
            />


        </React.Fragment>
    )
}
