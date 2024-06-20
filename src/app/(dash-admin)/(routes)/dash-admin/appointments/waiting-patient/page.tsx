import React from 'react'

export default function AppointmentWaitingPatient() {
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Pacientes en espera</h1>
      <section className='p-3 bg-white rounded-md mt-3 flex gap-3 items-center'>
        <span>Fecha: </span>
        <input type="date" />
        <select name="" id="">
          <option value="">Los Olivos</option>
          <option value="">San Isidro</option>
        </select>
      </section>
      <section className='flex flex-col-reverse lg:flex-row gap-3 w-full h-full mt-3'>
        {/* <section className='h-5/6 bg-white w-full lg:w-2/12 overflow-x-auto p-1'>
          <table className='w-full border-b border-gray-300 border-collapse'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Medico</th>
                <th className='px-4 py-2 border-x border-gray-300'>Mañana</th>
                <th className='px-4 py-2'>Tarde</th>
              </tr>
            </thead>
            
          </table>
        </section> */}
        <section className='w-full  bg-white h-5/6 overflow-x-auto'>
          {/* TABLA CALENDARIO */}
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
                {/* Horas del calendario */}
                {['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
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
      </section>
    </React.Fragment>
  )
}
