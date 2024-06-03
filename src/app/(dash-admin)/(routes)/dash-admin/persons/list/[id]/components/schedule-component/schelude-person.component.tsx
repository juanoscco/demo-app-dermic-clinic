"use client";
import React, { useState, useEffect } from 'react';
import CreateScheduleComponent from './components/create/create-schedule.component';
import { useGetScheludesQuery } from '../../../../schedules/components/list/store/service';
import UpdateScheduleComponent from './components/update/update-schedule.component';

interface Props {
    idPerson?: number;
    dataPerson?: any;
}

export default function ScheludePersonComponent({ idPerson, dataPerson }: Props) {
    const [showPopup, setShowPopup] = useState(false);

    // Actualizar
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null)
    // 

    const { data: dataSchedule, isLoading, refetch } = useGetScheludesQuery({ page: 0, limit: 5, filter: '' })

    const filteredSchedules = dataSchedule?.data?.content.filter((schedule: any) => schedule?.empleado?.id_empleado === idPerson)

    // console.log(filteredSchedules)

    // 
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    // 

    // 
    const togglePopupUpdateId = (id?: number) => {
        if (id) {
            setSelectedScheduleId(id)
        }
        setShowPopupUpdate(!showPopupUpdate);
    }


    const dayOrder: any = {
        'Lunes': 1,
        'Martes': 2,
        'Miércoles': 3,
        'Jueves': 4,
        'Viernes': 5,
        'Sábado': 6
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetch]);


    if (isLoading) return <div>loading....</div>

    return (

        <div className="bg-white p-6 rounded-lg">
            <div className='flex justify-between items-center'>

                {Array.isArray(filteredSchedules) && filteredSchedules.length > 0 ? (

                    <React.Fragment>
                        <h2 className="text-xl font-bold mb-4">{filteredSchedules[0].nombre_horario}</h2>
                        <button
                            className='text-yellow-400 hover:text-yellow-500'

                            onClick={() => togglePopupUpdateId(filteredSchedules[0].id_horario_trabajo)}>Editar</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h1 className="text-xl font-bold mb-4">Horario</h1>
                        <button onClick={togglePopup} className='text-blue-500'>Crear Horario</button>
                    </React.Fragment>
                )}


            </div>
            {/* nombre_horario */}
            {Array.isArray(filteredSchedules) && filteredSchedules.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 text-left">Día</th>
                            <th className='px-4 py-2 text-left'>Turno mañana</th>
                            <th className='px-4 py-2 text-left'>Turno tarde</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSchedules[0].horario_trabajo_detalle
                            .filter((detalle: any) => detalle.estado) // Filtra los elementos con estado true
                            .map((detalle: any, i: number) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                    <td className="border px-4 py-2">{detalle.semana.descripcion}</td>
                                    <td className="border px-4 py-2">
                                        {`${detalle.temprano_inicio.descripcion} - ${detalle.temprano_final.descripcion}`}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {`${detalle.tarde_inicio.descripcion} - ${detalle.tarde_final.descripcion}`}
                                    </td>
                                </tr>
                            ))}
                    </tbody>



                </table>) : (
                <div className='flex justify-center items-center h-full'>
                    Horario vacio, crea un horario
                </div>
            )}


            {showPopup &&
                (
                    <CreateScheduleComponent
                        idPerson={idPerson}
                        dataPerson={dataPerson}
                        onClose={togglePopup}
                        update={refetch}
                    />
                )}
            {showPopupUpdate && selectedScheduleId && (
                <UpdateScheduleComponent
                    onClose={togglePopupUpdateId}
                    idUpdate={filteredSchedules[0].id_horario_trabajo}
                    dataUpdate={filteredSchedules[0]}
                    update={refetch}
                />
            )}
        </div>

    )
}
