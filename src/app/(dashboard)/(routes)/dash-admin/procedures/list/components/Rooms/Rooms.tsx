"use client"
import React, { useState, useEffect, useCallback } from 'react'

import {
  useUpdateRoomProcedureMutation,
  useAddRoomProcedureMutation,
  useGetRoomProcedureQuery,
  useGetProcedureRoomAvailableByIdQuery,
  useGetProceduresQuery
} from "@/app/(dashboard)/store"


import { Alert } from '@/components/popup/popup-alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function RoomsProcedure() {
  const { data: dataProcedures, isLoading: loadingProcedures, refetch: refetchProcedures } = useGetProceduresQuery({ limit: 150, page: 0, filter: '' });
  const procedures = dataProcedures?.data?.content;

  // POST    
  const [addRoomProcedure, { isLoading: loadingRoom, error: errorRoom }] = useAddRoomProcedureMutation();
  const { data: dataProceduresRoom, isLoading: loadProceduresRoom, refetch: refetchRoomProcedures } = useGetRoomProcedureQuery({ limit: 500, page: 0, filter: '' });
  // FORMATEO DE DATOS
  const [formattedData, setFormattedData] = useState<any[]>([]);

  const [selectedProcedureId, setSelectedProcedureId] = useState<number>(0);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [matchingRooms, setMatchingRooms] = useState<number[]>([]);
  const [selectedProcedureDetails, setSelectedProcedureDetails] = useState<any>(null);

  // CUARTOS CON PROCEDIMIENTO
  const { data: dataInfraRoom, isLoading: loadInfraRoom, refetch: refetchInfraRoom } = useGetProcedureRoomAvailableByIdQuery(selectedProcedureId);

  // Actualizar
  const [updateRoomProcedure, { isLoading: loadUpdateRoomProcedure }] = useUpdateRoomProcedureMutation();

  useEffect(() => {
    if (!loadProceduresRoom) {
      refetchRoomProcedures();
    }
  }, [refetchRoomProcedures, loadProceduresRoom]);


  useEffect(() => {
    if (!loadInfraRoom && !loadingProcedures) {
      refetchInfraRoom(); refetchProcedures();
    }
  }, [loadInfraRoom, refetchInfraRoom, refetchProcedures, loadingProcedures])

  const formik = useFormik({
    initialValues: {
      procedimiento: selectedProcedureDetails?.id_procedimiento || null,
      procedimiento_sala_detalle: selectedProcedureDetails?.rooms.map((room: any) => room.idSala) || [],
      estado_eliminado: false
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      procedimiento: Yup.number().required('Requerido'),
      procedimiento_sala_detalle: Yup.array().min(1, 'Seleccione al menos una sala').required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          // id_procedimiento_sala: selectedProcedureDetails?.id_procedimiento_sala || null,
          procedimiento: { id_procedimiento: values.procedimiento },
          usuario_registro: { id_usuario: 1 },
          empresa: { id_empresa: 1 },
          procedimiento_sala_detalle: values.procedimiento_sala_detalle.map((id_sala_tratamiento: any) => ({
            sala_tratamiento: { id_sala_tratamiento }
          })),
          estado: true,
          estado_eliminado: values.estado_eliminado
        };

        if (selectedProcedureDetails?.id_procedimiento_sala) {
          await updateRoomProcedure({ roomProcedureId: selectedProcedureDetails.id_procedimiento_sala, roomProcedureData: payload }).unwrap();
          refetchRoomProcedures();
          // refetchInfraRoom();

        } else {
          await addRoomProcedure(payload).unwrap();
          refetchRoomProcedures();
          // refetchInfraRoom();

        }

      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue('procedimiento', selectedProcedureId);
  }, [selectedProcedureId]);

  useEffect(() => {
    formik.setFieldValue('procedimiento_sala_detalle', selectedRooms);
  }, [selectedRooms]);


  const processData = useCallback(() => {
    const formattedData: any[] = [];
    const allMatchingRooms: number[][] = []; // Usaremos una matriz para almacenar los números de sala coincidentes

    procedures?.forEach((procedure: any) => {
      const match = dataProceduresRoom?.data?.content.find((data: any) =>
        data.procedimiento.id_procedimiento === procedure.id_procedimiento
      );

      const procedureData: any = {
        id_procedimiento: procedure.id_procedimiento,
        procedimiento: procedure.nombres,
        id_procedimiento_sala: match ? match.id_procedimiento_sala : null, // Asignar null si no hay match
        data_sede: {}
      };

      // Para almacenar los cuartos coincidentes específicos del procedimiento
      const matchingRooms: number[] = [];

      dataInfraRoom?.data?.forEach((infraRoom: any) => {
        const sede = infraRoom.sede;

        if (!procedureData.data_sede[sede]) {
          procedureData.data_sede[sede] = [];
        }

        infraRoom.procedimiento_sala_detalle.forEach((room: any) => {
          const roomMatch = match && match.procedimiento_sala_detalle.some((detail: any) =>
            detail.sala_tratamiento.id_sala_tratamiento === Number(room.id_sala_tratamiento)
          );

          if (roomMatch) {
            procedureData.data_sede[sede].push({
              sala: room.sala_tratamiento,
              idSala: room.id_sala_tratamiento,
              checked: true // Marcar como checked si hay coincidencia
            });

            matchingRooms.push(room.id_sala_tratamiento);
          } else {
            procedureData.data_sede[sede].push({
              sala: room.sala_tratamiento,
              idSala: room.id_sala_tratamiento,
              checked: false // Marcar como no checked si no hay coincidencia
            });
          }
        });
      });

      if (match) {
        // console.log(`ID procedimiento encontrado aquí: ${procedure.id_procedimiento}`);
        // console.log(`Cuartos coincidentes para el ID procedimiento ${procedure.id_procedimiento}:`, matchingRooms);
        allMatchingRooms.push(matchingRooms);
      }

      formattedData.push(procedureData);
    });

    // console.log("Formatted Data:", formattedData);
    // console.log("All Matching Rooms:");
    // console.log(allMatchingRooms); 

    setFormattedData(formattedData);
    setMatchingRooms(allMatchingRooms.flat());
  }, [procedures, dataInfraRoom, dataProceduresRoom]);


  useEffect(() => {
    if (procedures && dataInfraRoom && dataProceduresRoom) {
      processData();
    }
  }, [procedures, dataInfraRoom, dataProceduresRoom, processData]);


  const handleProcedureClick = (procedureId: number) => {
    const selectedProcedure = formattedData.find(procedure => procedure.id_procedimiento === procedureId);

    if (selectedProcedure) {
      let selectedProcedureData: any;

      if (selectedProcedure.id_procedimiento_sala) {
        selectedProcedureData = {
          id_procedimiento: selectedProcedure.id_procedimiento,
          procedimiento: selectedProcedure.procedimiento,
          id_procedimiento_sala: selectedProcedure.id_procedimiento_sala,
          rooms: []
        };

        Object.keys(selectedProcedure.data_sede).forEach((sede: string) => {
          selectedProcedure.data_sede[sede].forEach((room: any) => {
            if (room.checked) {
              selectedProcedureData.rooms.push({
                sala: room.sala,
                idSala: room.idSala
              });
            }
          });
        });
      } else {
        selectedProcedureData = {
          id_procedimiento: null,
          procedimiento: null,
          id_procedimiento_sala: null,
          rooms: []
        };
      }

      // console.log("Selected Procedure Details:", selectedProcedureData);
      setSelectedProcedureDetails(selectedProcedureData);
    } else {
      const nullProcedureData = {
        id_procedimiento: null,
        procedimiento: null,
        id_procedimiento_sala: null,
        rooms: []
      };
      // console.log("Selected Procedure Details:", nullProcedureData);
      setSelectedProcedureDetails(nullProcedureData);
    }

    setSelectedProcedureId(procedureId);
  };


  const [operationSuccess, setOperationSuccess] = useState(false); // Estado para controlar la operación exitosa

  useEffect(() => {
    if (operationSuccess) {
      handleProcedureClick(selectedProcedureId);
      setOperationSuccess(false); // Restablecer el estado de éxito
    }
  }, [operationSuccess, selectedProcedureId]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <section className='flex flex-col lg:flex-row items-center justify-around h-5/6 w-full p-5'>
        <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
          <ul className='p-2'>
            {/* <input
              type="text"
              className='outline-none border border-gray-200 rounded-md p-2 w-full'
              placeholder='Buscar...'
            /> */}
            {loadingProcedures ? (
              <div>Loading...</div>
            ) : (
              procedures ? (
                <React.Fragment>
                  {formattedData.map((procedure: any) => (
                    <li
                      key={procedure.id_procedimiento}
                      className={`flex items-center justify-between mt-1 py-1 px-2 cursor-pointer ${selectedProcedureId === procedure.id_procedimiento ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                      onClick={() => handleProcedureClick(procedure.id_procedimiento)}
                    >
                      {/* {procedure.id_procedimiento}  */}
                      {procedure.procedimiento}
                      {/* {procedure?.id_procedimiento_sala} */}
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
            {/* <input className='outline-none border border-gray-200 rounded-md p-2 w-full' type='text' placeholder='Buscar...' /> */}
            {/* {selectedProcedureId} */}
            {selectedProcedureId === 0 ? (
              <div className='flex items-center justify-center '>Seleccione un procedimiento</div>
            ) : (
              loadInfraRoom && loadProceduresRoom ? (
                <div>loading....</div>
              ) : (
                formattedData?.map((procedure: any, index: number) => (
                  <React.Fragment key={index}>
                    {procedure.id_procedimiento === selectedProcedureId && (
                      <div>
                        {Object.keys(procedure.data_sede).map((sede: string, i: number) => (
                          <React.Fragment key={i}>
                            <h3 className='border-b border-gray-400 mb-1 py-2'>{sede}</h3>
                            <ul>
                              {procedure.data_sede[sede].map((room: any, j: number) => (
                                <li key={j} className='flex justify-end gap-2'>
                                  <span>Sala: {room.sala}</span>
                                  <input
                                    type="checkbox"
                                    name="procedimiento_sala_detalle"
                                    value={room.idSala}
                                    checked={formik.values.procedimiento_sala_detalle.includes(room.idSala)}
                                    onChange={() => {
                                      if (formik.values.procedimiento_sala_detalle.includes(room.idSala)) {
                                        formik.setFieldValue(
                                          'procedimiento_sala_detalle',
                                          formik.values.procedimiento_sala_detalle.filter((id: number) => id !== room.idSala)
                                        );
                                      } else {
                                        formik.setFieldValue(
                                          'procedimiento_sala_detalle',
                                          [...formik.values.procedimiento_sala_detalle, room.idSala]
                                        );
                                      }
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))
              )
            )
              // (
              //   formattedData?.map((procedure: any, index: number) => (
              //     <React.Fragment key={index}>
              //         {procedure.id_procedimiento === selectedProcedureId && (
              //           <div>
              //             {Object.keys(procedure.data_sede).map((sede: string, i: number) => (
              //               <React.Fragment key={i}>
              //                 <h3 className='border-b border-gray-400 mb-1 py-2'>{sede}</h3>
              //                 <ul>
              //                   {procedure.data_sede[sede].map((room: any, j: number) => (
              //                     <li key={j} className='flex justify-end gap-2'>
              //                       <span>Sala: {room.sala}</span>
              //                       <input
              //                         type="checkbox"
              //                         name="procedimiento_sala_detalle"
              //                         value={room.idSala}
              //                         checked={formik.values.procedimiento_sala_detalle.includes(room.idSala)}
              //                         onChange={() => {
              //                           if (formik.values.procedimiento_sala_detalle.includes(room.idSala)) {
              //                             formik.setFieldValue(
              //                               'procedimiento_sala_detalle',
              //                               formik.values.procedimiento_sala_detalle.filter((id: number) => id !== room.idSala)
              //                             );
              //                           } else {
              //                             formik.setFieldValue(
              //                               'procedimiento_sala_detalle',
              //                               [...formik.values.procedimiento_sala_detalle, room.idSala]
              //                             );
              //                           }
              //                         }}
              //                       />
              //                     </li>
              //                   ))}
              //                 </ul>
              //               </React.Fragment>
              //             ))}
              //           </div>
              //         )}
              //       </React.Fragment>
              //   ))
              // )
            }
          </ul>
        </section>
      </section>
      <section className='w-[90%] flex justify-end pb-3'>
        {/* {selectedProcedureDetails?.id_procedimiento_sala ? (
          <button type="submit" className='px-3 py-1 bg-[#82b440] rounded-md text-white'>
            {loadUpdateRoomProcedure ? 'Actualizando....' : 'Actualizar'}

          </button>
        ) : (
          <button type="submit" className='px-3 py-1 bg-[#82b440] rounded-md text-white'>
            {loadingRoom ? 'Grabando...' : 'Grabar'}

          </button>
        )} */}
        <button type="submit" className='px-3 py-1 bg-[#82b440] rounded-md text-white'>
          {
            selectedProcedureDetails?.id_procedimiento_sala ? (
              loadUpdateRoomProcedure ? 'Actualizando....' : 'Actualizar'
            ) : (
              loadingRoom ? 'Grabando...' : 'Grabar'
            )
          }
          
        </button>
        {/* {formik.isSubmitting ? 'Actualizando....' : 'Actualizar'} */}
        {/* {formik.isSubmitting ? 'Grabando...' : 'Grabar'} */}

        {/* {dataUpdateRoomProcedure && (<Alert type='success'>Actualizado Satisfactoriamente!!</Alert>)}
        {dataRoomProcedure && (<Alert type='success'>Creacion Satisfactoriamente</Alert>)} */}
        {operationSuccess && (<Alert type='success'>Actualizado Satisfactoriamente!!</Alert>)}
        {operationSuccess && (<Alert type='success'>Creacion Satisfactoriamente</Alert>)}
        {errorRoom && <Alert type='error'>Error al enviar los datos</Alert>}
      </section>
    </form>
  )
}
