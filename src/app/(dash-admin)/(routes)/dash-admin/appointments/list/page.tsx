"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { appointments } from '@/mocks/appointments/appointments.mocks';

const filterAppointments = (date: any, district: any) => {
  return appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.fecha).toLocaleDateString();
    return appointmentDate === date && appointment.distrito === district;
  });
};

// Función para formatear la fecha en "yyyy-MM-dd"
const formatDate = (date: any) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export default function AppointmentList() {

  const today = formatDate(new Date().toLocaleDateString());

  // console.log(today)
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDistrict, setSelectedDistrict] = useState('Los Olivos');
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);

  useEffect(() => {
    const formattedToday = new Date(today).toLocaleDateString();
    const result = filterAppointments(formattedToday, 'Los Olivos');
    setFilteredAppointments(result);
  }, [today]);

  const handleFilterChange = () => {
    const formattedDate = new Date(selectedDate).toLocaleDateString();
    const result = filterAppointments(formattedDate, selectedDistrict);
    setFilteredAppointments(result);
  };

  // console.log(appointments)

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
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="Los Olivos">Los Olivos</option>
            <option value="San Isidro">San Isidro</option>
          </select>
        </section>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
          onClick={handleFilterChange}
        >
          Filtrar
        </button>
      </section>
      <section
        className='flex xl:justify-between flex-col xl:flex-row mt-5 bg-white rounded-md p-4'
      >
        <input
          type="text"
          placeholder='Buscar...'
          className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"

        />
        <div className='flex items-center gap-3'>
          <button className='p-2  bg-green-500 rounded-md text-white'>
            Excel
          </button>
          <button className='bg-gray-500 p-2 text-white rounded-md'>
            Imprimir
          </button>
          <Link href='/dash-admin/persons/create'>
            <button className='p-2 bg-sky-500  rounded-md text-white'>Crear</button>
          </Link>
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
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>

            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment: any) => (
              <tr key={appointment.id}>
                {/* <td className="border-b px-4 py-2">{appointment.id}</td> */}
                <td className="border-b px-4 py-2">
                  <p>{appointment.user.name}</p>
                  <p>{appointment.user.dni}</p>
                </td>
                <td className="border-b px-4 py-2">
                  <p>{appointment.sala}</p>
                  <span>{appointment.doctor}</span>
                </td>

                {/* <td className="border-b px-4 py-2">{appointment.Fecha}</td> */}
                <td className="border-b px-4 py-2">{appointment.horaInicio} a {appointment.HoraFinal}</td>
                {/* <td className="border-b px-4 py-2"></td> */}

                <td className="border-b px-4 py-2">{appointment.llegada}</td>
                <td className="border-b px-4 py-2">{appointment.entrada}</td>
                <td className="border-b px-4 py-2">{appointment.salida}</td>
                <td className="border-b px-4 py-2">{appointment.estado}</td>
                <td className="border-b px-4 py-2">
                  <button className='text-white bg-blue-700 p-1 rounded-md'>Detalles</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  )
}
