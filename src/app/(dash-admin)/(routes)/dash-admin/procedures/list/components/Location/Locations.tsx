"use client"
import React, { useState, useCallback, useEffect } from 'react'
import { useGetInfrastructureQuery } from '../../../../infrastructure/list/store/service'
import { useUpdateLocationProcedureMutation } from './store/put/service';
import { useAddLocationProcedureMutation } from './store/post/service';
import { useGetProcedureLocationAvailableByIdQuery } from './store/get-find-id/service';
import { useGetLocationProcedureQuery } from './store/get/service';

import { Alert } from '@/components/popup/popup-alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function Sedes() {

  // Hooks
  const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
  const [selectedLocationDetails, setSelectedLocationDetails] = useState<any>(null);
  const [selectedProcedures, setSelectedProcedures] = useState<number[]>([]);

  // GET
  const { data: dataInfra, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 100, page: 0, filter: '' });
  const { data: dataProcLocationById, isLoading: loadProcLocationById, refetch: refetchProcLocationById } = useGetProcedureLocationAvailableByIdQuery(selectedLocationId);
  const { data: dataProcLocation, isLoading: loadProcLocation, refetch: refetchProcLocation } = useGetLocationProcedureQuery({ limit: 100, page: 0, filter: '' })
  // 
  // const procedures = dataProcLocationById?.data?.content
  const infrastructure = dataInfra?.data?.content;

  // console.log(infrastructure)
  // POST
  const [addLocationProcedure, { data: addDataLocationProc, isLoading: loadAddLocationProc, error: errorAddProcLocation }] = useAddLocationProcedureMutation();

  // UPDATE
  const [updateLocationProcedure, { data: updateLocationProc, isLoading: loadUpdateLocationProc, error: errorUpdateProcLocation }] = useUpdateLocationProcedureMutation();


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchProcLocationById();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetchProcLocationById]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchInfra();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetchInfra]);

  const formik = useFormik({
    initialValues: {
      sede: selectedLocationDetails?.id_sede || null,
      procedimiento_sede_detalle: selectedLocationDetails?.procedures.map((proc: any) => proc.id_proc) || [],
      estado_eliminado: false
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      sede: Yup.number().required('Requerido'),
      procedimiento_sede_detalle: Yup.array().min(1, 'Seleccione al menos uno').required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          sede: { id_sede: values.sede },
          usuario_registro: { id_usuario: 1 },
          empresa: { id_empresa: 1 },
          procedimiento_sede_detalle: values.procedimiento_sede_detalle.map((id_procedimiento: any) => ({
            procedimiento: { id_procedimiento }
          })),
          estado: true,
          estado_eliminado: values.estado_eliminado
        };

        if (selectedLocationDetails?.id_procedimiento_sede) {
          await updateLocationProcedure({ locationProcedureId: selectedLocationDetails.id_procedimiento_sede, locationProcedureData: payload }).unwrap();
          refetchProcLocation();
        } else {
          await addLocationProcedure(payload).unwrap();
          refetchProcLocation();
        }
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
  });

  // Formatt data
  const [formattedData, setFormattedData] = useState<any[]>([]);

  const processData = useCallback(() => {
    const formattedData: any[] = [];
    const allMatchingProcedures: number[][] = [];

    infrastructure?.forEach((infra: any) => {
      const match = dataProcLocation?.data?.content.find((data: any) => (
        data.sede.id_sede === infra.id_sede
      ));

      const infraData: any = {
        id_sede: infra.id_sede,
        sede: infra.nombres,
        id_procedimiento_sede: match ? match.id_procedimiento_sede : null,
        data_procedures: []
      };
      const matchingProcedures: number[] = [];

      dataProcLocationById?.data?.forEach((proc: any) => {
        const procMatch = match && match.procedimiento_sede_detalle.some((detail: any) => (
          detail.procedimiento.id_procedimiento === proc.id_procedimiento
        ));

        if (procMatch) {
          infraData.data_procedures.push({
            proc: proc.nombres,
            id_proc: proc.id_procedimiento,
            // proc_state: proc.estado,
            checked: true
          });
          matchingProcedures.push(proc.id_procedimiento);
        } else {
          infraData.data_procedures.push({
            proc: proc.nombres,
            id_proc: proc.id_procedimiento,
            // proc_state: proc.estado,
            checked: false
          });
        }
      });

      if (match) {
        allMatchingProcedures.push(matchingProcedures);
      }

      formattedData.push(infraData);
    });

    console.log("Formatted Data:", formattedData);

    setFormattedData(formattedData);
  }, [infrastructure, dataProcLocation, dataProcLocationById]);

  useEffect(() => {
    if (infrastructure && dataProcLocation && dataProcLocationById) {
      processData();
    }
  }, [infrastructure, dataProcLocation, dataProcLocationById, processData]);


  const handleInfrastructureClick = (sedeId: number) => {
    const selectedInfra = formattedData.find(infra => infra.id_sede === sedeId);

    if (selectedInfra) {
      let selectedProcedureData: any;

      if (selectedInfra.id_procedimiento_sede) {
        selectedProcedureData = {
          id_sede: selectedInfra.id_sede,
          sede: selectedInfra.sede,
          id_procedimiento_sede: selectedInfra.id_procedimiento_sede,
          procedures: []
        };

        selectedInfra.data_procedures.forEach((proc: any) => {
          if (proc.checked) {
            selectedProcedureData.procedures.push({
              proc: proc.proc,
              id_proc: proc.id_proc
            });
          }
        });
      } else {
        selectedProcedureData = {
          id_sede: null,
          sede: null,
          id_procedimiento_sede: null,
          procedures: []
        };
      }

      setSelectedLocationDetails(selectedProcedureData);
    } else {
      const nullProcedureData = {
        id_sede: null,
        sede: null,
        id_procedimiento_sede: null,
        procedures: []
      };
      setSelectedLocationDetails(nullProcedureData);
    }

    setSelectedLocationId(sedeId);
  };


  useEffect(() => {
    formik.setFieldValue('sede', selectedLocationId)
  }, [selectedLocationId]);

  useEffect(() => {
    formik.setFieldValue('procedimiento_sede_detalle', selectedProcedures)
  }, [selectedProcedures]);

  const [operationSuccess, setOperationSuccess] = useState(false); // Estado para controlar la operación exitosa

  useEffect(() => {
    if (operationSuccess) {
      handleInfrastructureClick(selectedLocationId);
      setOperationSuccess(false); // Restablecer el estado de éxito
    }
  }, [operationSuccess, selectedLocationId]);
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <section className='mt-2 bg-white'>
        <section className='flex flex-col lg:flex-row items-center justify-around h-5/6 w-full p-5'>
          <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto'>
            <ul className='p-4'>
              <input className='outline-none border border-gray-200 rounded-md p-2 w-full' type='text' placeholder='Buscar...' />
              {loadingInfra ? (
                <div>Cargando...</div>
              ) : (
                infrastructure?.filter((infra: any) => infra.estado)
                  .map((infra: any) => (
                    <li
                      key={infra.id_sede}
                      // className='px-2 py-1 mt-1 border-b hover:bg-gray-200 cursor-pointer border-gray-200'
                      className={`flex items-center justify-between mt-1 py-1 px-2 cursor-pointer ${selectedLocationId === infra.id_sede ? 'bg-gray-200' : 'hover:bg-gray-200'}`}

                      onClick={() => handleInfrastructureClick(infra.id_sede)}
                    >{infra.nombres}</li>
                  ))
              )}
            </ul>
          </section>
          <section className='w-full lg:w-2/6 max-h-full h-[35rem] border border-gray-300 overflow-x-auto mt-4 lg:mt-0'>
            <ul className='p-2'>
              <input type="text" className='outline-none border border-gray-200 rounded-md p-2 w-full' placeholder='Buscar...' />
              {/* {selectedLocationId} */}
              {selectedLocationId === 0 ? (
                <div className='flex items-center justify-center '>Seleccione una sede</div>
              ) : (
                formattedData?.map((sede: any, i: number) => (
                  <ul key={i} className='flex flex-col gap-2 mt-1'>
                    {sede.id_sede === selectedLocationId && (
                      sede.data_procedures.map((item: any, i: number) => (
                        <li key={i} className='flex justify-between border-b border-gray-200'>
                          <span>{item.proc}</span>
                          <input
                            type="checkbox"
                            name='procedimiento_sede_detalle'
                            value={item.id_proc}
                            checked={formik.values.procedimiento_sede_detalle.includes(item.id_proc)}
                            onChange={() => {
                              if (formik.values.procedimiento_sede_detalle.includes(item.id_proc)) {
                                formik.setFieldValue(
                                  'procedimiento_sede_detalle',
                                  formik.values.procedimiento_sede_detalle.filter((id: number) => id !== item.id_proc)
                                )
                              } else {
                                formik.setFieldValue(
                                  'procedimiento_sede_detalle',
                                  [...formik.values.procedimiento_sede_detalle, item.id_proc]
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
          {/* {selectedLocationDetails?.id_procedimiento_sede ? (
            <button type='submit' className='px-3 py-1 bg-[#82b440] rounded-md text-white'>{loadUpdateLocationProc ? 'Actualizando....' : 'Actualizar'}</button>
          ) : (
            <button type='submit' className='px-3 py-1 bg-[#82b440] rounded-md text-white'>{loadAddLocationProc ? 'Grabando...' : 'Grabar'}</button>
          )} */}
          {selectedLocationDetails?.id_procedimiento_sede ? (
            <button type="submit" className="px-3 py-1 bg-[#82b440] rounded-md text-white">
              {formik.isSubmitting ? 'Actualizando....' : 'Actualizar'}
            </button>
          ) : (
            <button type="submit" className="px-3 py-1 bg-[#82b440] rounded-md text-white">
              {formik.isSubmitting ? 'Grabando...' : 'Grabar'}
            </button>
          )}
          {operationSuccess && (<Alert type='success'>Grabado correctamente!!</Alert>)}
          {operationSuccess && (<Alert type='success'>Actualizado correctamente</Alert>)}
          {errorAddProcLocation && <Alert type='error'>Error en Grabar</Alert>}
          {errorUpdateProcLocation && <Alert type='error'>Error en actualizar</Alert>}
        </section>
      </section>
    </form>

  )
}
