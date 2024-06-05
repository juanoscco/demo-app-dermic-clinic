"use client"
import React, { useState, useEffect } from 'react'
import { useGetScheludesQuery } from './components/list/store/service';
import { DatatableComponent } from "@/components/datatable/";
import Link from 'next/link';

export default function PersonsSchedulesList() {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState('');
  const { data, isLoading, error, refetch } = useGetScheludesQuery({ page: currentPage - 1, limit: perPage, filter })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error al cargar los horarios</div>;

  const schedulesDays = (item: any) => {
    const filteredDetails = item?.horario_trabajo_detalle.filter((detail: any) => detail.estado === true);

    return filteredDetails.map(

      (detail: any, i: number) => (
        <>
          <p className='flex gap-2' key={i}>{detail.semana.descripcion}</p>
        </>
      )
    )
  }


  const columns = [
    {
      title: 'Nombre de Horario',
      displayName: 'Nombre de Horario',
      field: 'id_horario_trabajo', //FieldValue
      render: (fieldValue: any, item: any) => (
        <div>
          <h1>{item.empleado.nombres.toLowerCase()}</h1>
          <span>{item.nombre_horario}</span>
        </div>
      )
    },
    {
      title: 'Nombre de Horario',
      displayName: 'Nombre de Horario',
      field: 'id_horario_trabajo', //FieldValue
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


  return (
    <React.Fragment>
      <h1 className='text-2xl'>Lista de Horario</h1>
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
