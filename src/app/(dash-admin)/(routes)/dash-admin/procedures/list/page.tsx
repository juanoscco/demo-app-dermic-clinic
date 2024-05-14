"use client"

import React, { useState } from 'react'
import Datatable from './components/Datatable';
import Locations from './components/Locations';
import Personal from './components/Personal';
import Rooms from './components/Rooms';

interface Tab {
  id: number;
  title: string;
  content: React.ReactNode;
}

const TabPanel = ({ tabs }: { tabs: Tab[] }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className=" h-5/6 mt-3 rounded-sm">
      <div className="flex gap-5 p-2 rounded-md bg-white">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`border-b cursor-pointer p-2 ${index === activeTab ? ' text-[#82b440] focus:text-[#82b440] border-[#82b440]' : 'text-gray-500 border-gray-200'}`}
            onClick={() => handleTabChange(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <section className="h-full ">{tabs[activeTab].content}</section>
    </div>
  );
};

export default function Procedures() {
  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Procedimientos',
      content: <Datatable />,
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
      content: <Rooms /> ,
    },
  ];
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Procedimientos</h1>
      <TabPanel tabs={tabs} />
    </React.Fragment>
  )
}
