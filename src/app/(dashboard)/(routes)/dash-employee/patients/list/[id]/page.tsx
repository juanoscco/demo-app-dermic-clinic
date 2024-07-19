"use client"
// import { useGetPatientByIdQuery } from './store/service';
import { useGetPatientByIdQuery } from "@/app/(dashboard)/store"
import { Tab } from "@/components/TabPanel/interface/TabPanel.model"
import { TabPanel } from '@/components';
import { PatientsComponent } from './components/patients-component/patients.component';
import { PatientsAppointmentsComponent } from './components/patients-appointments-component/patients-appointments.component';
import { PatientsExtraAppointmentsComponent } from './components/patients-extra-appointments-component/patients-extra-appointments.component';
import Link from 'next/link';

interface Props {
    params: {
        id: number
    }
}

export default function DetailsPatients({ params }: Props) {

    const { data, error, isLoading, refetch } = useGetPatientByIdQuery(params.id);
    const dataPatient = data?.data;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading patient details</div>;



    // TODO: FALTA AGREGAR MAS DISEÑO UI
    const tabs: Tab[] = [
        {
            id: 1,
            title: 'Paciente',
            content: <PatientsComponent dataPatient={dataPatient} refetch={refetch} />,
        },
        {
            id: 2,
            title: 'Historial de Citas',
            content: <PatientsAppointmentsComponent dataPatient={dataPatient} />,
        },
        {
            id: 3,
            title: 'Historial de Citas Extras',
            content: <PatientsExtraAppointmentsComponent dataPatient={dataPatient} />,
        },

    ];
    return (
        <>
            <Link
                href={`/dash-admin/persons/list`}
                className="inline-block mb-4 text-blue-500 hover:text-blue-700 transition-all duration-200"
            >
                Atras
            </Link>
            <h1 className='text-gray-800 capitalize text-xl'>
                paciente: {dataPatient.nombres.toLowerCase()}
            </h1>
            <TabPanel tabs={tabs} />
        </>

    )
}
