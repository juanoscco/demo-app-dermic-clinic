"use client"
import React from 'react'
import GetDniApiHook from "@/app/(dash-admin)/hooks/dni/get-dni-api.hook"
import { renderLastName, renderName } from "@/app/(dash-admin)/utils/renderNameUtils";

export default function AppointmentCreate() {
  const { data, isLoading, handleClick, setDni, error } = GetDniApiHook()

  // TODO: FORM CREATE STEPS 

  return (
    <React.Fragment>
      <h1 className='text-2xl'>Agendar una Cita</h1>
      <section className='mt-4 p-4 bg-white'>
        <form className="grid grid-cols-1 md:grid-cols-2  gap-5">
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>DNI <span className="text-red-500">*</span> {error && (<span className='text-red-500'>No se encontro</span>)} </label>
            <div className='flex gap-3'>
              <input type="text" onChange={(e) => setDni(e.target.value)} className='w-full py-2 outline-none px-1' />

              <button onClick={handleClick} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Buscar'}
              </button>
            </div>
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Nombres <span className="text-red-500">*</span></label>

            {data && <input type="text" className='w-full py-2 outline-none px-1' value={renderName(data.nombre)} readOnly />}
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Apellidos <span className="text-red-500">*</span></label>
            {data && <input type="text" className='w-full py-2 outline-none px-1' value={renderLastName(data.nombre)} readOnly />}
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Teléfono <span className="text-red-500">*</span></label>
            <input type="text" className='w-full py-2 outline-none px-1' />
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Email <span className="text-red-500">*</span></label>
            <input type="email" className='w-full py-2 outline-none px-1' />
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Fecha de nacimiento <span className="text-red-500">*</span></label>
            <input type="date" className='w-full py-2 outline-none px-1' />
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Estado civil <span className="text-red-500">*</span></label>
            <select className='w-full py-2 outline-none px-1'>
              <option value=""></option>
              <option value="">Soltero</option>
              <option value="">Casado</option>
              <option value="">Viudo</option>
              <option value="">Divorciado</option>
            </select>

          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Ocupación<span className="text-red-500">*</span></label>
            <input type="text" className='w-full py-2 outline-none px-1' />
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Dirección<span className="text-red-500">*</span></label>
            <input type="text" className='w-full py-2 outline-none px-1' />
          </div>
          <div className="border border-gray-300 text-left p-2">
            <label className='text-font-777 text-sm'>Lugar de Nacimiento<span className="text-red-500">*</span></label>
            <input type="text" className='w-full py-2 outline-none px-1' />
          </div>
          <button className='bg-[#82b440] p-2 text-white'>Guardar</button>
        </form>
      </section>
    </React.Fragment>
  )
}
