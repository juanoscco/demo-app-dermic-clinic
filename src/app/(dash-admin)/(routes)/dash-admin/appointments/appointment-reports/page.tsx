"use client";
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useGetInfrastructureQuery } from '../../infrastructure/list/store/service';
import { useGetAppointmentListQuery } from '../components/citas/list/store/service';
import { formatTime } from "@/utils/formatTime";
import Link from 'next/link';

const ITEMS_PER_PAGE = 10; // Número de elementos por página


export default function AppointmentReports() {

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedSede, setSelectedSede] = useState<number>(1);
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: dataAppointments, isLoading: loadingAppointments, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, filter: '' });
  const { data: dataInfrastructure, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 15, page: 0, filter: '' });

  const appointments = useMemo(() => dataAppointments?.data?.content?.filter((item: any) => item.estado), [dataAppointments]);
  const infrastructure = useMemo(() => dataInfrastructure?.data?.content?.filter((item: any) => item.estado), [dataInfrastructure]);

  useEffect(() => {
    if (!loadingAppointments && !loadingInfra && appointments && infrastructure) {
      const initialStartDate = new Date();
      const initialEndDate = new Date();
      initialStartDate.setDate(initialStartDate.getDate() - 3);

      setStartDate(initialStartDate.toISOString().split('T')[0]);
      setEndDate(initialEndDate.toISOString().split('T')[0]);
    }
  }, [loadingAppointments, loadingInfra, appointments, infrastructure]);

  const filterAppointments = useCallback(() => {
    if (startDate && endDate && appointments) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const filtered = appointments.filter((appointment: any) => {
        const appointmentDate = new Date(appointment.fecha_cita);
        return (
          appointmentDate >= start &&
          appointmentDate <= end &&
          appointment.sede.id_sede === selectedSede
        );
      });

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setFilteredAppointments(filtered.slice(startIndex, endIndex));
    }
  }, [startDate, endDate, selectedSede, appointments, currentPage]);

  useEffect(() => {
    filterAppointments();
  }, [filterAppointments]);

  const fetchAllData = useCallback(() => {
    if (!loadingAppointments && !loadingInfra) {
      refetchAppointment();
      refetchInfra();
    }
  }, [loadingAppointments, loadingInfra, refetchAppointment, refetchInfra]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAllData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchAllData]);

  const totalItems = useMemo(() => filteredAppointments.length, [filteredAppointments]);
  const totalPages = useMemo(() => Math.ceil(totalItems / ITEMS_PER_PAGE), [totalItems]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);


  return (
    <React.Fragment>
      <h1 className='text-2xl mb-2'>Reporte de citas</h1>
      <section className="bg-white p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span>Desde:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span>Hasta:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span>Lugar:</span>
            <select
              value={selectedSede}
              onChange={(e) => setSelectedSede(parseInt(e.target.value, 10))}
              className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              {infrastructure?.map((infra: any, i: number) => (
                <option key={i} value={infra.id_sede} className="capitalize">
                  {infra.nombres}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>


      <section className="flex flex-col md:flex-row mt-4 p-3 gap-3 bg-white items-center justify-between">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full md:w-auto outline-none border border-gray-200 p-2 rounded-lg"
        />
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-2">
          <button className="w-full md:w-auto bg-green-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            Excel
          </button>
          <button className="w-full md:w-auto bg-blue-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            Imprimir
          </button>
        </div>
      </section>


      <section className="p-4 bg-white h-4/6" >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th scope="col" className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Sala</th>
              <th scope="col" className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Fecha cita</th>
              <th scope="col" className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Hora de Entrada</th>
              <th scope="col" className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Hora de Atención</th>
              <th scope="col" className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Hora de Salida</th>
              <th scope="col" className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAppointments?.map((appointment: any) => (
              <tr key={appointment.id_cita} className="border-b border-gray-200">
                <td className="px-4 py-2 text-xs sm:text-sm">{appointment.paciente.nombres}</td>
                <td className="px-4 py-2 text-xs sm:text-sm flex flex-col">
                  <span>{appointment.sala_tratamiento.nombres}</span>
                  <span>{appointment.procedimiento.nombres}</span>

                </td>
                <td className="px-4 py-2 text-xs sm:text-sm">{appointment.fecha_cita}</td>
                <td className="px-4 py-2 text-xs sm:text-sm">{formatTime(appointment.cita_info.hora_entrada)}</td>
                <td className="px-4 py-2 text-xs sm:text-sm">{formatTime(appointment.cita_info.hora_atencion)}</td>
                <td className="px-4 py-2 text-xs sm:text-sm">{formatTime(appointment.cita_info.hora_salida)}</td>
                <td className="px-4 py-2 text-xs sm:text-sm">
                  <Link className="text-blue-500 hover:underline" href={`list/${appointment.id_cita}`} passHref>
                    <>Detalle</>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </section>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}, Mostrando {totalItems} elementos
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm rounded-md border border-gray-300 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50 hover:text-blue-600'}`}
          >
            Atrás
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm rounded-md border border-gray-300 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50 hover:text-blue-600'}`}
          >
            Adelante
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}
