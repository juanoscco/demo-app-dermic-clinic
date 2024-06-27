"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useGetInfrastructureQuery } from '../../infrastructure/list/store/service';
import { useGetRoomsListQuery } from '../../infrastructure/list/[id]/infra-rooms/list/store/service';
import { useGetExtraAppointmentsQuery } from '../components/extras/list/store/service';
import Link from 'next/link';
import { CreateAppointmentExtraComponent } from '../components/extras/create/createAppointmentExtra.component';
import DetailpopupExtraAppointmentComponent from '../components/extras/find-by-id/detail-popup-extra-appointment-component';


const hours = [
  { id_cabecera_detalle: 40, descripcion: "09:00 a.m.", valor: "" },
  { id_cabecera_detalle: 41, descripcion: "09:20 a.m.", valor: "" },
  { id_cabecera_detalle: 42, descripcion: "09:40 a.m.", valor: "" },
  { id_cabecera_detalle: 43, descripcion: "10:00 a.m.", valor: "" },
  { id_cabecera_detalle: 44, descripcion: "10:20 a.m.", valor: "" },
  { id_cabecera_detalle: 45, descripcion: "10:40 a.m.", valor: "" },
  { id_cabecera_detalle: 46, descripcion: "11:00 a.m.", valor: "" },
  { id_cabecera_detalle: 47, descripcion: "11:20 a.m.", valor: "" },
  { id_cabecera_detalle: 48, descripcion: "11:40 a.m.", valor: "" },
  { id_cabecera_detalle: 49, descripcion: "12:00 p.m.", valor: "" },
  { id_cabecera_detalle: 50, descripcion: "12:20 p.m.", valor: "" },
  { id_cabecera_detalle: 51, descripcion: "12:40 p.m.", valor: "" },
  { id_cabecera_detalle: 52, descripcion: "13:00 p.m.", valor: "" },
  { id_cabecera_detalle: 53, descripcion: "13:20 p.m.", valor: "" },
  { id_cabecera_detalle: 54, descripcion: "13:40 p.m.", valor: "" },
  { id_cabecera_detalle: 55, descripcion: "14:00 p.m.", valor: "" },
  { id_cabecera_detalle: 56, descripcion: "14:20 p.m.", valor: "" },
  { id_cabecera_detalle: 57, descripcion: "14:40 p.m.", valor: "" },
  { id_cabecera_detalle: 58, descripcion: "15:00 p.m.", valor: "" },
  { id_cabecera_detalle: 59, descripcion: "15:20 p.m.", valor: "" },
  { id_cabecera_detalle: 60, descripcion: "15:40 p.m.", valor: "" },
  { id_cabecera_detalle: 61, descripcion: "16:00 p.m.", valor: "" },
  { id_cabecera_detalle: 62, descripcion: "16:20 p.m.", valor: "" },
  { id_cabecera_detalle: 63, descripcion: "16:40 p.m.", valor: "" },
  { id_cabecera_detalle: 64, descripcion: "17:00 p.m.", valor: "" },
  { id_cabecera_detalle: 65, descripcion: "17:20 p.m.", valor: "" },
  { id_cabecera_detalle: 66, descripcion: "17:40 p.m.", valor: "" },
  { id_cabecera_detalle: 67, descripcion: "18:00 p.m.", valor: "" },
  { id_cabecera_detalle: 68, descripcion: "18:20 p.m.", valor: "" },
  { id_cabecera_detalle: 69, descripcion: "18:40 p.m.", valor: "" },
  { id_cabecera_detalle: 70, descripcion: "19:00 p.m.", valor: "" }
];

const title_employe = [
  {
    id_cabecera_detalle: 5,
    descripcion: "Cosmiatras",
    valor: ""
  },
  {
    id_cabecera_detalle: 6,
    descripcion: "Doctores",
    valor: ""
  },
]
const formatDate = (date: string | Date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};
export default function ApointmentExtras() {
  const { data: dataExtraAppointment, isLoading: dataExtraAppointmentLoad, refetch: refetchExtraAppointment } = useGetExtraAppointmentsQuery({ limit: 150000, page: 0, filter: '' })
  const { data: dataInfra, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 15, page: 0, filter: '' })

  const infrastructure = dataInfra?.data?.content


  const today = formatDate(new Date());

  const appointmentsData = dataExtraAppointment?.data?.content;

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1);
  // const [filteredAppointments, setFilteredAppointments] = useState<any>([]);

  // const filterAppointments = useCallback((date: string, district: number) => {
  //   return appointmentsData?.filter((appointment: any) => {
  //     const appointmentDate = appointment.fecha_cita;
  //     return appointmentDate === date && appointment.sede.id_sede === district;
  //   });
  // }, [appointmentsData]);

  const filteredAppointments = appointmentsData?.filter((appointment: any) => {
    const appointmentDate = appointment.fecha_cita;
    return appointmentDate === selectedDate && appointment.sede.id_sede === selectedDistrict;
  })
  console.log(appointmentsData);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     refetchExtraAppointment();
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [refetchExtraAppointment]);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     refetchInfra();
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [refetchInfra]);

  // useEffect(() => {
  //   const result = filterAppointments(today, selectedDistrict);
  //   setFilteredAppointments(result);
  // }, [today, selectedDistrict, filterAppointments]);

  // useEffect(() => {
  //   const result = filterAppointments(selectedDate, selectedDistrict);
  //   setFilteredAppointments(result);
  // }, [selectedDate, selectedDistrict, appointmentsData, filterAppointments]);


  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Calendario de Extras</h1>

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
          <button
            className="p-2 bg-blue-500 rounded-md text-white w-full md:w-auto"
            onClick={togglePopup}
          >
            Agregar
          </button>
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
              <th className="px-4 py-2 text-left">Medico</th>
              <th className="px-4 py-2 text-left">Sala</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Llegada</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Salida</th>
              <th className="px-4 py-2 text-left">Acciones</th>

            </tr>
          </thead>
          <tbody>
            {filteredAppointments?.map((appointment: any) => (
              <tr key={appointment?.id_cita_extra} className='border-b'>
                <td className="px-4 py-2">
                  <p>{appointment?.paciente.nombres}</p>
                  <p>{appointment?.paciente.numero_documento_identidad}</p>
                </td>
                <td className="px-4 py-2">
                  <p>{appointment?.empleado.nombres}</p>
                  <p>{appointment?.empleado.numero}</p>
                </td>
                <td className="px-4 py-2">
                  {appointment?.sala_tratamiento.nombres}
                </td>
                <td className="px-4 py-2">
                  {/* {appointment?.horario.descripcion} */}
                </td>
                <td>{appointment?.cita_extra_info.hora_entrada}</td>
                <td>{appointment?.cita_extra_info.hora_atencion}</td>
                <td>{appointment?.cita_extra_info.hora_salida}</td>
                {/* <td></td> */}
                <td className="px-4 py-2 flex gap-3">
                  <button>Marcar estado</button>
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {showPopup && <CreateAppointmentExtraComponent
        close={togglePopup}
        location={selectedDistrict}
        refetch={refetchExtraAppointment}
        date={selectedDate}
      />}
      {/* {popupDetailVisible && (
        <DetailpopupExtraAppointmentComponent
          id={selectedIdAppointment}
          close={closeDetailAppointmentClick}
          refetchAppointemnt={refetchExtraAppointment}
        />
      )} */}
    </React.Fragment>
  )
}
