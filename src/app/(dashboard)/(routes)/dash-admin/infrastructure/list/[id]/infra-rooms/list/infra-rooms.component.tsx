"use client"
import React, { useState, useEffect, useMemo } from 'react'
import CreateInfraRoomComponent from '../create/create-infra-room.component';
import UpdateInfraRoomsComponent from '../update/update-infra-rooms.component';
import DeleteInfraRoomsComponent from '../delete/components/delete-infra-rooms.component';


import { useGetRoomsListQuery } from "@/app/(dashboard)/store"


interface Props {
  id: number;
  dataInfra: any
}

export default function InfraRoomsComponent({ id, dataInfra }: Props) {

  // Create
  const [showPopup, setShowPopup] = useState(false);

  //  Update
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  // Delete
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [selectedRoomIdDelete, setSelectedRoomIdDelete] = useState<number | null>(null);

  // TODO: SHOW THE FILTER COMING SOON
  // const [perPage, setPerPage] = useState(10);

  const { data: dataRoom, isLoading, error, refetch } = useGetRoomsListQuery({ limit: 30000, page: 0, filter: '' })
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);

  const itemsPerPage = 8;

  // Filtrar habitaciones según la sede y el estado
  const filteredRooms = useMemo(() => {
    return dataRoom?.data?.content?.filter((room: any) => room.sede.id_sede === id && room.estado) || [];
  }, [dataRoom, id]);

  useEffect(() => {
    // Resetear a la primera página cuando se filtran nuevamente las habitaciones
    setCurrentPage(1);
  }, [filteredRooms]);

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const indexOfLastRoom = currentPage * itemsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const selectedRoomUpdate = selectedRoomId !== null
    ? filteredRooms.find((room: any) => room.id_sala_tratamiento === selectedRoomId)
    : null;

  const selectedRoomDelete = selectedRoomIdDelete !== null
    ? filteredRooms.find((room: any) => room.id_sala_tratamiento === selectedRoomIdDelete)
    : null;

  // Crear
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Eliminar
  const togglewPopUpDelete = (id?: number) => {
    if (id) {
      setSelectedRoomIdDelete(id)
    }
    setShowPopupDelete(!showPopupDelete)
  }

  // Actualizar
  const togglePopupId = (id?: number) => {
    if (id) {
      setSelectedRoomId(id)
    }
    setShowPopupUpdate(!showPopupUpdate)
  }
  // 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading patients</div>;

  return (
    <div className='h-[20rem]'>
      <div className="flex justify-between items-center p-4 bg-white mt-4 ">
        <h1 className="text-2xl font-bold text-gray-700">Cuartos</h1>
        <button
          onClick={togglePopup}
          className="px-4 py-2 bg-[#82b440] text-white rounded shadow hover:bg-[#76a83a] transition-all duration-200"
        >
          Crear cuarto
        </button>
      </div>

      <section className="p-4 bg-white">
        {currentRooms?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-5 h-[15rem]">
            {currentRooms.map((room: any) => (
              <div
                key={room.id_sala_tratamiento}
                className="border border-gray-300 p-4 rounded-lg shadow-sm flex flex-col justify-between bg-white hover:bg-gray-100 transition-all duration-200"
              >
                <div className='flex justify-between'>
                  <h2 className="text-xl font-semibold mb-2">{room.nombres}</h2>
                  <div className='flex gap-3'>
                    <span
                      className='text-red-400 cursor-pointer'
                      onClick={() => togglewPopUpDelete(room.id_sala_tratamiento)}
                    >Eliminar</span>

                    <span className='text-yellow-400 cursor-pointer' onClick={() => togglePopupId(room.id_sala_tratamiento)}>Editar</span>

                  </div>
                </div>
                <p className="text-gray-600">Piso: {room.piso}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[15rem] flex items-center justify-center">
            <p className='text-center text-gray-700'>Cuartos vacíos</p>
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border bg-[#82b440] text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0} // Manejar el caso cuando no hay páginas
            className="px-3 py-1 border bg-[#82b440] text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </section>


      {showPopup && (
        <CreateInfraRoomComponent
          id={id}
          dataInfra={dataInfra}
          onClose={togglePopup}
          update={refetch}
        />
      )}

      {showPopupUpdate && selectedRoomId && (
        <UpdateInfraRoomsComponent
          id={selectedRoomUpdate?.id_sala_tratamiento}
          dataUpdate={selectedRoomUpdate}
          onClose={togglePopupId}
          update={refetch}
        />
      )}
      {showPopupDelete && selectedRoomIdDelete && (
        <DeleteInfraRoomsComponent
          id={selectedRoomDelete?.id_sala_tratamiento}
          onClose={togglewPopUpDelete}
          update={refetch}
        />
      )}
    </div>
  )
}
