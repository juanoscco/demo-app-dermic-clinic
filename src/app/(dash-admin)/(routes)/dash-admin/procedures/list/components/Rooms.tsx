import React from 'react'
import { infrastructure } from "@/mocks/infrastructure/infrastructure.mocks"
import { procedures } from "@/mocks/procedures/procedures.mocks"

export default function Rooms() {
  return (
    <section className='mt-2 bg-white'>
      <section className=' flex items-center justify-around h-5/6 w-full p-5'>
        {/*  */}
        <section className='w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-2'>
            <input type="text" className='outline-none border border-gray-200 rounded-md p-2' placeholder='Buscar...' />
            {procedures.map((procedure) => (
              <li key={procedure.id} className='flex items-center justify-between mt-1 py-1 px-2  hover:bg-gray-200 cursor-pointer'>
                {/* <p className='py-1'></p> <input type="checkbox" className='w-5 focus:text-blue-500' /> */}
                {procedure.nombre}
              </li>
            ))}
          </ul>
        </section>
        {/*  */}
        <section className='w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-4 flex flex-col'>
            <input className='outline-none border border-gray-200 rounded-md p-2' type='text' placeholder='Buscar...' />
            {infrastructure.map((infra) => (
              <li key={infra.id}>
                <h1 className='border-b pb-2 my-2 border-gray-200'>{infra.lugar}</h1>
                <ul className='flex flex-col gap-1 mt-1 p-1'>
                  {infra.cuartos.map((room, i) => (
                    <li key={i} 
                    className='border-b border-gray-200 flex justify-between items-center '>
                      <p>{room.cuarto}</p> <input type="checkbox" />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

      </section>
      <section className='w-[90%] flex justify-end pb-3'>
        <button className='px-3 py-1 bg-[#82b440] rounded-md text-white'>Grabar</button>
      </section>
    </section>
  )
}
