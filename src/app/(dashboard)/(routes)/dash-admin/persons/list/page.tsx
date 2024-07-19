"use client"
import React, { useState, useEffect } from 'react'
import { useGetEmployeesQuery } from '@/app/(dashboard)/store'
import { DatatableComponent } from "@/components/datatable/";
import Link from 'next/link';
import { ExcelExport } from "@/utils/excel";
import { PrintButton } from "@/utils/print";


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


    const columnsForExcelAndPrint = {
        nombres: 'Nombre del Empleado',
        telefono: 'Teléfono',
        'titulo.descripcion': 'Título',
        'dia_sin_refriguerio.descripcion': 'Día sin refrigerio',
        'sede.nombres': 'Sede',
        'sede.direccion': 'Dirección de Sede',
        numero: 'DNI'
    };

    const handleExportExcel = ExcelExport({ data: data?.data?.content, columns: columnsForExcelAndPrint, filename: 'Empleados' });
    const handlePrint = PrintButton({ data: data?.data?.content, columns: columnsForExcelAndPrint, nametitle: 'Empleados' });

    const paginationControls = {
        perPageOptions: [10, 20, 30, 40],
        perPage,
        setPerPage,
        currentPage,
        setCurrentPage
    };
    const headers = (
        <div className='flex items-center gap-3 md:flex-row flex-col'>
            <Link
                href={`./create`}
                className='p-2 bg-blue-500 rounded-md text-white xl:w-auto w-full text-center'
            >
                Crear
            </Link>
            <button
                onClick={handleExportExcel}
                className='p-2 bg-green-500 rounded-md text-white xl:w-auto w-full'
            >
                Excel
            </button>
            <button
                onClick={handlePrint}
                className='bg-gray-500 p-2 text-white rounded-md xl:w-auto w-full'
            >
                Imprimir
            </button>
        </div>
    );
    return (
        <React.Fragment>
            <h1 className='text-2xl '>Lista de empleados</h1>

            <DatatableComponent
                data={data?.data}
                isLoading={isLoading}
                error={error}
                columns={columns}
                paginationControls={paginationControls}
                filter={filter}
                setFilter={setFilter}
                headers={headers}
            />


        </React.Fragment>
    )
}
