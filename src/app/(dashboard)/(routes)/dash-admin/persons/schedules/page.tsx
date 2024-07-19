"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { DatatableComponent } from "@/components/datatable/";
import Link from 'next/link';


import { useGetScheludesQuery } from "@/app/(dashboard)/store"

export default function PersonsSchedulesList() {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState('');
  const { data, isLoading, error, refetch } = useGetScheludesQuery({ page: currentPage - 1, limit: perPage, filter })



  const schedulesDays = useCallback((item: any) => {
    const filteredDetails = item?.horario_trabajo_detalles.filter((detail: any) => detail.estado === true);

    return filteredDetails?.map((detail: any) => (
      <p className='flex gap-2' key={detail.id_horario_trabajo_detalle}>{detail.semana.descripcion}</p>
    ));
  }, []);

  const columns = [
    {
      title: 'Horario',
      displayName: 'Nombre de Horario',
      field: '', //FieldValue
      render: (fieldValue: any, item: any) => (
        <div>
          <h1>{item.empleado.nombres.toLowerCase()}</h1>
        </div>
      )
    },
    {
      title: 'Dias',
      displayName: 'Dias de trabajo',
      field: '', //FieldValue
      render: (fieldValue: any, item: any) => (

        <div className='flex gap-2'>{schedulesDays(item)}</div>

      )
    },
    {
      title: 'Detalle',
      displayName: 'Detalle',
      field: 'id_horario_trabajo', //FieldValue
      render: (fieldValue: any, item: any) => (

        <Link href={`/dash-admin/persons/list/${item.empleado.id_empleado}`} className='text-gray-500 hover:text-gray-700'>Detalle</Link>

      )
    },
  ]

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error al cargar los horarios</div>;


  const paginationControls = {
    perPageOptions: [10, 20, 30, 40],
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage
  };
  const headers = (
    <div className='flex items-center gap-3'>

      {/* <button
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
      </button> */}
    </div>
  );
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Lista de Horario</h1>
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
