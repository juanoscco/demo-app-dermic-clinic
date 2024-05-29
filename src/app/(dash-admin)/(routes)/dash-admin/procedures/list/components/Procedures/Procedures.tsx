"use client"
import React, { useState, useEffect } from 'react'
// import Link from "next/link"
import { useGetProceduresQuery } from './store/service'
import { DatatableComponent } from '@/components/datatable';
import UpdateProceduresComponents from './update-procedures/update-procedures.components';


export default function Procedures() {

    // update
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProcedureId, setSelectedProcedureId] = useState<number | null>(null);
    // End update

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
                    <button className='text-red-500 hover:text-red-700'>Eliminar</button>
                </div>
            )
        }

    ]
    return (
        <React.Fragment>
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

            {showPopup && selectedProcedure &&
                <UpdateProceduresComponents
                    onClose={togglePopup}
                    id={selectedProcedure.id_procedimiento}
                    data={selectedProcedure}
                    update={refetch}
                />

            }
        </React.Fragment>
    )
}
