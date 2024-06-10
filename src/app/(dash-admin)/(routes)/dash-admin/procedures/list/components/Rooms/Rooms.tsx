"use client"
import React, { useState } from 'react'
import { useGetProceduresQuery } from '../Procedures/store/service'
import { useGetProcedureRoomAvailableByIdQuery } from './store/get-find-id/service';
import { useGetRoomProcedureQuery } from './store/get/service';

export default function RoomsProcedure() {
  const { data: dataProcedures, isLoading: loadingProcedures } = useGetProceduresQuery({ limit: 150, page: 0, filter: '' });
  const procedures = dataProcedures?.data?.content;

  const [selectedProcedureId, setSelectedProcedureId] = useState<any>(0);
  const { data: dataInfraRoom, isLoading: loadInfraRoom } = useGetProcedureRoomAvailableByIdQuery(selectedProcedureId);

  const handleProcedureClick = (procedureId: any) => {
    setSelectedProcedureId(procedureId);
  };

  const { data: dataProceduresRoom, isLoading: loadRoomProcedures } = useGetRoomProcedureQuery({ limit: 150, page: 0, filter: '' })

  console.log(dataProceduresRoom)
  return (
    <section className='mt-2 bg-white'>
      <section className='flex flex-col lg:flex-row items-center justify-around h-5/6 w-full p-5'>
        <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-2'>
            <input type="text" className='outline-none border border-gray-200 rounded-md p-2 w-full' placeholder='Buscar...' />
            {loadingProcedures ? (
              <div>Loading...</div>
            ) :
              (
                procedures ? (
                  <React.Fragment>
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
                  </React.Fragment>
                ) : (
                  <div>No hay procedimientos</div>
                )
              )}
          </ul>
        </section>
        <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto mt-4 lg:mt-0'>
          <ul className='p-4 flex flex-col'>
            <input className='outline-none border border-gray-200 rounded-md p-2 w-full' type='text' placeholder='Buscar...' />
            {loadInfraRoom ? (
              <p>Cargando...</p>
            ) : dataInfraRoom ? (
              <div>
                {/* <h2 className='text-xl font-semibold mb-2'>Información de la infraestructura</h2> */}
                {dataInfraRoom?.data.map((infraRoom: any, index: number) => (
                  <div key={index} className=''>
                    <h3 className='border-b border-gray-400 mb-1 py-2'>{infraRoom.sede}</h3>
                    {infraRoom.procedimiento_sala_detalle.map((room: any, i: number) => (
                      <ul key={i} >
                        <li className='flex justify-end gap-2'>
                          <span>Sala: {room.sala_tratamiento}</span>
                          <input type="checkbox" />
                        </li>
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay cuartos</p>
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
