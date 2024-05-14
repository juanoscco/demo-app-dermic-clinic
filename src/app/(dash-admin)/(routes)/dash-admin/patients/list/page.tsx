"use client"

import React, { useState } from 'react'
import { patients } from "@/mocks/Patients/patients.mocks";
import Link from 'next/link';

type Patient = {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  estadoCivil: string;
  ocupacion: string;
  direccion: string;
  lugarNacimiento: string;
};

export default function PatientsList() {

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(10);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

  const handleSort = (key: string) => {
    let direction: any = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  let sortedPatients = [...filteredPatients];

  if (sortConfig.key) {
    sortedPatients.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Patient];
      const bValue = b[sortConfig.key as keyof Patient];
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  // Cálculo de los pacientes a mostrar en la página actual
  const displayedPatients = sortedPatients.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );



  const pageCount: number = Math.ceil(patients.length / itemsPerPage);


  return (
    <React.Fragment>
      <h1 className='text-2xl'>Lista de pacientes </h1>
      <div className='flex xl:justify-between flex-col xl:flex-row mt-3 bg-white rounded-md p-4'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar"
          className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
        />
        {/* TODO: FALTA HACER QUE FUNCIONE EL EXCEL Y EL IMPRIMIR */}
        <div className='flex items-center gap-3'>
          <button className='p-2 bg-green-500 rounded-md text-white'>
            Excel
          </button>
          <button className='bg-gray-500 p-2 text-white rounded-md'>
            Imprimir
          </button>
          <Link href='/dash-admin/patients/create'>
            <button className='p-2 bg-sky-500 rounded-md text-white'>Crear</button>
          </Link>
        </div>
      </div>
      <section className='bg-white p-2 rounded-md w-full xl:h-[30rem] h-full overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className="border-t border-gray-200">
              <th className='px-4 py-2 text-left' onClick={() => handleSort('nombres')}>Nombre
                {sortConfig.key === 'nombres' && (
                  <span className='ml-1'> {sortConfig.direction === 'ascending' ? '↑' : '↓'} </span>
                )} </th>
              <th className='px-4 py-2 text-left' onClick={() => handleSort('apellidos')}>
                Apellidos
                {sortConfig.key === 'apellidos' && (
                  <span className='ml-1'> {sortConfig.direction === 'ascending' ? '↑' : '↓'} </span>
                )} </th>
              <th className='px-4 py-2 text-left'>Email</th>
              <th className='px-4 py-2 text-left'>DNI</th>
              <th className='px-4 py-2 text-left'>Fecha de Nacimiento</th>
              <th className='px-4 py-2 text-left'>Estado civil</th>
              <th className='px-4 py-2 text-left'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedPatients.map((patient) => (
              <tr key={patient.id} className='border-t border-gray-200'>
                <td className='px-4 py-2'>{patient.nombres}</td>
                <td className='px-4 py-2'>{patient.apellidos}</td>
                <td className='px-4 py-2'>{patient.email}</td>
                <td className='px-4 py-2'>{patient.dni}</td>
                <td className='px-4 py-2'>{patient.fechaNacimiento}</td>
                <td className='px-4 py-2'>{patient.estadoCivil}</td>
                <td className='px-4 py-2'>
                  <button className='bg-gray-400 p-1 rounded-md text-white'>Crear cita</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="flex justify-start mt-5">
        <ul className="flex">
          {[...Array(pageCount)].map((_, index) => (
            <li
              key={index}
              className={`cursor-pointer mx-1 px-3 py-1 ${currentPage === index ? 'bg-[#82b440] text-white' : 'bg-gray-300'
                }`}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}
