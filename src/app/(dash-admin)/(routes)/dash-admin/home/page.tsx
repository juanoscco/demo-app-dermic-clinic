import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <h1 className='font-bold text-2xl'>Bienvenido Administrador!</h1>
      <span className='text-gray-500'>Seccion de panel de control</span>
      <section className='mt-4'>
        <section className='bg-slate-950 text-white p-5 rounded-t-xl'>
          <h1 className='font-bold text-xl'>Analisis</h1>
        </section>
        <section className='bg-[#82b440] p-5 rounded-b-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          <article className='text-white text-center p-3 rounded-md '>
            <h1>Total doctores</h1>
            <span className='text-4xl'>45</span>
            <p>1.78% disminuido</p>
          </article>
          <article className='text-white text-center p-3 rounded-md '>
            <h1>Total pacientes</h1>
            <span className='text-4xl'>120</span>
            <p>5% aumento</p>
          </article>
          <article className='text-white text-center p-3 rounded-md '>
            <h1>Total citas Médicas</h1>
            <span className='text-4xl'>65</span>
            <p>2.5% disminuido</p>
          </article>
          <article className='text-white text-center p-3 rounded-md '>
            <h1>Total procesos</h1>
            <span className='text-4xl'> 30</span>
            <p>10% aumento</p>
          </article>
        </section>
      </section>
      <section className='flex justify-end mt-3 gap-3'>
        <button className='p-2 bg-[#82b440] rounded-md text-white'>Agendar una cita</button>
        <button className='p-2 bg-[#82b440] rounded-md text-white'>Busqueda de paciente</button>
      </section>

    </React.Fragment>
  )
}
