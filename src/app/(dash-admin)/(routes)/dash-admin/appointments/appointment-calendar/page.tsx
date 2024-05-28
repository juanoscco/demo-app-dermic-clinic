"use client"
import React, { useState, useEffect } from 'react'
import { appointments, Appointment } from "@/mocks/appointments/appointments.mocks"

export default function AppointmentCalendar() {
    const today = new Date().toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedLocation, setSelectedLocation] = useState("Los Olivos");
    const [selectedProfession, setSelectedProfession] = useState("doctor");
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
    const [timeFilteredAppointments, setTimeFilteredAppointments] = useState<Record<string, Appointment[]>>({});

    useEffect(() => {
        // Filtrar las citas según los campos seleccionados
        const filtered = appointments.filter((appointment) => {
            // Filtrar por fecha si se selecciona una fecha
            const dateFilter = !selectedDate || appointment.fecha === selectedDate;

            // Filtrar por ubicación si se selecciona una ubicación
            const locationFilter = !selectedLocation || appointment.distrito === selectedLocation;

            // Filtrar por profesión si se selecciona una profesión
            const professionFilter = !selectedProfession || appointment.typeDoctor === selectedProfession;

            // Seleccionar la cita si cumple con todos los filtros
            return dateFilter && locationFilter && professionFilter;
        });

        setFilteredAppointments(filtered);
    }, [selectedDate, selectedLocation, selectedProfession]);

    useEffect(() => {
        const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
        const timeFiltered: Record<string, Appointment[]> = {};

        timeSlots.forEach(time => {
            timeFiltered[time] = filteredAppointments.filter(appointment => appointment.horaInicio === time);
        });

        setTimeFilteredAppointments(timeFiltered);
    }, [filteredAppointments]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
    };

    const handleProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProfession(event.target.value);
    };

    console.log(filteredAppointments)
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
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Los Olivos">Los Olivos</option>
                        <option value="San Isidro">San Isidro</option>
                    </select>
                    <select
                        name="profession"
                        value={selectedProfession}
                        onChange={handleProfessionChange}
                        className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="doctor">Doctor</option>
                        <option value="cosmetra">Cosmeatra</option>
                    </select>
                </div>
                {/* <button className="bg-blue-500 text-white p-2 rounded-md w-full md:w-auto">
                    Buscar
                </button> */}
            </section>

            <section className='w-full bg-white h-[40rem] overflow-x-auto mt-4'>
                <section className='w-full p-4'>
                    <table className='w-full bg-white rounded-lg'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 border'>Hora</th>
                                <th className='px-4 py-2 border'>Sala 1</th>
                                <th className='px-4 py-2 border'>Sala 2</th>
                                <th className='px-4 py-2 border'>Sala 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map((time) => (
                                <tr key={time}>
                                    <td className="px-4 py-2 border h-24" style={{ width: '100px' }}>{time}</td>
                                    {Array(3).fill(null).map((_, idx) => (
                                        <td key={idx} className="px-4 py-2 border" style={{ width: '300px', height: '100px' }}>
                                            {timeFilteredAppointments[time] && timeFilteredAppointments[time].slice(idx, idx + 1).map(appointment => (
                                                <div key={appointment.id}>
                                                    <p>{appointment.user.name}</p>
                                                    <p>{appointment.doctor}</p>
                                                    <p className='capitalize'>{appointment.typeDoctor}</p>
                                                </div>
                                            ))}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </React.Fragment>
    )
}
