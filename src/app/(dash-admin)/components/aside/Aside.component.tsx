import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { user_admin } from '@/assets/'
import TabsOpensHook from "../../hooks/tabs/tabs-opens.hook";


interface Props {
  isNavActive: any,
  handleNavItemClick: any,
}

// Definición de la interfaz para los enlaces
interface LinkItem {
  href: string;
  text: string;
}

// Definición de la interfaz para cada sección
interface Section {
  id: string;
  title: string;
  icon: string;
  links?: LinkItem[];
  link?: string;
}

// Array de secciones con tipificación
const sections: Section[] = [
  {
    id: 'one',
    title: 'Panel Principal',
    icon: 'icon-dashboard',
    link: '/dash-admin/home',
  },
  {
    id: 'two',
    title: 'Personas',
    icon: 'icon-doctor',
    links: [
      { href: '/dash-admin/persons/create', text: 'Crear usuario' },
      { href: '/dash-admin/persons/list', text: 'Ver usuarios' },
      { href: '/dash-admin/persons/exceptions', text: 'Excepciones' },
      { href: '/dash-admin/persons/agenda-opening', text: 'Apertura de agenda' },
      { href: '/dash-admin/persons/schedules', text: 'Horarios' }
    ],
  },
  {
    id: 'three',
    title: 'Citas',
    icon: 'icon-appointments',
    links: [
      { href: '/dash-admin/appointments/list', text: 'Ver citas' },
      { href: '/dash-admin/appointments/waiting-patient', text: 'Paciente en espera' },
      { href: '/dash-admin/appointments/appointment-reports', text: 'Reporte de citas' },
      { href: '/dash-admin/appointments/appointment-calendar', text: 'Calendario de citas' },
      { href: '/dash-admin/appointments/appointment-extras', text: 'Calendario de extras' },
    ],
  },
  {
    id: 'four',
    title: 'Pacientes',
    icon: 'icon-person-circle',
    link: '/dash-admin/patients/list'
  },
  {
    id: 'five',
    title: 'Infraestructura',
    icon: 'icon-infrastructure',
    links: [
      { href: '/dash-admin/infrastructure/create', text: 'Crear infraestructura' },
      { href: '/dash-admin/infrastructure/list', text: 'Ver infraestructura' },
    ],
  },
  {
    id: 'six',
    title: 'Procedimientos',
    icon: 'icon-procedures',
    links: [
      { href: '/dash-admin/procedures/create', text: 'Crear procedimientos' },
      { href: '/dash-admin/procedures/list', text: 'Ver procedimientos' },
    ],
  },
];

export default function AsideComponent({ isNavActive, handleNavItemClick }: Props) {

  const {
    openSections, toggleAccordion
  } = TabsOpensHook()




  return (
    <aside className={`${isNavActive ? " active" : ""
      } aside-content flex flex-col xl:w-[280px] gap-10 p-5 border-e-[3px] bg-white border-[#82B440] `}>
      <div className='flex justify-between items-center'>
        <Link href="/dash-admin/home">
          <div className='flex items-end gap-1'>
            {/* <Image src={logo} alt="logo clinica" className='w-7 h-8' /> */}
            <h1 className='text-lg '>Clinica de la Piel</h1>
          </div></Link>
        <button
          className={`xl:hidden${isNavActive ? " active" : ""} flex justify-center items-center `}
          onClick={handleNavItemClick}
        >
          <i className={`icon-close${isNavActive ? " active" : ""}`} onClick={handleNavItemClick}></i>
        </button>
      </div>
      <div className='flex gap-3 items-center shadow-md p-1 rounded-md'>
        <Image src={user_admin} alt="user admin" className='h-10 w-10 rounded-full' />
        <div>
          <h2 className='text-md text-gray-500'>Bienvenido</h2>
          <span className='text-sm font-bold text-gray-500'>Adm. Alan Green</span>
        </div>
      </div>
      {/* <ul className='flex flex-col gap-3'>
        <h3 className='text-gray-400'>Clinica</h3>
        {sections.map((section, i) => (
          <React.Fragment key={i}>
            {section.link ? (
              <li key={section.id} className='flex flex-col gap-2 cursor-pointer display-block'>
                <Link href={section.link}>
                  <div className='flex gap-2 items-center justify-between hover:text-[#82b440] focus:text-[#82b440]'>
                    <p>{section.title}</p>
                    <i className={section.icon}></i>
                  </div>
                </Link>
              </li>
            ) : (
              <li
                key={section.id}
                className='flex flex-col gap-2 cursor-pointer '
                onClick={() => section.links && toggleAccordion(section.id)}
              >
                <div className='flex gap-2 items-center justify-between hover:text-[#82b440] focus:text-[#82b440]'>
                  <p>{section.title}</p>
                  <i className={section.icon}></i>
                </div>
                {openSections[section.id] &&
                  section.links &&
                  section.links.length > 0 && (
                    <ul className='flex flex-col gap-1 list-disc pl-7 display-into-block'>
                      {section.links.map((link, index) => (
                        <Link key={index} href={link.href} >
                          <li className=' hover:text-[#82b440] focus:text-[#82b440]'>{link.text}</li>
                        </Link>
                      ))}
                    </ul>
                  )}
              </li>
            )}
          </React.Fragment>
        ))}
      </ul> */}
      <ul className='flex flex-col gap-3'>
        <h3 className='text-gray-400'>Clinica</h3>
        {sections.map((section, i) => (
          <React.Fragment key={i}>
            {section.link ? (
              <li key={section.id} className='flex flex-col gap-2 cursor-pointer display-block'>
                <Link href={section.link}>
                  <div className='flex gap-2 items-center justify-between hover:text-[#82b440] focus:text-[#82b440]'>
                    <p>{section.title}</p>
                    <i className={section.icon}></i>
                  </div>
                </Link>
              </li>
            ) : (
              <li
                key={section.id}
                className='flex flex-col gap-2 cursor-pointer'
                onClick={() => section.links && toggleAccordion(section.id)}
              >
                <div className='flex gap-2 items-center justify-between hover:text-[#82b440] focus:text-[#82b440]'>
                  <p>{section.title}</p>
                  <i className={section.icon}></i>
                </div>
                {openSections[section.id] &&
                  section.links &&
                  section.links.length > 0 && (
                    <ul className='flex flex-col gap-1 list-disc pl-7'>
                      {section.links.map((link, index) => (
                        <Link key={index} href={link.href}>
                          <li className='hover:text-[#82b440] focus:text-[#82b440] display-into-block'>{link.text}</li>
                        </Link>
                      ))}
                    </ul>
                  )}
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </aside >
  )
}
