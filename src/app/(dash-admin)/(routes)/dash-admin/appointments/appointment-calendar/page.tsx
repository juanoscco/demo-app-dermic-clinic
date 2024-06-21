"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useGetInfrastructureQuery } from '../../infrastructure/list/store/service';
import { useGetRoomsListQuery } from '../../infrastructure/list/[id]/infra-rooms/list/store/service';
import { CreateAppointmentComponent } from '../components/citas/create';
import { useGetAppointmentListQuery } from '../components/citas/list/store/service';

// TODO: TRAER ROOMS 
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
// TODO: FALTA HACER LOS LOADING DE LAZY LOADING Y REFETCH PARA ACTUALIZAR LOS DATOS QUE VIENEN DE LAS OTRAS API REST
export default function AppointmentCalendar() {

    // data rooms and infra
    const { data: dataInfra, isLoading: loadInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 10, page: 0, filter: '' })
    const { data: dataRoom, isLoading: loadRoom, refetch: refetchRooms } = useGetRoomsListQuery({ limit: 300, page: 0, filter: '' })

    const { data: dataAppointment, isLoading: loadAppointmentRoom, refetch: refetchAppointmentRoom } = useGetAppointmentListQuery({ limit: 15000, page: 0, filter: '' })

    const appointments = dataAppointment?.data?.content;
   
    // Hooks
    const [selectedSedeId, setSelectedSedeId] = useState<number | null | any>(1);

    const handleSedeChange = (event: any) => {
        setSelectedSedeId(parseInt(event.target.value, 10));
    };

    // Filtrar los cuartos basados en el id_sede seleccionado
    const filteredRooms = dataRoom?.data?.content.filter((room: any) => room.sede.id_sede === parseInt(selectedSedeId));

    // Filtrar por medio de la profesion
    const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(6);
    // const [selectedProfessionName, setSelectedProfessionName] = useState<string>('');

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



    // Ordenar dataInfra por 'codigo' en orden ascendente
    const sortedDataInfra = dataInfra?.data?.content?.slice().sort((a: any, b: any) => {
        return a.codigo.localeCompare(b.codigo);
    });

    const filteredAppointments = appointments?.map((item: any) => ({
        id_hour: item.hora.id_cabecera_detalle,
        hour_desc: item.hora.descripcion,
        id_room: item.sala_tratamiento.id_sala_tratamiento,
        id_location: item.sede.id_sede,
        item_date: item.fecha_cita,
        item_profession: item.empleado.titulo.id_cabecera_detalle,
        item_procedure_name: item.procedimiento.nombres,
        item_patient_name: item.paciente.nombres
    }));

    // console.log(filteredAppointments);

    const filterAppointmentsByHourAndRoom = (hour: any, room: any, location: any, date: any, profession: any) => {
        return filteredAppointments?.find((item: any) =>
            item.id_hour === hour.id_cabecera_detalle &&
            item.id_room === room.id_sala_tratamiento &&
            item.id_location === location &&
            item.item_date === date &&
            item.item_profession === profession
        );
    };

    return (
        <React.Fragment>
            <h1 className='text-2xl'>Calendario de citas medicas</h1>
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

            <section className='w-full bg-white h-[40rem] overflow-auto mt-4'>
                <section className='w-full p-4'>
                    <table className='w-[80rem] md:w-full bg-white rounded-lg'>
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
                        <tbody>
                            {hours.map((hour: any, i: number) => (
                                <tr key={i}>
                                    <td className='border h-24 text-center w-10'>{hour.descripcion}</td>
                                    {filteredRooms && filteredRooms.length > 0 ? (
                                        filteredRooms.map((room: any, j: number) => {
                                            const filteredAppointment = filterAppointmentsByHourAndRoom(hour, room, selectedSedeId, selectedDate, selectedProfessionId);
                                            return (
                                                <td
                                                    key={j}
                                                    className={`p-2 border h-20 w-52 ${filteredAppointment ? '': 'cursor-pointer'}`}
                                                    // onClick={() => handleCellClick(hour, room)}
                                                    onClick={() => {
                                                        if (!filteredAppointment) handleCellClick(hour, room);
                                                    }}
                                                >
                                                    {/* Show the filtered appointment details */}
                                                    {filteredAppointment ? (
                                                        <React.Fragment>
                                                            <h3 className='capitalize text-xs font-bold'>{filteredAppointment.item_patient_name.toLowerCase()}</h3>
                                                            <span className='text-xs'>{filteredAppointment.item_procedure_name}</span>
                                                        </React.Fragment>
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

            {popupVisible && (
                <CreateAppointmentComponent
                    hour={selectedHour}
                    room={selectedRoom}
                    date={selectedDate}
                    idTitle={selectedProfessionId}
                    location={selectedSedeId}
                    closePopup={closePopup}
                    refetch={refetchAppointmentRoom}
                />
            )}


        </React.Fragment>
    )
}
