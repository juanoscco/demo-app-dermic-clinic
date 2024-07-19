"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { CreateAppointmentComponent } from '../components/citas/create';


import {
    useGetEmployeesQuery,
    useGetAppointmentListQuery,
} from "@/app/(dashboard)/store"

import DetailpopupAppointmentComponent from '../components/citas/find-by-id/detail-popup-appointment.component';

import Link from 'next/link';
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';

import { decodeToken } from "@/app/(dashboard)/utils";

// import { useAuth } from "@/app/(dashboard)/hooks"

const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};



// TODO: FALTA HACER LOS LOADING DE LAZY LOADING Y REFETCH PARA ACTUALIZAR LOS DATOS QUE VIENEN DE LAS OTRAS API REST
export default function AppointmentCalendar() {

    // Ejemplo de inicialización segura de `decoded`
    const initialDecodedState = decodeToken({}); // Decodificar de manera síncrona si es posible
    const [decoded, setDecoded] = useState(initialDecodedState);


    const { data: dataEmployee, isLoading: loadEmployee, refetch: refetchEmployee } = useGetEmployeesQuery({ limit: 20000, page: 0, filter: '' });
    const { data: dataAppointment, isLoading: loadAppointmentRoom, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, id_empleado: 0 });

    const { data: dataHours } = useGetFindHeadBoardQuery(10);
    const hours = dataHours?.cabecera?.cabeceras_detalles;


    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    // const [selectedSedeId, setSelectedSedeId] = useState<number | null | any>(decoded?.id_sede);
    // const [selectedProfessionId, setSelectedProfessionId] = useState<number | any>(decoded?.titulo.id_cabecera_detalle);

    const [selectedSedeId, setSelectedSedeId] = useState<any>(initialDecodedState?.id_sede || null);
    const [selectedProfessionId, setSelectedProfessionId] = useState<number | undefined>(initialDecodedState?.titulo?.id_cabecera_detalle || undefined);

    const handleProfessionChange = (event: any) => {
        setSelectedProfessionId(parseInt(event.target.value, 10));
    };

    const handleSedeChange = (event: any) => {
        setSelectedSedeId(parseInt(event.target.value, 10));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const filteredEmployee = dataEmployee?.data?.content.filter((item: any) => item.sede.id_sede === parseInt(selectedSedeId) && item.titulo.id_cabecera_detalle === selectedProfessionId && item.estado);
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

    const filterAppointmentsByHourAndEmployee = (hour: any, employee: any, location: any, date: any, profession: any) => {
        return filteredAppointments?.find((item: any) =>
            item.id_hour === hour.id_cabecera_detalle &&
            item.id_employee === employee.id_empleado &&
            item.id_location === location &&
            item.item_date === date &&
            item.item_profession === profession
        );
    };

    useEffect(() => {
        if (!loadEmployee && !loadAppointmentRoom) {
            refetchEmployee();
            refetchAppointment();
        }
    }, [loadEmployee, loadAppointmentRoom, refetchAppointment, refetchEmployee]);

    //*** hooks para el selecionado!
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [selectedHour, setSelectedHour] = useState<any>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    const handleCellClick = (hour: any, employee: any) => {
        setSelectedHour(hour);
        setSelectedEmployee(employee);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedHour(null);
        setSelectedEmployee(null);
    };

    // ****
    const [popupDetailVisible, setPopupDetailVisible] = useState<boolean>(false);
    const [selectedIdAppointment, setSelectedIdAppointment] = useState<number | null>(8);

    const handleDetailAppointmentClick = (id: number) => {
        setPopupDetailVisible(true);
        setSelectedIdAppointment(id);
    }
    const closeDetailAppointmentClick = () => {
        setPopupDetailVisible(false);
    }

    // ***
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4;

    const totalPages = Math.ceil(filteredEmployee?.length / pageSize);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const renderedEmployees = filteredEmployee?.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

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
                        value={selectedSedeId || ''}
                        onChange={handleSedeChange}
                        disabled // Deshabilita el select mientras se carga `decoded`
                        className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {decoded && (
                            <option value={decoded.id_sede}>{decoded.sede}</option>
                        )}
                    </select>

                    <select
                        name="profession"
                        value={selectedProfessionId || ''}
                        onChange={handleProfessionChange}
                        disabled // Deshabilita el select mientras se carga `decoded`
                        className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {decoded && decoded.titulo && (
                            <option value={decoded.titulo.id_cabecera_detalle}>{decoded.titulo.descripcion}</option>
                        )}
                    </select>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className="px-4 py-2  text-gray-700  hover:underline "
                    >
                        Página Anterior
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages - 1}
                        className="px-4 py-2  text-gray-700  hover:underline "
                    >
                        Página Siguiente
                    </button>
                </div>
            </section>

            <section className='w-full bg-white h-[40rem] overflow-x-auto mt-5'>
                {/* TABLA CALENDARIO */}
                <section className='w-full p-4'>
                    <table className='w-full bg-white rounded-lg'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 border w-24'>Hora</th>
                                {/* {filteredEmployee && filteredEmployee.length > 0 ? (
                                    filteredEmployee
                                        .map((employee: any, i: number) => (
                                            <th key={employee.id_empleado} className='px-4 py-2 border'>
                                                {employee.nombres}
                                            </th>
                                        ))
                                ) : (
                                    <th className='px-4 py-2 border'>No hay doctores disponibles para esta sede</th>
                                )} */}
                                {renderedEmployees && renderedEmployees?.length > 0 ? (
                                    renderedEmployees?.map((employee: any) => (
                                        <th key={employee.id_empleado} className="px-4 py-2 border capitalize">
                                            Dr. {employee.nombres.split(" ").slice(0, 2).join(" ").toLowerCase()}
                                        </th>
                                    ))
                                ) : (
                                    <th className="px-4 py-2 border">No hay doctores disponibles para esta sede</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {hours
                                ?.filter((hour: any) => hour.id_cabecera_detalle !== 46)
                                ?.map((hour: any, i: number) => (
                                    <tr key={i}>
                                        <td className="border h-24 text-center w-10">{hour.descripcion}</td>
                                        {renderedEmployees?.map((employee: any, j: number) => {
                                            const filteredAppointment = filterAppointmentsByHourAndEmployee(
                                                hour,
                                                employee,
                                                selectedSedeId,
                                                selectedDate,
                                                selectedProfessionId
                                            );
                                            return (
                                                <td
                                                    key={j}
                                                    className={`border h-20 w-52 cursor-pointer hover:bg-gray-200`}
                                                    // onClick={() => {
                                                    //     if (!filteredAppointment) handleCellClick(hour, employee);
                                                    // }}
                                                >
                                                    {filteredAppointment ? (
                                                        <div
                                                            className={`flex flex-col justify-between h-5/6 p-2 mx-1
                                                             ${filteredAppointment.item_color === 'Blue' ? 'bg-blue-300' : 'bg-orange-300'}`}

                                                        >
                                                            <div className='flex flex-wrap items-center justify-between'>
                                                                <div className='flex flex-col '>
                                                                    <h3 className='capitalize text-xs font-bold'>{filteredAppointment.item_patient_name.toLowerCase()}</h3>
                                                                    <span className='text-xs underline'>{filteredAppointment.item_procedure_name}</span>

                                                                </div>

                                                                
                                                                {/* <div className='flex gap-2'>
                                                                    <Link href={`list/${filteredAppointment.id_appointment}`} className='text-xs bg-yellow-400 p-1 rounded-md' >
                                                                        Detalle
                                                                    </Link>
                                                                    <button
                                                                        className='text-xs bg-gray-200 p-1 rounded-md'
                                                                        onClick={() => handleDetailAppointmentClick(filteredAppointment.id_appointment)}
                                                                    >
                                                                        Atencion
                                                                    </button>
                                                                </div> */}
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
                                        })}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </section>
            </section>

            {popupVisible && (
                <CreateAppointmentComponent
                    hour={selectedHour}
                    employee={selectedEmployee}
                    date={selectedDate}
                    idTitle={decoded?.titulo.id_cabecera_detalle}
                    location={selectedSedeId}
                    closePopup={closePopup}
                    refetch={refetchAppointment}
                />
            )}

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
