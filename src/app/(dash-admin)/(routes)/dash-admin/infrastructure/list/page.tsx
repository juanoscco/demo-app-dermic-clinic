"use client"
import React, { useState, useEffect } from 'react'
import { useGetInfrastructureQuery } from "./store/service"
import Link from "next/link"
import { DatatableComponent } from '@/components/datatable/';


export default function InfrastructureList() {

  const [perPage, setPerPage] = useState(10); // Estado para almacenar el número de pacientes por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual

  const [filter, setFilter] = useState(''); // Estado para almacenar el filtro de búsqueda

  const { data, error, isLoading, refetch } = useGetInfrastructureQuery({ limit: perPage, page: currentPage - 1, filter })

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
      title: 'Nombre',
      displayName: 'Nombre',
      field: 'nombres',
      render: (fieldValue: any) => (
        <div>{fieldValue}</div>
      )
    },
    {
      title: 'Direccion',
      displayName: 'Direccion',
      field: 'direccion',
      render: (fieldValue: any) => (
        <div>{fieldValue}</div>
      )
    },
    {
      title: 'Acciones',
      displayName: 'Acción',
      field: 'id_sede',
      render: (fieldValue: any) => (
        <div className='flex items-center'>
          <Link
            href={`/dash-admin/infrastructure/list/${fieldValue}`}
            className=' rounded-md text-gray-500 hover:text-gray-900'
          >Detalle</Link>
        </div>
      )
    },
  ]

  console.log(data?.data)
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Infraestructura</h1>
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
  );
}
