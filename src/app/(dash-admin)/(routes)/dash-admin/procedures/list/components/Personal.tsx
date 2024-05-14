import React from 'react'
import { users } from "@/mocks/Users/users.mocks"
import { procedures } from "@/mocks/procedures/procedures.mocks"

export default function Personal() {
  return (
    <section className='mt-2 bg-white'>
      <section className=' flex items-center justify-around h-5/6 w-full p-5'>
        <section className='w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-4'>
            <input className='outline-none border border-gray-200 rounded-md p-2' type='text' placeholder='Buscar...' />

            {users.map((user) => (
              <li key={user.id} className='px-2 py-1 mt-1 border-b hover:bg-gray-200 cursor-pointer border-gray-200'>{user.nombre} {user.apellidos}</li>
            ))}
          </ul>
        </section>
        <section className='w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-2'>
            <input type="text" className='outline-none border border-gray-200 rounded-md p-2' placeholder='Buscar...' />
            {procedures.map((procedure) => (
              <li key={procedure.id} className='flex items-center justify-between mt-1'>
                <p className='py-1'>{procedure.nombre}</p> <input type="checkbox" className='w-5 focus:text-blue-500' />
              </li>
            ))}
          </ul>
        </section>

      </section>
      <section className='w-[90%] flex justify-end pb-3'>
        <button className='px-3 py-1 bg-[#82b440] rounded-md text-white'>Grabar</button></section>
    </section>
  )
}
