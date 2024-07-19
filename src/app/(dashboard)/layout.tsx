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

  const { toggleSidebar, sidebarActive, setSidebarActive } = AsideSidebarHook()
  return (
    <main className='min-h-screen flex min-w-full'>
      <AsideComponent sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} setSidebarActive={setSidebarActive} />
      <section className='w-full px-5 flex flex-col gap-5 bg-[#fafafa] '>
        <NavbarComponent toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />
        <section className="h-5/6">
          {children}
        </section>
      </section>
    </main >
  )
}