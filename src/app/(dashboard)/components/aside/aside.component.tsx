"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { user_admin } from '@/assets/'
import TabsOpensHook from "../../hooks/tabs/tabs-opens.hook";
// 
import { sectionsAdmin, sectionsEmployee, sectionsDoctor, sectionsVisualizer } from "@/app/(dashboard)/components/aside/mock/aside.mocks"
import { Props } from "@/app/(dashboard)/models/aside/aside.models"
// 
import { decodeToken } from "@/app/(dashboard)/utils";
import LogoutExitHook from '../../hooks/logout/logout-exit.hook'
// import { useAuth } from "@/app/(dashboard)/hooks/";


export function AsideComponent({ sidebarActive, toggleSidebar, setSidebarActive }: Props) {
  const { handleLogout } = LogoutExitHook();
  const initialDecodedState = decodeToken({}); // Decodificar de manera síncrona si es posible
  const [decoded, setDecoded] = useState(initialDecodedState);
  // const { role, user } = useAuth()

  const getSectionsByRole = (role: string) => {
    switch (role) {
      case 'EMPLOYEE':
        return sectionsEmployee;
      case 'DOCTOR':
        return sectionsDoctor;
      case 'VISUALIZER':
        return sectionsVisualizer;
      case 'ADMINISTRATOR':
      default:
        return sectionsAdmin;
    }
  };

  const sections = decoded?.role ? getSectionsByRole(decoded?.role) : [];

  const handleMenuItemIdClick = () => {
    if (window.innerWidth < 900) {
      if (!sidebarActive) {
        setSidebarActive(!sidebarActive);
      }
    }
  };

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLLIElement>,
  ) => {
    const menuItem = e.currentTarget;
    menuItem.classList.toggle('active');
    const submenu = menuItem.querySelector('ul');
    if (submenu) {
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }
    const siblingMenus = menuItem.parentElement?.querySelectorAll('li');
    if (siblingMenus) {
      siblingMenus.forEach((item) => {
        if (item !== menuItem) {
          item.classList.remove('active');
          const sub = item.querySelector('ul');
          if (sub) {
            sub.style.display = 'none';
          }
        }
      });
    }
  };

  return (
    <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
      <div className="menu-btn" onClick={toggleSidebar}>
        <i className="icon-arrow-left"></i>
      </div>
      <div >
        <h3 className={`title-head ${sidebarActive ? 'active' : ''} `}>Clinica De la Piel</h3>
      </div>
      {
        decoded?.role === "EMPLOYEE" ? (
          <Link href={`/dash-employee/persons/profile`} className='cursor-pointer hover:border-b-4'>
            <div className="head">
              <div className="user-img">
                <Image src={user_admin} alt="user admin" className='h-10 w-10 rounded-full' unoptimized />
              </div>
              <div className="user-details">
                <p className="title">Bienvenido!</p>
                <p className="name"> {decoded?.empleado.split(" ").slice(0, 2).join(" ").toLowerCase()}</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="head">
            <div className="user-img">
              <Image src={user_admin} alt="user admin" className='h-10 w-10 rounded-full' unoptimized />
            </div>
            <div className="user-details">
              <p className="title">Bienvenido!</p>
              <p className="name"> {decoded?.empleado.split(" ").slice(0, 2).join(" ").toLowerCase()}</p>
            </div>
          </div>
        )
      }
      <div className="nav">
        {sections.map((section: any) => (
          <div key={`section-${section.id}`} className="menu">
            <p className="title">{section.label}</p>
            <ul>
              {section.information.map((item: any) => (
                <li key={`item-${item.id}`} onClick={item.onClick === 'handleMenuItemClick' ? handleMenuItemClick : handleMenuItemIdClick} className={item.subMenu.length > 0 ? 'close-id' : ''}>
                  <Link href={item.href}>
                    <i className={item.iconClass}></i>
                    <span className="text">{item.text}</span>
                    {item?.arrowClass && <i className="icon icon-arrow-down arrow"></i>}
                  </Link>
                  {item.subMenu.length > 0 && (
                    <ul className="sub-menu">
                      {item.subMenu.map((subItem: any) => (
                        <li key={`subItem-${subItem.id}`} onClick={handleMenuItemIdClick}>
                          <Link href={subItem.href}>
                            <span className="text">{subItem.text}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
      <div className="menu">
        <p className="title">Ayuda</p>
        <ul>
          <li onClick={handleLogout}>
            <a href="#">
              <i className="icon icon-power-off"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}