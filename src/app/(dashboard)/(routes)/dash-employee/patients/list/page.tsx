"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
// import { useGetPatientsQuery } from "./store/service/list-patient.service";
import { DatatableComponent } from "@/components/datatable/";
import { ExcelExport } from "@/utils/excel";
import { PrintButton } from "@/utils/print";

// 
import { useGetPatientsQuery } from "@/app/(dashboard)/store"

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
      field: 'telefono', //FieldValue
      render: (fieldValue: any, item: any) => (
        <div>
          <h1>{fieldValue}</h1>
          <span>{item.email}</span>
        </div>
      )
    },
    {
      title: 'Ubicación',
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
            href={`/dash-employee/patients/list/${fieldValue}`}
            className='bg-gray-400 p-2 rounded-md text-white'>Detalle</Link>
        </div>
      ),
    },
  ];


  // };
  // const handlePrint = () => {
  // };

  const columnsForExcelAndPrint = {
    nombres: 'Nombre Del Paciente',
    telefono: 'Teléfono',
    direccion: 'Dirección',
    distrito: 'Distrito',
    email: 'Correo Electrónico',
    numero_documento_identidad: 'Número de Documento'
  }
  const handleExportExcel = ExcelExport({ data: data?.data.content, columns: columnsForExcelAndPrint, filename: 'Pacientes' })

  const handlePrint = PrintButton({ data: data?.data?.content, columns: columnsForExcelAndPrint, nametitle: 'Pacientes' })

  const paginationControls = {
    perPageOptions: [10, 20, 30, 40, 50],
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
      <h1 className='text-2xl'>Lista de pacientes </h1>
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
