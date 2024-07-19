import React from 'react'
import { Props } from "@/app/(dashboard)/models/navbar/navbar.models"

export default function NavbarComponent({ sidebarActive, toggleSidebar }: Props) {

    return (
        <nav className='flex justify-between py-5 border-b-2 border-gray-200'>
            <div className='flex items-start gap-2'>
                <button
                    className={` ${sidebarActive ? 'active' : ''} block sm:hidden`} 
                    onClick={toggleSidebar}
                >
                    <i className='icon-burger'></i>
                </button>
                <input type="text" placeholder='Buscar...' className='px-2 outline-none text-md bg-transparent w-full' />
            </div>
            <ul className='flex items-center gap-5'>
                {/* <li>Crear</li> */}
                {/* <li className='flex items-center gap-2 cursor-pointer' onClick={handleLogout}>
                    <span>Cerrar Sesion</span>
                    <i className='icon-power-off cursor-pointer'></i>
                </li> */}
            </ul>
        </nav>
    )
}