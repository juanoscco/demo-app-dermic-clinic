import React from 'react'

export default function AppointmentReports() {
  return (
    <React.Fragment>
      <h1 className='text-2xl mb-2'>Reporte de citas</h1>
      <section className="bg-white p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <span>De</span>
            <input type="date" className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-2">
            <span>Hasta</span>
            <input type="date" className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-2">
            <span>Sede:</span>
            <select className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Los Olivos</option>
              <option value="">San Isidro</option>
            </select>
          </div>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          Filtrar
        </button>
      </section>

      <section className="flex flex-col md:flex-row mt-4 p-3 gap-3 bg-white items-center justify-end">
        <button className="bg-green-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          Excel
        </button>
        <button className="bg-blue-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          Imprimir
        </button>
      </section>

      <section className='bg-white mt-3 p-2 rounded-md w-full xl:h-[35rem] h-full overflow-x-auto'>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">


              <th className="px-4 py-2 text-left">Paciente</th>
              {/* <th className="px-4 py-2 text-left">DNI</th> */}
              <th className="px-4 py-2 text-left">Sala</th>

              <th className="px-4 py-2 text-left">Hora</th>
              {/* <th className="px-4 py-2 text-left">Teléfono</th> */}
              {/* <th className="px-4 py-2 text-left">Correo</th> */}
              {/* <th className="px-4 py-2 text-left">Procedimiento</th> */}

              <th className="px-4 py-2 text-left">Llegada</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Salida</th>

              {/* <th className="px-4 py-2 text-left">A/N</th> */}
              {/* <th className="px-4 py-2 text-left">MD</th> */}
              {/* <th className="px-4 py-2 text-left">Notas</th> */}
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>

            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    </React.Fragment>
  )
}
