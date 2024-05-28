import React from 'react'
import LogoutExitHook from '../../hooks/logout/logout-exit.hook'
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Props } from "@/app/(dash-admin)/models/navbar/navbar.models"


export default function NavbarComponent({ handleBurgerClick, isNavActive }: Props) {

    const { handleLogout } = LogoutExitHook()

    return (
        <nav className='flex justify-between py-5 border-b-2 border-gray-200'>
            <div className='flex items-start gap-2'>
                <button
                    className={`xl:hidden ${isNavActive ? " active" : ""}`}
                    onClick={handleBurgerClick}
                >
                    <i className={`icon-burger `}></i>
                </button>
                <input type="text" placeholder='Buscar...' className='px-2 outline-none text-md bg-transparent w-full' />
            </div>
            <ul className='flex gap-5'>
                <li>Crear</li>
                <li>
                    <FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} className='cursor-pointer' />
                </li>
            </ul>
        </nav>
    )
}
