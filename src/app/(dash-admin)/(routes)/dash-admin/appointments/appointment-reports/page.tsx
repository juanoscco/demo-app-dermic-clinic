"use client";
import React, { useEffect, useState } from 'react'
import { appointments, Appointment } from "@/mocks/appointments/appointments.mocks"

export default function AppointmentReports() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedSede, setSelectedSede] = useState<string>('Los Olivos');
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const initialStartDate = new Date();
    const initialEndDate = new Date();
    initialStartDate.setDate(initialStartDate.getDate() - 3);

    setStartDate(initialStartDate.toISOString().split('T')[0]);
    setEndDate(initialEndDate.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const filtered = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.fecha);
        return (
          appointmentDate >= start &&
          appointmentDate <= end &&
          appointment.distrito === selectedSede
        );
      });

      setFilteredAppointments(filtered);
    }
  }, [startDate, endDate, selectedSede]);
  return (
    <React.Fragment>
      <h1 className='text-2xl mb-2'>Reporte de citas</h1>
      <section className="bg-white p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <span>De</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Hasta</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Sede:</span>
            <select
              value={selectedSede}
              onChange={(e) => setSelectedSede(e.target.value)}
              className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Los Olivos">Los Olivos</option>
              <option value="San Isidro">San Isidro</option>
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


      <section className='bg-white mt-3 p-2 rounded-md w-full xl:h-[35rem] h-full overflow-x-auto'>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">


              <th className="px-4 py-2 text-left">Paciente</th>
              <th className="px-4 py-2 text-left">Sala</th>

              <th className="px-4 py-2 text-left">Hora</th>


              <th className="px-4 py-2 text-left">Llegada</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Salida</th>


              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>

              {/* <th className="px-4 py-2 text-left">A/N</th> */}
              {/* <th className="px-4 py-2 text-left">MD</th> */}
              {/* <th className="px-4 py-2 text-left">Notas</th> */}
              {/* <th className="px-4 py-2 text-left">Teléfono</th> */}
              {/* <th className="px-4 py-2 text-left">Correo</th> */}
              {/* <th className="px-4 py-2 text-left">Procedimiento</th> */}
              {/* <th className="px-4 py-2 text-left">DNI</th> */}

            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{appointment.user.name}</td>
                <td className='px-4 py-2'>{appointment.sala}</td>
                <td className="px-4 py-2">{appointment.fecha}</td>
                <td className="px-4 py-2">{appointment.llegada}</td>
                <td className="px-4 py-2">{appointment.entrada}</td>
                <td className="px-4 py-2">{appointment.salida}</td>
                <td className="px-4 py-2">{appointment.estado}</td>
                <td className="px-4 py-2">Detalles</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  )
}
