"use client"
import React, { useState, useEffect } from 'react';
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

export default function ApointmentExtras() {

  // data rooms and infra
  const { data: dataInfra, isLoading: loadInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 20, page: 0, filter: '' })
  const { data: dataRoom, isLoading: loadRoom, refetch: refetchRooms } = useGetRoomsListQuery({ limit: 3000, page: 0, filter: '' })

  const { data: dataExtraAppointment, refetch: refetchExtraAppointment } = useGetExtraAppointmentsQuery({ limit: 150000, page: 0, filter: '' })

  const extraAppointments = dataExtraAppointment?.data?.content;

  // Hooks
  const [selectedSedeId, setSelectedSedeId] = useState<number | null | any>(1);

  const handleSedeChange = (event: any) => {
    setSelectedSedeId(parseInt(event.target.value, 10));
  };

  // Filtrar los cuartos basados en el id_sede seleccionado
  const filteredRooms = dataRoom?.data?.content.filter((room: any) => room.sede.id_sede === parseInt(selectedSedeId));
  // Filtrar por medio de la profesion
  const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(6);

  const handleProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const professionId = parseInt(event.target.value);
    const selectedProfession = title_employe.find(prof => prof.id_cabecera_detalle === professionId);
    if (selectedProfession) {
      setSelectedProfessionId(professionId);
    }
  };

  // hooks para el selecionado!
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // hooks details
  const [popupDetailVisible, setPopupDetailVisible] = useState<boolean>(false);
  const [selectedIdAppointment, setSelectedIdAppointment] = useState<number | null | any>(null);

  const handleCellClick = (hour: any, room: any) => {
    setSelectedHour(hour);
    setSelectedRoom(room);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedHour(null);
    setSelectedRoom(null);
  };

  const handleDetailAppointmentClick = (id: number) => {
    setPopupDetailVisible(true);
    setSelectedIdAppointment(id);
  }
  const closeDetailAppointmentClick = () => {
    setPopupDetailVisible(false);
  }

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const sortedDataInfra = dataInfra?.data?.content?.slice().sort((a: any, b: any) => {
    return a.codigo.localeCompare(b.codigo);
  });

  // const filteredAppointments = extraAppointments?.map((item: any) => ({
  //   id_appointment: item.id_cita,
  //   id_hour: item.horario.id_cabecera_detalle,
  //   hour_desc: item.horario.descripcion,
  //   id_room: item.sala_tratamiento.id_sala_tratamiento,
  //   id_location: item.sede.id_sede,
  //   item_date: item.fecha_cita,
  //   item_profession: item.empleado.titulo.id_cabecera_detalle,
  //   item_procedure_name: item.procedimiento.nombres,
  //   item_patient_name: item.paciente.nombres,
  //   item_color: item.color,
  //   item_entrace: item.cita_info.hora_entrada,
  //   item_atention: item.cita_info.hora_atencion,
  //   item_exit: item.cita_info.hora_salida,
  //   item_id_state_time: item.paciente.estado_antiguedad.id_cabecera_detalle,
  // }));


  // const filterExtraAppointmentsByHourAndRoom = (hour: any, room: any, location: any, date: any, profession: any) => {
  //   return filteredAppointments?.find((item: any) =>
  //     item.id_hour === hour.id_cabecera_detalle &&
  //     item.id_room === room.id_sala_tratamiento &&
  //     item.id_location === location &&
  //     item.item_date === date &&
  //     item.item_profession === profession
  //   );
  // };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchRooms();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetchRooms]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchInfra();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetchInfra]);

  return (
    <React.Fragment>
      <h1 className='text-2xl'>Calendario de Extras</h1>
      <section className="bg-white p-4 mt-3 border rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
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
          <select
            name="profession"
            value={selectedProfessionId ?? ''}
            onChange={handleProfessionChange}
            className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* <option value="">Seleccione una profesión</option> */}
            {title_employe.map(prof => (
              <option key={prof.id_cabecera_detalle} value={prof.id_cabecera_detalle}>
                {prof.descripcion}
              </option>
            ))}
          </select>
        </div>

      </section>
      <section className='w-full bg-white h-[40rem] overflow-x-auto mt-4'>
        <section className='w-full p-4'>
          <table className='w-[40rem] md:w-full bg-white rounded-lg'>
            <thead>
              <tr>
                <th className='px-4 py-2 border w-24'>Hora</th>
                {filteredRooms && filteredRooms.length > 0 ? (
                  filteredRooms.map((room: any, i: number) => (
                    <th key={i} className='px-4 py-2 border'>
                      {room.nombres}
                    </th>
                  ))
                ) : (
                  <th className='px-4 py-2 border'>No hay cuartos disponibles para esta sede</th>
                )}
              </tr>
            </thead>
            {/* <tbody>
              {hours.map((hour: any, i: number) => (
                <tr key={i}>
                  <td className='border h-24 text-center w-10'>{hour.descripcion}</td>
                  {filteredRooms && filteredRooms.length > 0 ? (
                    filteredRooms.map((room: any, j: number) => {
                      const filteredExtraAppointment = filterExtraAppointmentsByHourAndRoom(hour, room, selectedSedeId, selectedDate, selectedProfessionId);

                      return (
                        <td
                          key={j}
                          className={`border h-20 w-52 ${filteredExtraAppointment ? '' : 'cursor-pointer'}`}
                          onClick={() => {
                            if (!filteredExtraAppointment) handleCellClick(hour, room);
                          }}
                        >
                          {filteredExtraAppointment ? (
                            <div className={`flex flex-col justify-between h-5/6 p-2 mx-1  ${filteredExtraAppointment.item_color === 'Orange' ? 'bg-blue-300' : 'bg-orange-300'}`}>
                              <div className='flex flex-wrap items-center justify-between'>
                                <div className='flex flex-col '>
                                  <h3 className='capitalize text-xs font-bold'>{filteredExtraAppointment.item_patient_name.toLowerCase()}</h3>
                                  <span className='text-xs underline'>{filteredExtraAppointment.item_procedure_name}</span>

                                </div>

                                <div className='flex gap-2'>
                                  <Link href={`list/${filteredExtraAppointment.id_appointment}`} className='text-xs bg-yellow-400 p-1 rounded-md' >Detalle</Link>
                                  <button
                                    className='text-xs bg-gray-200 p-1 rounded-md'
                                    onClick={() => handleDetailAppointmentClick(filteredExtraAppointment.id_appointment)}
                                  >
                                    Atencion
                                  </button>

                                </div>
                              </div>
                              <div className='flex justify-between'>
                                <div className='flex gap-2'>
                                  <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>
                                    {filteredExtraAppointment.item_id_state_time === 35 ? 'N' : filteredExtraAppointment.item_id_state_time === 36 ? 'A' : ''}
                                  </div>
                                  <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>R</div>
                                </div>
                                <div
                                  className={
                                    `w-12 h-4 rounded-sm ${filteredExtraAppointment.item_entrace && filteredExtraAppointment.item_atention === null && filteredExtraAppointment.item_exit === null ? 'bg-green-500' :
                                      filteredExtraAppointment.item_entrace && filteredExtraAppointment.item_atention && filteredExtraAppointment.item_exit === null ? 'bg-yellow-300' :
                                        filteredExtraAppointment.item_entrace && filteredExtraAppointment.item_atention && filteredExtraAppointment.item_exit ? 'bg-blue-500' : 'bg-white'}`}
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
            </tbody> */}
          </table>
        </section>
      </section>
      {popupVisible && (
        <CreateAppointmentExtraComponent
          hour={selectedHour}
          room={selectedRoom}
          date={selectedDate}
          idTitle={selectedProfessionId}
          location={selectedSedeId}
          closePopup={closePopup}
          refetch={refetchExtraAppointment}
        />
      )}

      {popupDetailVisible && (
        <DetailpopupExtraAppointmentComponent
          id={selectedIdAppointment}
          close={closeDetailAppointmentClick}
          refetchAppointemnt={refetchExtraAppointment}
        />
      )}
    </React.Fragment>
  )
}
