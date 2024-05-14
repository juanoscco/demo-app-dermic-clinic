"use client"
import React from 'react'
import { renderLastName, renderName } from "@/app/(dash-admin)/utils/renderNameUtils";
import GetDniApiHook from "@/app/(dash-admin)/hooks/get-dni-api.hook"

export default function UserCreate() {
    const {data,isLoading, handleClick, setDni } = GetDniApiHook()
    return (
        <React.Fragment>
            <h1 className='text-2xl '>Crear usuarios</h1>
            <section className='mt-4 p-4 bg-white'>
                <form className="grid grid-cols-1 md:grid-cols-2  gap-5">
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>DNI <span className="text-red-500">*</span></label>
                        <div className='flex gap-3'>
                            <input type="text" onChange={(e) => setDni(e.target.value)} className='w-full py-2 outline-none px-1' />

                            <button onClick={handleClick} disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Buscar'}
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Nombres <span className="text-red-500">*</span></label>
                        {data && <input type="text" className='w-full py-2 outline-none px-1' value={ renderName(data.nombre)} readOnly/>}
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Apellidos <span className="text-red-500">*</span></label>
                        {data && <input type="text" className='w-full py-2 outline-none px-1' value={renderLastName(data.nombre)} readOnly />}
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>teléfono <span className="text-red-500">*</span></label>
                        <input type="text" className='w-full py-2 outline-none px-1' />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Email <span className="text-red-500">*</span></label>
                        <input type="email" className='w-full py-2 outline-none px-1' />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Contraseña <span className="text-red-500">*</span></label>
                        <input type="password" className='w-full py-2 outline-none px-1' />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Rol <span className="text-red-500">*</span></label>
                        {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
                        <select className='w-full py-2 outline-none px-1'>
                            <option value=""></option>
                            <option value="">Administrador</option>
                            <option value="">Empleado</option>
                        </select>

                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Estado <span className="text-red-500">*</span></label>
                        {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
                        <select className='w-full py-2 outline-none px-1'>
                            <option value=""></option>
                            <option value="">Habilitado</option>
                            <option value="">Desabilitado</option>
                        </select>

                    </div>
                    <button className='bg-[#82b440] p-2 text-white'>Grabar</button>
                </form>
            </section>
        </React.Fragment>
    )
}
