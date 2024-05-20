"use client"

import React from 'react'
import ProceduresView from './components/Procedures/Procedures';
import Locations from './components/Location/Locations';
import Personal from './components/Personal/Personal';
import Rooms from './components/Rooms/Rooms';
import { Tab } from "@/models/components/TabPanel/TabPanel.model"
import { TabPanel } from "@/components/TabPanel/TabPanel.component"


export default function Procedures() {
  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Procedimientos',
      content: <ProceduresView />,
    },
    {
      id: 2,
      title: 'Sedes',
      content: <Locations />,
    },
    {
      id: 3,
      title: 'Personal',
      content: <Personal />,
    },
    {
      id: 4,
      title: 'Salas',
      content: <Rooms />,
    },
  ];
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Procedimientos</h1>
      <TabPanel tabs={tabs} />
    </React.Fragment>
  )
}
