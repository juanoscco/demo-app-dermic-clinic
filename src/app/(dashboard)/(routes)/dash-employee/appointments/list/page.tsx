"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ExcelExport } from "@/utils/excel";
import { PrintButton } from "@/utils/print";

import { useGetAppointmentListQuery, useGetEmployeeByIdQuery } from "@/app/(dashboard)/store"
import { decodeToken } from '@/app/(dashboard)/utils';


const formatDate = (date: string | Date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};
const formatTime = (timeString: string) => {
  if (!timeString) return "";

  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds);

  let formattedHours = date.getHours();
  const formattedMinutes = date.getMinutes();
  const period = formattedHours >= 12 ? 'PM' : 'AM';

  // Convertir a formato de 12 horas
  formattedHours = formattedHours % 12;
  formattedHours = formattedHours ? formattedHours : 12; // La hora '0' debe mostrarse como '12'

  return `${formattedHours}:${formattedMinutes < 10 ? '0' + formattedMinutes : formattedMinutes} ${period}`;
};
export default function AppointmentList() {

  const { data: appointments, isLoading: loadingAppointments, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, filter: '' });

  const decoded = decodeToken({})
  const { data: dataEmployee, isLoading: loadingEmployee, refetch: refetchEmployee } = useGetEmployeeByIdQuery(decoded?.id_empleado);

  const employee = dataEmployee?.data;

  const refetchEmployeeCallback = useCallback(() => {
    if (!loadingEmployee) {
      refetchEmployee();
    }
  }, [loadingEmployee, refetchEmployee]);

  useEffect(() => {
    refetchEmployeeCallback();
  }, [refetchEmployeeCallback]);

  const today = formatDate(new Date());

  const appointmentsData = appointments?.data?.content;

  // **********
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = useCallback(() => {
    if (loadingAppointments || !appointmentsData) return [];
  
    return appointmentsData.filter((appointment: any) => {
      const appointmentDate = appointment.fecha_cita;
      const matchesSearchTerm = (
        appointment.paciente?.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.paciente?.numero_documento_identidad?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesSelectedDate = appointmentDate === selectedDate;
      const matchesEmployeeSede = employee && appointment.sede.id_sede === employee.sede.id_sede; // Include this line
  
      return matchesSelectedDate && matchesEmployeeSede && matchesSearchTerm && appointment.estado;
    });
  }, [appointmentsData, selectedDate, searchTerm, loadingAppointments, employee]);
  

  const paginatedAppointments = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAppointments().slice(startIndex, endIndex);
  }, [filteredAppointments, currentPage, itemsPerPage]);

  const totalItems = filteredAppointments().length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    refetchAppointment();
  }, [selectedDate, refetchAppointment]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);


  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia la cantidad de elementos por página
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia el término de búsqueda
  };


  const columnsForExcelAndPrint = {
    'procedimiento.nombres': 'Nombre del Procedimiento',
    'sala_tratamiento.nombres': 'Nombre de la Sala de Tratamiento',
    'sala_tratamiento.piso': 'Piso de la Sala de Tratamiento',
    'sede.nombres': 'Nombre de la Sede',
    'paciente.nombres': 'Nombre del Paciente',
    'paciente.numero_documento_identidad': 'Número de Documento del Paciente',
    'paciente.telefono': 'Teléfono del Paciente',
    'fecha_cita': 'Fecha de la Cita',
    'empleado.nombres': 'Nombre del Empleado',
    'horario.descripcion': 'Hora de la Cita'
  };
  const handleExportExcel = ExcelExport({ data: paginatedAppointments(), columns: columnsForExcelAndPrint, filename: 'Citas' })

  const handlePrint = PrintButton({ data: paginatedAppointments(), columns: columnsForExcelAndPrint, nametitle: 'Citas' })

  return (
    <React.Fragment>
      <h1 className='text-2xl'>Lista de Citas</h1>
      <section className='flex gap-3 flex-col xl:flex-row mt-5 xl:justify-between bg-white rounded-md p-4'>
        <section className='flex gap-3 flex-col xl:flex-row'>
          <input
            type="date"
            className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}

          />
          <select
            className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
            value={employee?.sede.id_sede}
            // onChange={(e) => setSelectedDistrict(parseInt(e.target.value, 10))}
            disabled
          >



            <option value={ employee?.sede.id_sede}> {employee?.sede.nombres}</option>

          </select>
        </section>

      </section>


      <section
        className='flex xl:justify-between flex-col xl:flex-row mt-5 gap-3 bg-white rounded-md p-3'
      >
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md mb-2 outline-none w-full md:w-auto"
        />
        <div className="flex flex-col xl:flex-row items-center gap-3 ">
          <button
            onClick={handleExportExcel}
            className="p-2 bg-green-500 rounded-md text-white w-full md:w-auto">
            Excel
          </button>
          <button
            onClick={handlePrint}
            className="p-2 bg-gray-500 text-white rounded-md mt-2 xl:mt-0 w-full md:w-auto">
            Imprimir
          </button>
        </div>
      </section>


      <section className='bg-white p-2 rounded-md w-full xl:h-[35rem] h-full overflow-x-auto'>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2 text-left">Paciente</th>
              <th className="px-4 py-2 text-left">Sala</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Llegada</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Salida</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments()?.map((appointment: any) => (
              <tr key={appointment?.id_cita} className='border-b'>
                <td className="px-4 py-2">
                  <p>{appointment?.paciente.nombres}</p>
                  <p>{appointment?.paciente.numero_documento_identidad}</p>
                </td>
                <td className="px-4 py-2">
                  {appointment?.sala_tratamiento.nombres}
                </td>
                <td className="px-4 py-2">
                  {appointment?.horario.descripcion}
                </td>
                <td>{formatTime(appointment?.cita_info.hora_entrada)}</td>
                <td>{formatTime(appointment?.cita_info.hora_atencion)}</td>
                <td>{formatTime(appointment?.cita_info.hora_salida)}</td>
                {/* <td></td> */}
                <td className="px-4 py-2">
                  <Link href={`list/${appointment.id_cita}`}>Detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className='bg-white p-3 flex justify-between items-center  rounded-lg'>
        <div className='flex gap-3 items-center'>
          <div className='flex gap-2 items-center'>
            <label htmlFor="itemsPerPage" className='text-gray-700'>Items per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className='border border-gray-300 rounded-md p-1'
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span className='text-gray-600'>Total items: {totalItems}</span>
        </div>
        <div className='flex gap-3 items-center'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'} `}
          >
            Previous
          </button>
          <span className='text-gray-700'>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'} `}
          >
            Next
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}
