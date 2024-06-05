"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useGetPatientsQuery } from "./store/service/list-patient.service";
import { DatatableComponent } from "@/components/datatable/";

// TODO: DATA IN EXCEL
// import { exportToExcel } from "@/utils/excel/excel.utils"
// import { handlePrint } from "@/utils/print/print.utils"

export default function PatientsList() {
  const [perPage, setPerPage] = useState(10); // Estado para almacenar el número de pacientes por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual

  const [filter, setFilter] = useState(''); // Estado para almacenar el filtro de búsqueda

  const { data, error, isLoading, refetch } = useGetPatientsQuery({ limit: perPage, page: currentPage - 1, filter });

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
      title: 'Paciente',
      displayName: 'Nombre del Paciente',
      field: 'nombres', //FieldValue
      render: (fieldValue: any, item: any) => (
        <div>
          <h1>{fieldValue.toLowerCase()}</h1>
          <span>{item.numero_documento_identidad}</span>
        </div>
      )
    },
    {
      title: 'Información',
      displayName: 'Datos Personales',
      field: 'telefono',//FieldValue
      render: (fieldValue: any, item: any) => (
        <div>
          <h1>{fieldValue}</h1>
          <span>{item.email}</span>
        </div>
      )
    },
    {
      title: 'Dirección',
      displayName: 'Ubicación',
      field: 'direccion', //FieldValue
      render: (fieldValue: any, item: any) => (
        <div>
          <h1>{item.distrito}</h1>
          <span>{fieldValue}</span>
        </div>
      )
    },
    {
      title: 'Acciones',
      displayName: 'Acción',
      field: 'id_paciente',
      render: (fieldValue: any) => (
        <div>
          <Link
            href={`/dash-admin/patients/list/${fieldValue}`}
            className='bg-gray-400 p-2 rounded-md text-white'>Detalle</Link>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <h1 className='text-2xl'>Lista de pacientes </h1>
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
