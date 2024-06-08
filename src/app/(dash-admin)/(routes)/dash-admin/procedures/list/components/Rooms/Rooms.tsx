"use client"
import React, { useState } from 'react'
import { useGetProceduresQuery } from '../Procedures/store/service'
import { useGetProcedureRoomAvailableByIdQuery } from './store/get-find-id/service';

export default function Rooms() {
  const { data: dataProcedures, isLoading: loadingProcedures } = useGetProceduresQuery({ limit: 10000, page: 0, filter: '' });
  const procedures = dataProcedures?.data?.content;

  const [selectedProcedureId, setSelectedProcedureId] = useState<any>(null);
  const { data: dataProcedure, isLoading: loadProcedure } = useGetProcedureRoomAvailableByIdQuery(selectedProcedureId);

  const handleProcedureClick = (procedureId: any) => {
    setSelectedProcedureId(procedureId);
  };
  // console.log(dataProcedure)
  return (
    <section className='mt-2 bg-white'>
      <section className='flex flex-col lg:flex-row items-center justify-around h-5/6 w-full p-5'>
        <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-2'>
            <input type="text" className='outline-none border border-gray-200 rounded-md p-2 w-full' placeholder='Buscar...' />
            {procedures?.map((procedure: any) => (
              <li
                key={procedure.id_procedimiento}
                className={`flex items-center justify-between mt-1 py-1 px-2 cursor-pointer ${selectedProcedureId === procedure.id_procedimiento ? 'bg-gray-200' : 'hover:bg-gray-200'
                  }`}
                onClick={() => handleProcedureClick(procedure.id_procedimiento)}

              >
                {procedure.nombres}
              </li>
            ))}
          </ul>
        </section>
        <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto mt-4 lg:mt-0'>
          <ul className='p-4 flex flex-col'>
            <input className='outline-none border border-gray-200 rounded-md p-2 w-full' type='text' placeholder='Buscar...' />
            {loadProcedure ? (
              <p>Cargando...</p>
            ) : dataProcedure ? (
              <div>
                <h2 className='text-xl font-semibold mb-2'>Información del Procedimiento</h2>
                {dataProcedure?.data.map((detail: any, index: number) => (
                  <div key={index}>
                    {/* <p><strong>Nombres:</strong> {detail.nombres}</p> */}
                    <p>{detail.sede}</p>
                    {detail.procedimiento_sala_detalle.map((proc: any, i: number) => (
                      <ul key={i} >
                        <li className='flex justify-between gap-2'>
                          <span>Sala: {proc.sala_tratamiento}</span>
                          <input type="checkbox" />
                        </li>
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p>Seleccione un procedimiento para ver los detalles</p>
            )}
          </ul>
        </section>
      </section>
      <section className='w-[90%] flex justify-end pb-3'>
        <button className='px-3 py-1 bg-[#82b440] rounded-md text-white'>Grabar</button>
      </section>
    </section>

  )
}
