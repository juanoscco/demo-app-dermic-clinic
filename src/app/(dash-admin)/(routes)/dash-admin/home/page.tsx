"use client"
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetAppointmentListQuery } from '../appointments/components/citas/list/store/service'
import { useGetExtraAppointmentsQuery } from '../appointments/components/extras/list/store/service'
import { useGetEmployeesQuery } from '../persons/list/store/service'
import { useGetPatientsQuery } from '../patients/list/store/service'
import { decodeToken } from '@/app/(dash-admin)/utils'

export default function Home() {
  const decoded = decodeToken({});

  const { data: appointmentsData, isLoading: appointmentLoad, isError: appointmentError } = useGetAppointmentListQuery({});
  const { data: appointmentsExtraData, isLoading: appointmentExtraLoad, isError: appointmentExtraError } = useGetExtraAppointmentsQuery({});
  const { data: employeesData, isLoading: employeesLoad, isError: employeesError } = useGetEmployeesQuery({});
  const { data: patientsData, isLoading: patientsLoad, isError: patientsError } = useGetPatientsQuery({});

  const isLoading = appointmentLoad || appointmentExtraLoad || employeesLoad || patientsLoad;
  const isError = appointmentError || appointmentExtraError || employeesError || patientsError;

  const [displayData, setDisplayData] = useState<React.ReactNode>(null);

  const calculateChange = (current: any, previous: any) => {
    if (current === undefined || previous === undefined) return null;
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2);
  };

  const previousData = {
    totalDoctors: 5, // Valor anterior para totalDoctors (ejemplo)
    totalPatients: 5, // Valor anterior para totalPatients (ejemplo)
    totalAppointments: 5, // Valor anterior para totalAppointments (ejemplo)
    totalExtraAppointments: 4 // Valor anterior para totalExtraAppointments (ejemplo)
  };

  const prepareData = useCallback(() => {

    if (isError) {
      setDisplayData(<div>Error loading data</div>);
      return;
    }
    if (isLoading) {
      setDisplayData(
        <section className="bg-[#82b440] p-5 rounded-b-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={index} className="text-white text-center p-3 rounded-md animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
            </article>
          ))}
        </section>
      );
      return;
    }

    const currentDoctors: any = employeesData?.data?.totalElements;
    const currentPatients: any = patientsData?.data?.totalElements;
    const currentAppointments: any = appointmentsData?.data?.totalElements;
    const currentExtraAppointments: any = appointmentsExtraData?.data?.totalElements;

    const doctorChange:any = calculateChange(currentDoctors, previousData.totalDoctors);
    const patientChange:any = calculateChange(currentPatients, previousData.totalPatients);
    const appointmentChange:any = calculateChange(currentAppointments, previousData.totalAppointments);
    const extraAppointmentChange:any = calculateChange(currentExtraAppointments, previousData.totalExtraAppointments);

    setDisplayData(
      <React.Fragment>
        <section className='bg-[#82b440] p-5 rounded-b-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          <article className='text-white text-center p-3 rounded-md'>
            <h1>Total doctores</h1>
            <span className='text-4xl'>{currentDoctors}</span>
            <p>{doctorChange >= 0 ? `${doctorChange}% aumento` : `${Math.abs(doctorChange)}% disminuido`}</p>
          </article>
          <article className='text-white text-center p-3 rounded-md'>
            <h1>Total pacientes</h1>
            <span className='text-4xl'>{currentPatients}</span>
            <p>{patientChange >= 0 ? `${patientChange}% aumento` : `${Math.abs(patientChange)}% disminuido`}</p>
          </article>
          <article className='text-white text-center p-3 rounded-md'>
            <h1>Total citas Médicas</h1>
            <span className='text-4xl'>{currentAppointments}</span>
            <p>{appointmentChange >= 0 ? `${appointmentChange}% aumento` : `${Math.abs(appointmentChange)}% disminuido`}</p>
          </article>
          <article className='text-white text-center p-3 rounded-md'>
            <h1>Total de Citas Extras</h1>
            <span className='text-4xl'>{currentExtraAppointments}</span>
            <p>{extraAppointmentChange >= 0 ? `${extraAppointmentChange}% aumento` : `${Math.abs(extraAppointmentChange)}% disminuido`}</p>
          </article>
        </section>
        <section className='flex justify-end mt-3 gap-3'>
          <Link className='p-2 bg-[#82b440] rounded-md text-white' href="./appointments/appointment-calendar">Agendar una cita</Link>
          <Link className='p-2 bg-[#82b440] rounded-md text-white' href={`./patients/list`}>Busqueda de paciente</Link>
        </section>
      </React.Fragment>
    );
  }, [isError, isLoading, employeesData, patientsData, appointmentsData, appointmentsExtraData]);

  useEffect(() => {
    prepareData();
  }, [prepareData]);

  return (
    <React.Fragment>
      <h1 className='font-bold text-2xl'>Bienvenido {decoded?.empleado}!</h1>
      <span className='text-gray-500'>Seccion de panel de control</span>
      <section className='mt-4'>
        <section className='bg-slate-950 text-white p-5 rounded-t-xl'>
          <h1 className='font-bold text-xl'>Analisis</h1>
        </section>
        {displayData}
      </section>
    </React.Fragment>
  );
}
