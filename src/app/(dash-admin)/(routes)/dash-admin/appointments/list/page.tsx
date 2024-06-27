"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useGetAppointmentListQuery } from '../components/citas/list/store/service';
import { useGetInfrastructureQuery } from '../../infrastructure/list/store/service';


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
  const { data: dataInfra, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 15, page: 0, filter: '' })

  const infrastructure = dataInfra?.data?.content;

  const today = formatDate(new Date());

  const appointmentsData = appointments?.data?.content;

  // **********
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Nuevo estado para los elementos por página
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el término de búsqueda

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia la cantidad de elementos por página
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia el término de búsqueda
  };

  const filteredAppointments = useCallback(() => {
    if (loadingAppointments || loadingInfra || !appointmentsData) return [];

    return appointmentsData.filter((appointment: any) => {
      const appointmentDate = appointment.fecha_cita;
      const matchesSearchTerm = (
        appointment.paciente?.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.paciente?.numero_documento_identidad?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return appointmentDate === selectedDate && appointment.sede.id_sede === selectedDistrict && matchesSearchTerm;
    });
  }, [appointmentsData, selectedDate, selectedDistrict, searchTerm, loadingAppointments, loadingInfra]);

  const paginatedAppointments = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAppointments().slice(startIndex, endIndex);
  }, [filteredAppointments, currentPage, itemsPerPage]);

  const totalItems = filteredAppointments().length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    refetchAppointment();
    refetchInfra();
  }, [selectedDate, selectedDistrict, refetchAppointment, refetchInfra]);

  useEffect(() => {
    // Reset page to 1 when filters change
    setCurrentPage(1);
  }, [selectedDate, selectedDistrict]);




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
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(parseInt(e.target.value, 10))}
          >

            {infrastructure?.map((infra: any, i: number) => (
              <React.Fragment key={i}>
                <option value={infra.id_sede} className='capitalize'>{infra.nombres}</option>
                {/* <option value="Sede san isidro">San Isidro</option> */}
              </React.Fragment>
            ))}

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
          <button className="p-2 bg-green-500 rounded-md text-white w-full md:w-auto">
            Excel
          </button>
          <button className="p-2 bg-gray-500 text-white rounded-md mt-2 xl:mt-0 w-full md:w-auto">
            Imprimir
          </button>
        </div>
      </section>


      <section className='bg-white p-2 rounded-md w-full xl:h-[35rem] h-full overflow-x-auto'>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">


              <th className="px-4 py-2 text-left">Paciente</th>
              {/* <th className="px-4 py-2 text-left">DNI</th> */}
              <th className="px-4 py-2 text-left">Sala</th>

              <th className="px-4 py-2 text-left">Hora</th>
              {/* <th className="px-4 py-2 text-left">Teléfono</th> */}
              {/* <th className="px-4 py-2 text-left">Correo</th> */}
              {/* <th className="px-4 py-2 text-left">Procedimiento</th> */}

              <th className="px-4 py-2 text-left">Llegada</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Salida</th>

              {/* <th className="px-4 py-2 text-left">A/N</th> */}
              {/* <th className="px-4 py-2 text-left">MD</th> */}
              {/* <th className="px-4 py-2 text-left">Notas</th> */}
              {/* <th className="px-4 py-2 text-left">Estado</th> */}
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
