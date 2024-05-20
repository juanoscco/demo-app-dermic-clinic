"use client"
import React, { useState } from 'react'
import { users } from "@/mocks/Users/users.mocks"
import { op_agenda } from "@/mocks/OpeningAgenda/op-agenda.mocks";

// types.ts

export type AgendaItem = {
  id: number;
  empleado: string;
  fecha: string;
  horaInicio: string;
  horaFinal: string;
};

const itemsPerPage: number = 10; // Cambia esto según tu necesidad


export default function PersonsAgendaOpening() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddException = () => {
    toggleModal();
  };

  const [selectedEmployee, setSelectedEmployee] = useState('');

  const handleSelectChange = (event: any) => {
    setSelectedEmployee(event.target.value);
  };

  // *-----------------------------------------------------

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredAgendaItems = op_agenda.filter((item) =>
    item.empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fecha.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const pageCount: number = Math.ceil(op_agenda.length / itemsPerPage);

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

  let sortedAgendaItems = [...filteredAgendaItems];

  if (sortConfig.key) {
    sortedAgendaItems.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof AgendaItem];
      const bValue = b[sortConfig.key as keyof AgendaItem];
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const displayedAgendaItems = sortedAgendaItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <React.Fragment>
      <h1 className='text-2xl font-bold px-2 mb-2'>Apertura de agenda</h1>
      <section className='gap-5 w-full h-full'>
        <section className='rounded-md w-full h-full'>
          <section className='bg-white flex justify-between items-center rounded-md p-4'>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar"
              className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
            />            <div className='flex gap-3 items-center'>
              <button onClick={toggleModal} className='bg-sky-600 text-white px-2 py-1 rounded-md'>Agregar</button>
              <button className='bg-green-600 text-white px-2 py-1 rounded-md'>Excel</button>
              <button className='bg-gray-400 text-white px-2 py-1 rounded-md'>Imprimir</button>
            </div>
          </section>
          <section className='w-full bg-white h-4/6 rounded-md mt-4 overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Empleado</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Hora Inicio</th>
                  <th className="px-4 py-2 text-left">Hora Final</th>
                </tr>
              </thead>
              <tbody>
                {displayedAgendaItems.map((agenda) => (
                  <tr key={agenda.id} className='border-t border-gray-200'>
                    <td className='px-4 py-2'>{agenda.empleado}</td>
                    <td className='px-4 py-2'>{agenda.fecha}</td>
                    <td className='px-4 py-2'>{agenda.horaInicio}</td>
                    <td className='px-4 py-2'>{agenda.horaFinal}</td>
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
        </section>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Agregar Apertura</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empleado">
                  Empleado
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="empleado"
                  value={selectedEmployee}
                  onChange={handleSelectChange}
                >
                  <option value="">Seleccionar empleado...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.nombre} {user.apellidos}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desde">
                  Fecha
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desde"
                  type="date" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hasta">
                  Hora Inicio
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hasta" type="time" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hasta">
                  Hora Final
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hasta" type="time" />
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={toggleModal}>Cancelar</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddException}>Agregar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>

  )
}
