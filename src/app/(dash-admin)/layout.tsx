"use client"
import React from 'react';
import { AsideComponent } from './components/aside/';
import NavbarComponent from './components/nav/Navbar.component';
import AsideSidebarHook from './components/aside/hook/aside-sidebar.hook';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const { handleBurgerClick, isNavActive, handleNavItemClick } = AsideSidebarHook()
  return (
    <main className='min-h-screen flex min-w-full'>
      <AsideComponent isNavActive={isNavActive} handleNavItemClick={handleNavItemClick} />
      <section className='w-full px-5 flex flex-col gap-5 bg-[#fafafa] '>
        <NavbarComponent handleBurgerClick={handleBurgerClick} isNavActive={isNavActive} />
        <section className="h-5/6">
          {children}
        </section>
      </section>
    </main >
  )
}
