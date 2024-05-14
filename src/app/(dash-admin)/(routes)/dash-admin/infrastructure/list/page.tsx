"use client"
import React, { useState } from 'react'
import { infrastructure } from '@/mocks/infrastructure/infrastructure.mocks';
import Link from "next/link"

const itemsPerPage: number = 10; // Cambia esto según tu necesidad
// types.ts
export type InfrastructureItem = {
  id: number;
  lugar: string;
  codigoLocalizacion: string;
  direccion: string;
  celular: string;
  estado: string;
  cuartos: {
    cuarto: string;
    piso: string;
    estadoCuarto: string;
  }[];
};

export default function InfrastructureList() {

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCuartos = infrastructure.filter((cuarto) =>
    cuarto.lugar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cuarto.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    // cuarto.lugar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };
  const pageCount: number = Math.ceil(filteredCuartos.length / itemsPerPage);

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

  let sortedCuartos = [...filteredCuartos];

  if (sortConfig.key) {
    sortedCuartos.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof InfrastructureItem];
      const bValue = b[sortConfig.key as keyof InfrastructureItem];
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const displayedCuartos = sortedCuartos.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log(infrastructure)
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Infraestructura</h1>

      <div className='flex lg:justify-between flex-col lg:flex-row mt-5 bg-white rounded-md p-4'>
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
          <Link href='/dash-admin/infrastructure/create'>
            <button className='p-2 bg-sky-500 rounded-md text-white'>Crear</button>
          </Link>
        </div>
      </div>
      <section className='bg-white p-2 rounded-md w-full xl:h-[30rem] h-full overflow-x-auto'>
        <table className="w-full border-collapse">
          <thead>
            <tr className='border-t border-gray-200'>
              <th  className="px-4 py-2 text-left" onClick={() => handleSort('lugar')}>Distrito
                  {sortConfig.key === 'lugar' && (
                    <span className='ml-1'>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
              </th>
              <th  className="px-4 py-2 text-left" onClick={() => handleSort('direccion')}>Dirección
                  {sortConfig.key === 'direccion' && (
                    <span className='ml-1'>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
              </th>
              <th className="px-4 py-2 text-left">
                Ver
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCuartos.map((rooms) => (
              <tr key={rooms.id}>
                <td className='px-4 py-2'>{rooms.lugar}</td>
                <td className='px-4 py-2'>{rooms.direccion}</td>
                <td className='px-4 py-2'>
                  <button>Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
}
