"use client"
import React, { useState, useEffect } from 'react'
import { useGetAgendaQuery } from './components/list/store/service'
import Link from 'next/link';
import { DatatableComponent } from '@/components/datatable';



export default function PersonsAgendaOpening() {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState('');
  const { data, isLoading, error, refetch } = useGetAgendaQuery({ page: currentPage - 1, limit: perPage, filter })

  console.log(data)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error al cargar las aperturas de agenda</div>;

  const columns = [

    {
      title: 'Datos',
      displayName: 'Datos',
      field: 'id_agenda', //FieldValue
      render: (fieldValue: any, item: any) => (

        <div>
          <h1>{item.empleado.nombres.toLowerCase()}</h1>
          <span>{item.empleado.numero}</span>
        </div>
      )
    },
    {
      title: 'Inicio',
      displayName: 'Inicio',
      field: 'hora_inicio', //FieldValue
      render: (fieldValue: any, item: any) => (

        <div>
          <h1>{item.fecha_apertura}</h1>
          <span className='text-sm'>{fieldValue}</span>
        </div>
      )
    },
    {
      title: 'Final',
      displayName: 'Final',
      field: 'hora_final', //FieldValue
      render: (fieldValue: any, item: any) => (
        <div>
          <h1>{item.fecha_apertura}</h1>

          <span className='text-sm'>{fieldValue}</span>
        </div>

      )
    },
    {
      title: 'Detalle',
      displayName: 'Detalle',
      field: 'id_agenda', //FieldValue
      render: (fieldValue: any, item: any) => (

        <Link href={`/dash-admin/persons/list/${item.empleado.id_empleado}`} className='text-gray-500 hover:text-gray-700'>Detalle</Link>

      )
    },
  ]
  return (
    <React.Fragment>
      <h1 className='text-2xl font-bold px-2 mb-2'>Apertura de agenda</h1>
      <DatatableComponent
        data={data?.data}
        isLoading={isLoading}
        error={error}
        columns={columns}
        perPage={perPage}
        setPerPage={setPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setFilter={setFilter}
        filter={filter} />
    </React.Fragment>

  )
}
