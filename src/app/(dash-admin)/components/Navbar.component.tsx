import React from 'react'
import LogoutExitHook from '../hooks/logout-exit.hook'
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    handleBurgerClick: any,
    isNavActive: any
}

export default function NavbarComponent({ handleBurgerClick, isNavActive }: Props) {

    const { handleLogout } = LogoutExitHook()

    return (
        <nav className='flex justify-between xl:justify-end py-5 border-b-2 border-gray-200'>
            <button
                className={`xl:hidden ${isNavActive ? " active" : ""}`}
                onClick={handleBurgerClick}
            >
                <i className={`icon-burger `}></i>
            </button>
            <ul className='flex gap-5'>
                <li>Crear</li>
                <li>
                    <FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} className='cursor-pointer' />
                </li>
            </ul>
        </nav>
    )
}
