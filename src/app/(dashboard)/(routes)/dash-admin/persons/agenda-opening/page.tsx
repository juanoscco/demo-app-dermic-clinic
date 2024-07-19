"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { DatatableComponent } from '@/components/datatable';
import { ExcelExport } from "@/utils/excel";
import { PrintButton } from "@/utils/print";


import { useGetAgendaQuery } from "@/app/(dashboard)/store"


export default function PersonsAgendaOpening() {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState('');
  const { data, isLoading, error, refetch } = useGetAgendaQuery({ page: currentPage - 1, limit: perPage, filter })

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
  const columnsForExcelAndPrint = {
    'empleado.nombres': "Nombre del empleado",
    fecha_apertura: 'Fecha de Apertura',
    hora_inicio: 'Hora Inicio',
    hora_final: 'Hora Final'
  };
  const handleExportExcel = ExcelExport({ data: data?.data?.content, columns: columnsForExcelAndPrint, filename: 'Apertura de agenda' })

  const handlePrint = PrintButton({ data: data?.data?.content, columns: columnsForExcelAndPrint, nametitle: 'Apertura de agenda' })

  const paginationControls = {
    perPageOptions: [10, 20, 30, 40],
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage
  };
  const headers = (
    <div className='flex items-center gap-3'>

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
      <h1 className='text-2xl px-2 mb-2'>Apertura de agenda</h1>
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
