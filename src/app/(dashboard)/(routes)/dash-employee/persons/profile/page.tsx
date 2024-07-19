"use client"
import React from 'react'
import ScheludePersonComponent from './components/schedule-component/schelude-person.component';
import AgendaPersonComponent from './components/agenda-component/agenda-person.component';
import ExceptionPersonComponent from './components/exception-component/exception-person.component';
// import { useGetEmployeeByIdQuery } from "@/app/(dashboard)/store"


import Link from 'next/link';
import { Tab } from "@/components/TabPanel/interface/TabPanel.model"
import { TabPanel } from '@/components';
// import { DetailPersonComponent } from './components/employee-component/detail-person.component';
import { decodeToken } from '@/app/(dashboard)/utils';



const getFirstThreeNames = (fullName: string) => {
  if (!fullName) return '';

  const namesArray = fullName.split(' ');
  return namesArray.slice(0, 3).join(' ');
};

export default function DetailsUserEmployees() {

  const decoded = decodeToken({})

  const tabs: Tab[] = [

    {
      id: 1,
      title: 'Horarios',
      content: <ScheludePersonComponent
        // dataPerson={dataEmployee}
        idPerson={decoded?.id_empleado}
      />
    },
    {
      id: 2,
      title: 'Apertura de agenda',
      content: <AgendaPersonComponent
        // dataPerson={dataEmployee}
        idPerson={decoded?.id_empleado}
      />
    },
    {
      id: 3,
      title: 'Excepciones',
      content: <ExceptionPersonComponent
        // dataPerson={dataEmployee}
        idPerson={decoded?.id_empleado} />
    }
  ]



  return (
    <section className="p-4">
      <Link
        href={`/dash-admin/persons/list`}
        className="inline-block mb-4 text-blue-500 hover:text-blue-700 transition-all duration-200"
      >
        Atras
      </Link>
      <h1 className='capitalize font-semibold text-xl'>Detalle Empleado {getFirstThreeNames(decoded?.empleado)}</h1>
      <TabPanel tabs={tabs} />

    </section>

  );
}
