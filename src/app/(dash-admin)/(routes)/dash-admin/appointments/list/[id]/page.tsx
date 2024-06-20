"use client"
import React from 'react'
import { useGetAppointmentByIdQuery } from '../../components/citas/find-by-id/store/service'

interface Props {
    params: {
        id: number
    }
}

export default function DetailsAppointment({ params }: Props) {
    const { data, isLoading, error } = useGetAppointmentByIdQuery(params.id);
    console.log(data)
    return (
        <div>
            <h1>Detalle de la cita</h1>
            {isLoading ? (
                <div>Cargando....</div>
            ) : (
                <span>Numero: {data.data.id_cita}</span>
            )}
        </div>
    )
}
