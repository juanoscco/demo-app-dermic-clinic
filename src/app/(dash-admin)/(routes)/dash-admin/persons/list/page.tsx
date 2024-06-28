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
