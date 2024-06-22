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

export default function AppointmentList() {

  const { data: appointments, isLoading: loadingAppointments, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150, page: 0, filter: '' });
  const { data: dataInfra, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 15, page: 0, filter: '' })

  const infrastructure = dataInfra?.data?.content

  const today = formatDate(new Date());

  const appointmentsData = useMemo(() => appointments?.data?.content || [], [appointments]);

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1);
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);

  const filterAppointments = useCallback((date: string, district: number) => {
    return appointmentsData.filter((appointment: any) => {
      const appointmentDate = appointment.fecha_cita;
      return appointmentDate === date && appointment.sede.id_sede === district;
    });
  }, [appointmentsData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchAppointment();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetchAppointment]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchInfra();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetchInfra]);

  useEffect(() => {
    const result = filterAppointments(today, selectedDistrict);
    setFilteredAppointments(result);
  }, [today, selectedDistrict, filterAppointments]);

  useEffect(() => {
    const result = filterAppointments(selectedDate, selectedDistrict);
    setFilteredAppointments(result);
  }, [selectedDate, selectedDistrict, appointmentsData, filterAppointments]);





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
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>

            </tr>
          </thead>
          <tbody>



            {filteredAppointments.map((appointment: any) => (
              <tr key={appointment.id_cita} className='border-b'>
                <td className="px-4 py-2">
                  <p>{appointment.paciente.nombres}</p>
                  <p>{appointment.paciente.numero_documento_identidad}</p>
                </td>
                <td className="px-4 py-2">
                  -
                </td>
                <td className="px-4 py-2">
                  {appointment.hora.descripcion}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="px-4 py-2">
                  <Link href={`list/${appointment.id_cita}`}>Detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  )
}
