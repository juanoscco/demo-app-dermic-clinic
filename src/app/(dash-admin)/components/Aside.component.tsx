import React from 'react'
import TabsOpensHook from "../hooks/tabs-opens.hook";
import Link from "next/link"
import { user_admin } from '@/assets/'
import Image from 'next/image'
import { faGauge, faUserDoctor, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  // handleBurgerClick: any,
  isNavActive: any,
  handleNavItemClick:any,
}

export default function AsideComponent({ isNavActive, handleNavItemClick }: Props) {
  const {
    isOpenOne,
    isOpenTwo,
    toggleAccordionOne,
    toggleAccordionTwo,
    isOpenThree,
    isOpenFour,
    isOpenFive,
    toggleAccordionThree,
    toggleAccordionFour,
    toggleAccordionFive,
  } = TabsOpensHook()
  return (
    <aside className={`${isNavActive ? " active" : ""
      } aside-content flex flex-col xl:w-[300px] gap-10 p-5 border-e-[3px] bg-white border-[#82B440] `}>
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
      <div>
        <ul className='flex flex-col gap-3'>
          <h3 className='text-gray-400'>Clinica</h3>

          <Link href="/dash-admin/home">
            <li className='flex gap-2 items-center justify-between cursor-pointer'>
              <p>Panel Principal</p>
              <FontAwesomeIcon icon={faGauge} />
            </li>
          </Link>
          <li className='flex flex-col gap-2 cursor-pointer' onClick={toggleAccordionOne}>
            <div className='flex gap-2 items-center justify-between'>
              <p>Personas</p>
              {/* <i className='icon-persons'></i> */}
              <FontAwesomeIcon icon={faUserDoctor} size='1x' />
            </div>

            {isOpenOne && (
              <ul className='flex flex-col gap-1 list-disc pl-7'>
                <Link href="/dash-admin/persons/create">
                  <li>
                    Crear usuario
                  </li></Link>
                <Link href="/dash-admin/persons/list">
                  <li>Ver usuarios</li>
                </Link>
                <Link href="/dash-admin/persons/exceptions">
                  <li>Excepciones</li>
                </Link>
                <Link href="/dash-admin/persons/agenda-opening">
                  <li>Apertura de agenda</li>
                </Link>
              </ul>
            )}
          </li>

          <li className='flex flex-col gap-2 cursor-pointer'
            onClick={toggleAccordionThree}
          >
            <div className='flex gap-2 items-center justify-between'>
              <p>Pacientes</p>
              <FontAwesomeIcon icon={faUserCircle} />
            </div>

            {isOpenThree && (
              <ul className='flex flex-col gap-1 list-disc pl-7'>
                <Link href='/dash-admin/patients/create'><li>Crear pacientes</li></Link>
                <Link href='/dash-admin/patients/list'><li>Ver pacientes</li></Link>
              </ul>
            )}
          </li>
          <li className='flex gap-2 items-center justify-between cursor-pointer' onClick={toggleAccordionFour}>
            <p>Infraestructura</p>
            <i className='icon-infrastructure'></i>
          </li>
          {isOpenFour && (
            <ul className='flex flex-col gap-1 list-disc pl-7'>
              <Link href='/dash-admin/infrastructure/create'>
                <li>
                  Crear infraestructura
                </li>
              </Link>
              <Link href='/dash-admin/infrastructure/list'>
                <li>
                  Ver infraestructura
                </li>
              </Link>
            </ul >

          )}
          <li
            className='flex gap-2 items-center justify-between cursor-pointer'
            onClick={toggleAccordionFive}>
            <p>Procedimientos</p>
            <i className='icon-procedures'></i>
          </li>
          {isOpenFive && (
            <ul className='flex flex-col gap-1 list-disc pl-7'>
              <Link href='/dash-admin/procedures/create'>
                <li>Crear procedimientos</li>
              </Link>
              <Link href='/dash-admin/procedures/list'>
                <li>Ver procedimientos</li>
              </Link>
            </ul>
          )}


          <li className='flex flex-col '>
            <div
              className='flex gap-2 items-center justify-between cursor-pointer'
              onClick={toggleAccordionTwo}
            >
              <p>Citas</p>
              <i className='icon-appointments'></i>
            </div>
            {isOpenTwo && (
              <ul className='flex flex-col gap-1 list-disc pl-7'>
                {/* <Link href='/dash-admin/appointments/create'>
                  <li className='cursor-pointer'>Crear Cita</li>
                </Link> */}
                <Link href='/dash-admin/appointments/list'>
                  <li className='cursor-pointer'>Ver citas</li>
                </Link>
                
                <li>Paciente en espera</li>
                <li>Calendario de extras</li>
                <Link href='/dash-admin/appointments/appointment-calendar'>
                  <li className='cursor-pointer'>Calendario de citas</li>
                </Link>
              </ul>
            )}
          </li>

        </ul>
      </div>
    </aside>
  )
}
