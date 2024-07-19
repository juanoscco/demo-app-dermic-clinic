"use client";
import React, { useState, useEffect, useCallback } from 'react';

import DetailpopupAppointmentComponent from '../components/citas/find-by-id/detail-popup-appointment.component';
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';

import { 
  useGetEmployeesQuery, 
  useGetInfrastructureQuery, 
  useGetAppointmentListQuery } from "@/app/(dashboard)/store"
import Link from 'next/link';




const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export default function AppointmentWaitingPatient() {
  const { data: dataInfra, isLoading: loadInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 20, page: 0, filter: '' });
  const { data: dataEmployee, isLoading: loadEmployee, refetch: refetchEmployee } = useGetEmployeesQuery({ limit: 20000, page: 0, filter: '' });
  const { data: dataAppointment, isLoading: loadAppointmentRoom, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, id_empleado: 0 });

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedSedeId, setSelectedSedeId] = useState<number | null | any>(1);
  const [popupDetailVisible, setPopupDetailVisible] = useState<boolean>(false);
  const [selectedIdAppointment, setSelectedIdAppointment] = useState<number | null | any>(null);

  const { data: dataHours } = useGetFindHeadBoardQuery(10);
  const hours = dataHours?.cabecera?.cabeceras_detalles;

  const isLoading = loadInfra || loadEmployee || loadAppointmentRoom;

  const handleSedeChange = (event: any) => {
    setSelectedSedeId(parseInt(event.target.value, 10));
  };

  const handleDetailAppointmentClick = (id: number) => {
    setPopupDetailVisible(true);
    setSelectedIdAppointment(id);
  }

  const closeDetailAppointmentClick = () => {
    setPopupDetailVisible(false);
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const fetchAllData = useCallback(() => {
    if (!isLoading) {
      refetchInfra();
      refetchEmployee();
      refetchAppointment();
    }
  }, [isLoading, refetchInfra, refetchEmployee, refetchAppointment]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAllData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchAllData]);

  const sortedDataInfra = dataInfra?.data?.content?.slice().sort((a: any, b: any) => {
    return a.codigo.localeCompare(b.codigo);
  });

  const filteredEmployee = dataEmployee?.data?.content.filter((item: any) => item.sede.id_sede === parseInt(selectedSedeId) && item.estado);
  const appointments = dataAppointment?.data?.content?.filter((item: any) => item.estado);

  const filteredAppointments = appointments?.map((item: any) => ({
    id_appointment: item.id_cita,
    id_hour: item.horario.id_cabecera_detalle,
    hour_desc: item.horario.descripcion,
    id_employee: item.empleado.id_empleado,
    id_location: item.sede.id_sede,
    item_date: item.fecha_cita,
    item_profession: item.empleado.titulo.id_cabecera_detalle,
    item_procedure_name: item.procedimiento.nombres,
    item_patient_name: item.paciente.nombres,
    item_color: item.color,
    item_entrace: item.cita_info.hora_entrada,
    item_atention: item.cita_info.hora_atencion,
    item_exit: item.cita_info.hora_salida,
    item_id_state_time: item.paciente.estado_antiguedad.id_cabecera_detalle,
  }));

  const filterAppointmentsByHourAndEmployee = (hour: any, employee: any, location: any, date: any) => {
    return filteredAppointments?.find((item: any) =>
      item.id_hour === hour.id_cabecera_detalle &&
      item.id_employee === employee.id_empleado &&
      item.id_location === location &&
      item.item_date === date
    );
  };

  return (
    <React.Fragment>
      <h1 className='text-2xl'>Pacientes en espera</h1>
      <section className="bg-white p-4 mt-3 border rounded-md flex flex-col md:flex-row items-center gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="location"
          value={selectedSedeId}
          onChange={handleSedeChange}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortedDataInfra?.map((infra: any, i: number) => (
            <option key={i} value={infra.id_sede}>
              {infra.nombres}
            </option>
          ))}
        </select>

      </section>

      <section className='w-full bg-white h-5/6 overflow-x-auto'>
        {/* TABLA CALENDARIO */}
        <section className='w-full p-4'>
          <table className='w-full bg-white rounded-lg'>
            <thead>
              <tr>
                <th className='px-4 py-2 border w-24'>Hora</th>
                {filteredEmployee && filteredEmployee.length > 0 ? (
                  filteredEmployee
                    // .filter((employee: any) => employee.estado)
                    .map((employee: any, i: number) => (
                      <th key={employee.id_empleado} className='px-4 py-2 border capitalize'>
                        Dr. {employee.nombres.split(" ").slice(0, 2).join(" ").toLowerCase()}
                      </th>
                    ))
                ) : (
                  <th className='px-4 py-2 border'>No hay doctores disponibles para esta sede</th>
                )}
              </tr>
            </thead>
            <tbody>
              {hours
                ?.filter((hour: any) => hour.id_cabecera_detalle !== 46)
                ?.map((hour: any, i: number) => (
                  <tr key={i}>
                    <td className='border h-24 text-center w-10'>{hour.descripcion}</td>
                    {filteredEmployee && filteredEmployee.length > 0 ? (
                      filteredEmployee
                        // .filter((employee: any) => employee.id_empleado !== 1)
                        .map((employee: any, j: number) => {
                          const filteredAppointment = filterAppointmentsByHourAndEmployee(hour, employee, selectedSedeId, selectedDate);

                          return (
                            <td
                              key={j}
                              className={`border h-20 w-52`}
                            >
                              {filteredAppointment ? (
                                // item_color
                                <div className={`flex flex-col justify-between h-5/6 p-2 mx-1  ${filteredAppointment.item_color === 'Blue' ? 'bg-blue-300' : 'bg-orange-300'}`}>
                                  <div className='flex flex-wrap items-center justify-between'>
                                    <div className='flex flex-col '>
                                      <h3 className='capitalize text-xs font-bold'>{filteredAppointment.item_patient_name.toLowerCase()}</h3>
                                      <span className='text-xs underline'>{filteredAppointment.item_procedure_name}</span>

                                    </div>

                                    <div className='flex gap-2'>
                                      <Link href={`list/${filteredAppointment.id_appointment}`} className='text-xs bg-yellow-400 p-1 rounded-md' >Detalle</Link>
                                      <button
                                        className='text-xs bg-gray-200 p-1 rounded-md'
                                        onClick={() => handleDetailAppointmentClick(filteredAppointment.id_appointment)}
                                      >
                                        Atencion
                                      </button>
                                    </div>
                                  </div>
                                  <div className='flex justify-between'>
                                    <div className='flex gap-2'>
                                      <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>
                                        {filteredAppointment.item_id_state_time === 35 ? 'N' : filteredAppointment.item_id_state_time === 36 ? 'A' : ''}
                                      </div>
                                      <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>R</div>
                                    </div>
                                    <div
                                      className={
                                        `w-12 h-4 rounded-sm ${filteredAppointment.item_entrace && filteredAppointment.item_atention === null && filteredAppointment.item_exit === null ? 'bg-green-500' :
                                          filteredAppointment.item_entrace && filteredAppointment.item_atention && filteredAppointment.item_exit === null ? 'bg-yellow-300' :
                                            filteredAppointment.item_entrace && filteredAppointment.item_atention && filteredAppointment.item_exit ? 'bg-blue-500' : 'bg-white'}`}
                                    >
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </td>
                          );
                        })
                    ) : (
                      <td className=' border h-20 w-52 bg-gray-200 '></td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </section>

      {popupDetailVisible && (
        <DetailpopupAppointmentComponent
          id={selectedIdAppointment}
          close={closeDetailAppointmentClick}
          refetchAppointemnt={refetchAppointment}
        />
      )}
    </React.Fragment>
  )
}
