import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { user_admin } from '@/assets/'
import TabsOpensHook from "../../hooks/tabs/tabs-opens.hook";
// 
import { sections } from "@/app/(dash-admin)/components/aside/mock/aside.mocks"
import { Props } from "@/app/(dash-admin)/models/aside/aside.models"
// 
import { decodeToken } from "@/app/(dash-admin)/utils/"
export function AsideComponent({ isNavActive, handleNavItemClick }: Props) {

  const {
    openSections, toggleAccordion
  } = TabsOpensHook()

  const decoded = decodeToken({})

  return (
    <aside className={`${isNavActive ? " active" : ""
      } aside-content flex flex-col xl:w-[280px] gap-10 p-5 border-e-[3px] bg-white border-[#82B440] `}>
      <section className='flex justify-between items-center'>
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
      </section>
      <section className='flex gap-3 items-center shadow-md p-1 rounded-md'>
        <Image src={user_admin} alt="user admin" className='h-10 w-10 rounded-full' unoptimized />
        <div>
          <h2 className='text-md text-gray-500'>Bienvenido</h2>
          <span className='text-sm font-bold text-gray-500'>{decoded?.empleado.split(" ").slice(0, 2).join(" ")}</span>
        </div>
      </section>

      <ul className='flex flex-col gap-3'>
        <h3 className='text-gray-400'>Clinica</h3>
        {sections.map((section, i) => (
          <React.Fragment key={i}>
            {section.link ? (
              <li key={section.id} className='flex flex-col gap-2 cursor-pointer' onClick={handleNavItemClick}>
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
                          <li className='hover:text-[#82b440] focus:text-[#82b440]' onClick={handleNavItemClick}>{link.text}</li>
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