"use client"
import React, { useState } from 'react'

export default function ApointmentExtras() {

  return (
    <React.Fragment>
      <h1 className='text-2xl'>Calendario de Extras</h1>
      <section className="bg-white p-4 mt-3 border rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="location"
            id="location"
            className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Los Olivos</option>
            <option value="">San Isidro</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md w-full md:w-auto">
          Buscar
        </button>
      </section>

      <section className='w-full bg-white h-[40rem] overflow-x-auto mt-4'>
        <section className='w-full p-4'>
          <table className='w-full bg-white rounded-lg'>
            <thead>
              <tr>
                <th className='px-4 py-2 border'>Hora</th>
                <th className='px-4 py-2 border'>Sala 1</th>
                <th className='px-4 py-2 border'>Sala 2</th>
                <th className='px-4 py-2 border'>Sala 3</th>
              </tr>
            </thead>
            <tbody>
              {['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'].map((time) => (
                <tr key={time}>
                  <td className='px-4 py-2 border h-24' style={{ width: '100px' }}>{time}</td>
                  <td className='px-4 py-2 border' style={{ width: '300px', height: '100px' }}></td>
                  <td className='px-4 py-2 border' style={{ width: '300px', height: '100px' }}></td>
                  <td className='px-4 py-2 border' style={{ width: '300px', height: '100px' }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </React.Fragment>
  )
}
