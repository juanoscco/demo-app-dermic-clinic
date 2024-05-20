import React from 'react'

export default function ProceduresCreate() {
    return (
        <React.Fragment>
            <h1 className='text-2xl'>Crear procedimiento</h1>
            <section className='mt-4 p-4 bg-white'>
                <form className="grid grid-cols-1 md:grid-cols-2 rounded-sm gap-5">
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Nombre <span className="text-red-500">*</span></label>
                        <input type="text" className='w-full py-2 outline-none px-1' />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Duracion <span className="text-red-500">*</span></label>
                        {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
                        <select className='w-full py-2 outline-none px-1'>
                            <option value=""></option>
                            <option value="0">0 minutos</option>
                            <option value="5">5 minutos</option>
                            <option value="10">10 minutos</option>
                            <option value="15">15 minutos</option>
                            <option value="20">20 minutos</option>
                            <option value="25">25 minutos</option>
                            <option value="30">30 minutos</option>
                            <option value="35">35 minutos</option>
                            <option value="40">40 minutos</option>
                            <option value="45">45 minutos</option>
                            <option value="50">50 minutos</option>
                            <option value="55">55 minutos</option>
                            <option value="60">1 hora</option>
                        </select>

                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Con Anestecia <span className="text-red-500">*</span></label>
                        {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
                        <select className='w-full py-2 outline-none px-1'>
                            <option value=""></option>
                            <option value="">si</option>
                            <option value="">no</option>
                        </select>
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Tipo <span className="text-red-500">*</span></label>
                        {/* <input type="email" className='w-full py-2 outline-none px-1' /> */}
                        <select className='w-full py-2 outline-none px-1'>
                            <option value=""></option>
                            <option value="">Depilacion</option>
                            <option value="">Piel</option>
                            <option value="">Otros</option>
                        </select>
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Subtipo <span className="text-red-500">*</span></label>
                        {/* <input type="text" className='w-full py-2 outline-none px-1' /> */}
                        <select className='w-full py-2 outline-none px-1'>
                            <option value=""></option>
                            <option value="">Privado</option>
                            <option value="">Publico</option>
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
                    <button className='bg-[#82b440] p-2 text-white'>Crear</button>
                </form>
            </section>
        </React.Fragment>
    )
}
