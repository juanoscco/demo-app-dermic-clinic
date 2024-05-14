"use client"
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';

const Popup = ({ handleClose, handleConfirm }: any) => {
    const [title, setTitle] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Por favor, ingresa un título para tu evento:</h2>
                <input
                    type="text"
                    value={title}
                    onChange={handleInputChange}
                    className="border rounded w-full p-2 mb-4"
                    placeholder="Título del evento"
                />
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleConfirm(title)}>Confirmar</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default function AppointmentCalendar() {
   
    const [showPopup, setShowPopup] = useState(false);
    const [eventInfo, setEventInfo] = useState<any>(null); // Estado para almacenar la información del evento
    const [events, setEvents] = useState([
        {
            title: 'event 1',
            start: '2024-05-19T08:00:00',
            end: "2024-05-19T09:00:00"
        },
        {
            title: 'event 9',
            start: '2024-05-17T10:00:00',
            end: "2024-05-17T11:00:00"
        },
    ]); // Arreglo de eventos
    const handleConfirm = (title: string) => {
        if (eventInfo) {
            const newEvent = {
                title,
                start: eventInfo.dateStr,
                end: eventInfo.dateStr,
            };
            setEvents(prevEvents => [...prevEvents, newEvent]); // Agrega el nuevo evento al arreglo events
        }
        setShowPopup(false);
    };



    const handleClose = () => {
        setShowPopup(false);
    };

    const handleDateClick = (info: any) => {
        if (info.view.type === 'timeGridDay') {
            setEventInfo(info); // Almacenamos la información del evento
            setShowPopup(true);
        } else {
            info.view.calendar.changeView('timeGridDay', info.dateStr);
        }
    };

    return (
        <React.Fragment>
            <h1 className='text-2xl'>Calendario de citas medicas</h1>
            <section className='w-full'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    locale={esLocale}
                    events={events}
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    height={"70vh"}
                    selectable={true}
                    dateClick={handleDateClick}
                />
                {showPopup && (
                    <Popup handleClose={handleClose} handleConfirm={handleConfirm} />
                )}

            </section>
        </React.Fragment>
    )
}
