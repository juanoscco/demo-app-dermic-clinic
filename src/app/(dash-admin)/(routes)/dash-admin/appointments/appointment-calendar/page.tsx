"use client"
import React, { useState, useEffect } from 'react';
import { useGetInfrastructureQuery } from '../../infrastructure/list/store/service';
import { useGetRoomsListQuery } from '../../infrastructure/list/[id]/infra-rooms/list/store/service';
import { useGetEmployeesQuery } from '../../persons/list/store/service';
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


export default function AppointmentCalendar() {

    const { data: dataInfra, isLoading: loadInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 10, page: 0, filter: '' })
    const { data: dataRoom, isLoading: loadRoom, refetch: refetchRooms } = useGetRoomsListQuery({ limit: 10, page: 0, filter: '' })
    const { data: dataEmployee, isLoading: loadEmployee, refetch: refetchEmployee } = useGetEmployeesQuery({ limit: 15000, page: 0, filter: '' })

    const { data:dataAppointment, isLoading } = useGetAppointmentListQuery({ limit: 15000, page: 0, filter: '' })
    console.log(dataAppointment)
    // console.log(dataRoom)
    // console.log(dataEmployee)
    // Hooks
    const [selectedSedeId, setSelectedSedeId] = useState('');

    // Manejar el cambio de selección en el select
    const handleSedeChange = (event: any) => {
        setSelectedSedeId(event.target.value);
    };

    // Filtrar los cuartos basados en el id_sede seleccionado
    const filteredRooms = dataRoom?.data?.content.filter((room: any) => room.sede.id_sede === parseInt(selectedSedeId));

    // 
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedHour, setSelectedHour] = useState<any>(null);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);

    const handleCellClick = (event: React.MouseEvent, hour: any, room: any) => {
        
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
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    // Manejar el cambio de fecha
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //       refetchEmployee();
    //     }, 300);

    //     return () => clearTimeout(delayDebounceFn);
    //   }, [refetchEmployee]);
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
                        value={selectedSedeId} onChange={handleSedeChange}
                        className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {
                            dataInfra?.data?.content.map((infra: any, i: number) => (
                                <option key={i} value={infra.id_sede}> {infra.nombres}</option>
                            ))
                        }
                    </select>
                    <select
                        name="profession"
                        // value={selectedProfession}
                        // onChange={handleProfessionChange}
                        className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="doctor">Doctor</option>
                        <option value="cosmetra">Cosmeatra</option>
                    </select>
                </div>

            </section>

            <section className='w-full bg-white h-[40rem] overflow-x-auto mt-4'>
                <section className='w-full p-4'>
                    <table className='w-full bg-white rounded-lg'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 border'>Hora</th>
                                {filteredRooms && filteredRooms.length > 0 ? (
                                    filteredRooms.map((room: any, i: number) => (
                                        <th key={i} className='px-4 py-2 border'>
                                            {room.nombres}
                                        </th>
                                    ))
                                ) :
                                    (
                                        <th className='px-4 py-2 border'>No hay cuartos disponibles para esta sede</th>
                                    )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hours.map((hour: any, i: number) => (
                                    <tr key={i}>
                                        <td className=' border h-24 text-center w-32'>{hour.descripcion}</td>
                                        {filteredRooms && filteredRooms.length > 0 ? (
                                            filteredRooms.map((room: any, j: number) => (
                                                <td
                                                    key={j}
                                                    className='px-4 py-2 border h-24 cursor-pointer'
                                                    onClick={(e) => handleCellClick(e, hour, room)}
                                                ></td>
                                            ))
                                        ) : (
                                            <td className='px-4 py-2 border h-24 bg-gray-200'></td>
                                        )}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </section>

            </section>
            {popupVisible && (
                <CreateAppointmentComponent
                    hour={selectedHour}
                    room={selectedRoom}
                    date={selectedDate}
                    employee={dataEmployee}
                    closePopup={closePopup}
                />
            )}


        </React.Fragment>
    )
}
