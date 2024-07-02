"use client"
import React, { useState, useEffect } from 'react'
// import Link from "next/link"
import { useGetProceduresQuery } from './store/service'
import { DatatableComponent } from '@/components/datatable';
import UpdateProceduresComponents from './update-procedures/update-procedures.components';
import { DeleteProceduresComponent } from './delete-procedures/components';
import Link from 'next/link';
import { ExcelExport } from "@/utils/excel";
import { PrintButton } from "@/utils/print";


export default function Procedures() {

    // update
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProcedureId, setSelectedProcedureId] = useState<number | null>(null);
    // End update

    // Delete

    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [selectedProcedureIdDelete, setSelectedProcedureIdDelete] = useState<number | null>(null)
    // End delete

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');

    const { data, isLoading, error, refetch } = useGetProceduresQuery({ limit: perPage, page: currentPage - 1, filter })

    // Update
    const togglePopup = (id?: number) => {
        if (id) {
            setSelectedProcedureId(id);
        }
        setShowPopup(!showPopup);
    };
    //  end update

    // Delete
    const togglePopupDelete = (id?: number) => {
        if (id) {
            setSelectedProcedureIdDelete(id)
        }
        setShowPopupDelete(!showPopupDelete)
    }
    // end delete

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [filter, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading procedures</div>;

    const selectedProcedure = selectedProcedureId !== null
        ? data.data.content.find((proc: any) => proc.id_procedimiento === selectedProcedureId)
        : null;


    const selectedDeleteProcedure = selectedProcedureIdDelete !== null
        ? data.data.content.find((proc: any) => proc.id_procedimiento === selectedProcedureIdDelete)
        : null;

    const columns = [
        {
            title: 'Procediento',
            displayName: 'Procediento',
            field: 'nombres',
            render: (fieldValue: any) => (
                <div>{fieldValue}</div>
            )
        },
        {
            title: 'Duracion',
            displayName: 'Duracion',
            field: 'duracion',
            render: (fieldValue: any) => (
                <div>{fieldValue.descripcion}</div>
            )
        },
        {
            title: 'Anestesia',
            displayName: 'Anestesia',
            field: 'anestesia',
            render: (fieldValue: any) => (
                <div>{fieldValue ? 'si' : 'no'}</div>
            )
        },
        {
            title: 'Tipo de Procedimiento',
            displayName: 'Tipo',
            field: 'tipo_procedimiento',
            render: (fieldValue: any) => (
                <div>{fieldValue.descripcion}</div>
            )
        },
        {
            title: 'Sub tipo de Procedimiento',
            displayName: 'Sub tipo',
            field: 'subtipo_procedimiento',
            render: (fieldValue: any) => (
                <div>{fieldValue.descripcion}</div>
            )
        },
        {
            title: 'Acciones',
            displayName: 'Acciones',
            field: 'id_procedimiento',
            render: (fieldValue: any) => (
                <div className='flex gap-2'>
                    <button className='text-yellow-500 hover:text-yellow-600' onClick={() => togglePopup(fieldValue)}>Editar</button>
                    <button className='text-red-500 hover:text-red-700' onClick={() => togglePopupDelete(fieldValue)}>Eliminar</button>
                </div>
            )
        }

    ]
    const columnsForExcelAndPrintProcedimiento = {
        nombres: 'Nombre del Procedimiento',
        'duracion.descripcion': 'Duración',
        anestesia: 'Anestesia',
        'tipo_procedimiento.descripcion': 'Tipo de Procedimiento',
        'subtipo_procedimiento.descripcion': 'Subtipo de Procedimiento'
    };
    
    const handleExportExcel = ExcelExport({ data: data?.data?.content, columns: columnsForExcelAndPrintProcedimiento, filename: 'Procedimientos' });
    const handlePrint = PrintButton({ data: data?.data?.content, columns: columnsForExcelAndPrintProcedimiento, nametitle: 'Procedimientos' });
    
    const paginationControls = {
        perPageOptions: [10, 20, 30, 40],
        perPage,
        setPerPage,
        currentPage,
        setCurrentPage
    };
    const headers = (
        <div className='flex items-center gap-3'>
            <Link
                href={`./create`}
                className='p-2 bg-blue-500 rounded-md text-white'

            >
                Crear
            </Link>
            <button
                onClick={handleExportExcel}
                className='p-2 bg-green-500 rounded-md text-white'
            >
                Excel
            </button>
            <button
                onClick={handlePrint}
                className='bg-gray-500 p-2 text-white rounded-md'
            >
                Imprimir
            </button>
        </div>
    );
    return (
        <React.Fragment>
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
            {showPopup && selectedProcedure &&
                <UpdateProceduresComponents
                    onClose={togglePopup}
                    id={selectedProcedure.id_procedimiento}
                    data={selectedProcedure}
                    update={refetch}
                />
            }
            {showPopupDelete && selectedDeleteProcedure && (
                <DeleteProceduresComponent
                    id={selectedDeleteProcedure.id_procedimiento}
                    // data={selectedDeleteProcedure}
                    onClose={togglePopupDelete}
                    update={refetch}
                />
            )}
        </React.Fragment>
    )
}
