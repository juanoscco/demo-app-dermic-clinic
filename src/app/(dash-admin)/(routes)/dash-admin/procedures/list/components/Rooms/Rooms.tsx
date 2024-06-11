"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { useGetProceduresQuery } from '../Procedures/store/service'
import { useGetProcedureRoomAvailableByIdQuery } from './store/get-find-id/service';
import { useGetRoomProcedureQuery } from './store/get/service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddRoomProcedureMutation } from './store/post/service';

export default function RoomsProcedure() {
  const { data: dataProcedures, isLoading: loadingProcedures } = useGetProceduresQuery({ limit: 150, page: 0, filter: '' });
  const procedures = dataProcedures?.data?.content;

  const [selectedProcedureId, setSelectedProcedureId] = useState<any>(0);
  const { data: dataInfraRoom, isLoading: loadInfraRoom } = useGetProcedureRoomAvailableByIdQuery(selectedProcedureId);

  const { data: dataProceduresRoom, isLoading: loadRoomProcedures, refetch: refetchRoomProcedures } = useGetRoomProcedureQuery({ limit: 150, page: 0, filter: '' })

  // POST
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);

  const [addRoomProcedure, { isLoading: loadingRoom, error: errorRoom }] = useAddRoomProcedureMutation();

  const handleProcedureClick = (procedureId: any) => {
    setSelectedProcedureId(procedureId);
  };

  const handleCheckboxChange = (roomId: number) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  const formik = useFormik({
    initialValues: {
      procedimiento: null,
      procedimiento_sala_detalle: [] as number[],
    },
    validationSchema: Yup.object({
      procedimiento: Yup.number().required('Requerido'),
      procedimiento_sala_detalle: Yup.array().min(1, 'Seleccione al menos una sala').required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          procedimiento: { id_procedimiento: values.procedimiento },
          usuario_registro: { id_usuario: 1 },
          empresa: { id_empresa: 1 },
          procedimiento_sala_detalle: values.procedimiento_sala_detalle.map((id_sala_tratamiento) => ({
            sala_tratamiento: { id_sala_tratamiento }
          })),
          estado: true
        };
        await addRoomProcedure(payload).unwrap();
        // Handle success (e.g., show a notification, clear form, etc.)
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
  });
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchRoomProcedures();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetchRoomProcedures]);

  useEffect(() => {
    formik.setFieldValue('procedimiento', selectedProcedureId);
  }, [selectedProcedureId]);

  useEffect(() => {
    formik.setFieldValue('procedimiento_sala_detalle', selectedRooms);
  }, [selectedRooms]);
  const handleRoomProcedures = useCallback(() => {
    if (dataProceduresRoom) {
      // Do something with dataProceduresRoom if needed
      console.log(dataProceduresRoom);
    }
  }, [dataProceduresRoom]);

  useEffect(() => {
    handleRoomProcedures();
  }, [handleRoomProcedures]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <section className='flex flex-col lg:flex-row items-center justify-around h-5/6 w-full p-5'>
        <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-2'>
            <input type="text" className='outline-none border border-gray-200 rounded-md p-2 w-full' placeholder='Buscar...' />
            {loadingProcedures ? (
              <div>Loading...</div>
            ) : (
              procedures ? (
                <React.Fragment>
                  {procedures?.map((procedure: any) => (
                    <li
                      key={procedure.id_procedimiento}
                      className={`flex items-center justify-between mt-1 py-1 px-2 cursor-pointer ${selectedProcedureId === procedure.id_procedimiento ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
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
                {dataInfraRoom?.data.map((infraRoom: any, index: number) => (
                  <div key={index} className=''>
                    <h3 className='border-b border-gray-400 mb-1 py-2'>{infraRoom.sede}</h3>
                    {infraRoom.procedimiento_sala_detalle.map((room: any, i: number) => (
                      <ul key={i}>
                        <li className='flex justify-end gap-2'>
                          <span>Sala: {room.sala_tratamiento}</span>
                          <input
                            type="checkbox"
                            name="procedimiento_sala_detalle"
                            value={room.id_sala_tratamiento}
                            checked={selectedRooms.includes(room.id_sala_tratamiento)}
                            onChange={() => handleCheckboxChange(room.id_sala_tratamiento)}
                          />
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
        <button type="submit" className='px-3 py-1 bg-[#82b440] rounded-md text-white'>
          {loadingRoom ? 'Grabando...' : 'Grabar'}
        </button>
        {errorRoom && <div className="text-red-500">Error al enviar los datos</div>}
      </section>
    </form>

  )
}
