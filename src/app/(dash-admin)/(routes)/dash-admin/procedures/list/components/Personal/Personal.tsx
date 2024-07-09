"use client";
import { useGetFindHeadBoardQuery } from '@/config/search-headboard/service';
import React, { useCallback, useState, useEffect } from 'react';

import { Alert } from '@/components/popup/popup-alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetHeadBoardProcedureAvailableByIdQuery } from './store/find-by-id/service';
import { useGetPersonalProcedureQuery } from './store/get/service';
import { useAddPersonalProcedureMutation } from './store/post/service/post-personal.services';
import { useUpdatePersonalProcedureMutation } from './store/put/service';

export default function Personal() {

  // Hooks
  const [selectedHeadBoardId, setSelectedHeadBoardId] = useState<number>(0);
  const [selectedHeadBoardDetails, setSelectedHeadBoardDetails] = useState<any>(null);
  const [selectedProcedures, setSelectedProcedures] = useState<number[]>([]);
  const [formattedData, setFormattedData] = useState<any[]>([]);

  // GET
  const { data: getHeadBoard, isLoading: loadHeadBoard } = useGetFindHeadBoardQuery(3)
  const { data: dataHeadBoardTitleFindById, refetch: refefetchDataHeadBoardById } = useGetHeadBoardProcedureAvailableByIdQuery(selectedHeadBoardId)
  const { data: dataHeadBoardProcedure, refetch: refetchDataHeadBoard } = useGetPersonalProcedureQuery({ limit: 300, page: 0, filter: '' })

  const headBoard = getHeadBoard?.cabecera?.cabeceras_detalles
  // console.log(dataHeadBoardProcedure)

  // POST
  const [addHeadboardTitle, { data: addHeadboard, isLoading: addLoadHeadboard }] = useAddPersonalProcedureMutation();

  // UPDATE
  const [updateHeadboardTitle, { data: updateHeadboard, isLoading: updateLoadHeadboard }] = useUpdatePersonalProcedureMutation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refefetchDataHeadBoardById();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refefetchDataHeadBoardById]);

  const formik = useFormik({
    initialValues: {
      id_cabecera_detalle: selectedHeadBoardDetails?.id_cabecera_detalle || null,
      descripcion: selectedHeadBoardDetails?.descripcion || '',
      procedimiento_personales_detalle: selectedHeadBoardDetails?.procedures?.map((proc: any) => proc.id_proc) || [],
      estado_eliminado:false
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      // id_cabecera_detalle: Yup.number().required('Requerido'),
      procedimiento_personales_detalle: Yup.array().min(1, 'Seleccione al menos uno').required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          titulo: {
            id_cabecera_detalle: values.id_cabecera_detalle,
            descripcion: values.descripcion
          },
          usuario_registro: { id_usuario: 1 },
          empresa: { id_empresa: 1 },
          procedimiento_personales_detalle: values.procedimiento_personales_detalle.map((id_procedimiento: any) => ({
            procedimiento: { id_procedimiento }
          })),
          estado: true,
          estado_eliminado: values.estado_eliminado
        };

        if (selectedHeadBoardDetails?.id_procedimiento_personal) {
          // console.log('Updating Headboard Title with payload:', payload);
          await updateHeadboardTitle({
            personalProcedureId: selectedHeadBoardDetails.id_procedimiento_personal,
            personalProcedureData: payload
          }).unwrap();
          refetchDataHeadBoard();
        } else {
          // console.log('Adding Headboard Title with payload:', payload);
          await addHeadboardTitle(payload).unwrap();
          refetchDataHeadBoard();
        }
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
  });


  // Format data
  const proccessData = useCallback(() => {
    const formattedData: any[] = [];
    const allMatchingProcedures: number[][] = [];

    headBoard?.forEach((board: any) => {
      const match = dataHeadBoardProcedure?.data?.content.find((data: any) => (
        data.titulo.id_cabecera_detalle === board.id_cabecera_detalle
      ));

      const headboardData: any = {
        id_cabecera_detalle: board.id_cabecera_detalle,
        descripcion: board.descripcion,
        id_procedimiento_personal: match ? match.id_procedimiento_personal : null,
        data_procedures: []
      };
      const matchingProcedures: number[] = [];

      dataHeadBoardTitleFindById?.data?.forEach((proc: any) => {
        const procMatch = match && match.procedimiento_personales_detalle.some((detail: any) => (
          detail.procedimiento.id_procedimiento === proc.id_procedimiento
        ));
        if (procMatch) {
          headboardData.data_procedures.push({
            proc: proc.nombres,
            id_proc: proc.id_procedimiento,
            checked: true
          });
          matchingProcedures.push(proc.id_procedimiento);
        } else {
          headboardData.data_procedures.push({
            proc: proc.nombres,
            id_proc: proc.id_procedimiento,
            checked: false
          });
        };
      });
      if (match) {
        allMatchingProcedures.push(matchingProcedures);
      }
      formattedData.push(headboardData);
    });
    // console.log("Formatted Data:", formattedData);

    setFormattedData(formattedData);
  }, [headBoard, dataHeadBoardProcedure, dataHeadBoardTitleFindById])

  useEffect(() => {
    if (headBoard && dataHeadBoardProcedure && dataHeadBoardTitleFindById) {
      proccessData();
    }
  }, [headBoard, dataHeadBoardProcedure, dataHeadBoardTitleFindById, proccessData])

  const handleHeadboardPersonalClick = (titleId: number) => {
    const selectedHeadboard = formattedData.find(headboard => headboard.id_cabecera_detalle === titleId);

    if (selectedHeadboard) {
      let selectedProcedureData: any;

      if (selectedHeadboard.id_procedimiento_personal) {
        selectedProcedureData = {
          id_cabecera_detalle: selectedHeadboard.id_cabecera_detalle,
          descripcion: selectedHeadboard.descripcion,
          id_procedimiento_personal: selectedHeadboard.id_procedimiento_personal,
          procedures: []
        };

        selectedHeadboard.data_procedures.forEach((proc: any) => {
          if (proc.checked) {
            selectedProcedureData.procedures.push({
              proc: proc.proc,
              id_proc: proc.id_proc
            });
          }
        });
      } else {
        selectedProcedureData = {
          id_cabecera_detalle: null,
          descripcion: null,
          id_procedimiento_personal: null,
          procedures: []
        };
      }

      // console.log("Selected Headboard Details:", selectedProcedureData);
      setSelectedHeadBoardDetails(selectedProcedureData);
    } else {
      const nullProcedureData = {
        id_cabecera_detalle: null,
        descripcion: null,
        id_procedimiento_personal: null,
        procedures: []
      };
      // console.log("Selected Headboard Details:", nullProcedureData);
      setSelectedHeadBoardDetails(nullProcedureData);
    }

    setSelectedHeadBoardId(titleId);
  };

  useEffect(() => {
    formik.setFieldValue('id_cabecera_detalle', selectedHeadBoardId);
  }, [selectedHeadBoardId]);

  useEffect(() => {
    formik.setFieldValue('procedimiento_personales_detalle', selectedProcedures);
  }, [selectedProcedures]);

  const [operationSuccess, setOperationSuccess] = useState(false); // Estado para controlar la operación exitosa

  useEffect(() => {
    if (operationSuccess) {
      handleHeadboardPersonalClick(selectedHeadBoardId);
      setOperationSuccess(false); // Restablecer el estado de éxito
    }
  }, [operationSuccess, selectedHeadBoardId]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <section className='mt-2 bg-white'>
        <section className='flex flex-col lg:flex-row items-center justify-around h-5/6 w-full p-5'>
          <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
            <ul className='p-4'>
              {/* <input className='outline-none border border-gray-200 rounded-md p-2 w-full' type='text' placeholder='Buscar...' /> */}
              {loadHeadBoard ? (
                <div>Cargando....</div>
              ) :
                (
                  headBoard?.map((board: any) => (
                    <li
                      key={board.id_cabecera_detalle}
                      className={`flex items-center justify-between mt-1 py-1 px-2 cursor-pointer ${selectedHeadBoardId === board.id_cabecera_detalle ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                      onClick={() => handleHeadboardPersonalClick(board.id_cabecera_detalle)}
                    >
                      {board.descripcion}
                    </li>
                  ))
                )}
            </ul>
          </section>
          <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto mt-4 lg:mt-0'>
            <ul className='p-2'>
              <input type="text" className='outline-none border border-gray-200 rounded-md p-2 w-full' placeholder='Buscar...' />
              {/* {selectedHeadBoardId} */}
              {selectedHeadBoardId === 0 ? (
                <div className='flex items-center justify-center '>Seleccione una opción</div>
              ) : (
                formattedData?.map((itemboard: any, i: number) => (
                  <ul key={i} className='flex flex-col gap-2 mt-1'>
                    {itemboard.id_cabecera_detalle === selectedHeadBoardId && (
                      itemboard.data_procedures.map((item: any, i: number) => (
                        <li key={i} className='flex justify-between border-b border-gray-200'>
                          <span>{item.proc}</span>
                          <input
                            type="checkbox"
                            name='procedimiento_personales_detalle'
                            value={item.id_proc}
                            checked={formik.values.procedimiento_personales_detalle.includes(item.id_proc)}
                            onChange={() => {
                              if (formik.values.procedimiento_personales_detalle.includes(item.id_proc)) {
                                formik.setFieldValue(
                                  'procedimiento_personales_detalle',
                                  formik.values.procedimiento_personales_detalle.filter((id: number) => id !== item.id_proc)
                                )
                              } else {
                                formik.setFieldValue(
                                  'procedimiento_personales_detalle',
                                  [...formik.values.procedimiento_personales_detalle, item.id_proc]
                                )
                              }
                            }}
                          />
                        </li>
                      ))
                    )}
                  </ul>
                ))
              )}
            </ul>
          </section>
        </section>
        <section className='w-[90%] flex justify-end pb-3'>
          {selectedHeadBoardDetails?.id_procedimiento_personal ? (
            <button type='submit' className='px-3 py-1 bg-[#82b440] rounded-md text-white'>
              {formik.isSubmitting ? 'Actualizando....' : 'Actualizar'}
            </button>
          ) : (
            <button type='submit' className='px-3 py-1 bg-[#82b440] rounded-md text-white'>
              {formik.isSubmitting ? 'Grabando...' : 'Grabar'}
            </button>
          )}
          {operationSuccess && (<Alert type='success'>Grabado correctamente!!</Alert>)}
          {operationSuccess && (<Alert type='success'>Actualizado correctamente</Alert>)}
        </section>
      </section>
    </form>

  )
}
