"use client"
import React, { useState, useEffect } from 'react'
import CreateInfraRoomComponent from '../create/create-infra-room.component';
import { useGetRoomsListQuery } from './store/service';
import UpdateInfraRoomsComponent from '../update/update-infra-rooms.component';

interface Props {
  id: number;
  dataInfra: any
}

export default function InfraRoomsComponent({ id, dataInfra }: Props) {

  // Create
  const [showPopup, setShowPopup] = useState(false);

  // 
  //  Update
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  // 
  // const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState('');
  const { data: dataRoom, isLoading, error, refetch } = useGetRoomsListQuery({ limit: 10, page: currentPage - 1, filter })
  const filteredRooms = dataRoom?.data?.content.filter((room: any) => room.sede.id_sede === id);

  // 
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  // 

  const togglePopupId = (id?: number) => {
    if (id) {
      setSelectedRoomId(id)
    }
    setShowPopupUpdate(!showPopupUpdate)
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading patients</div>;

  // Función para manejar el avance de página
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Función para manejar el retroceso de página
  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const totalPages = Math.ceil(filteredRooms.length / 10);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * 10, currentPage * 10);


  // 
  const selectedRoomUpdate = selectedRoomId !== null
        ? paginatedRooms.find((proc: any) => proc.id_sala_tratamiento === selectedRoomId)
        : null;

  // console.log(paginatedRooms)
  // console.log(dataRoom)
  return (
    <React.Fragment>
      <div className="flex justify-between items-center p-4 bg-white mt-4">
        <h1 className="text-2xl font-bold text-gray-700">Cuartos</h1>
        <button
          onClick={togglePopup}
          className="px-4 py-2 bg-[#82b440] text-white rounded shadow hover:bg-[#76a83a] transition-all duration-200"
        >
          Crear cuarto
        </button>
      </div>

      <section className="p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-5">
          {paginatedRooms.map((room: any) => (
            <div
              key={room.id_sala_tratamiento}
              className="border border-gray-300 p-4 rounded-lg shadow-sm flex flex-col justify-between bg-white hover:bg-gray-100 transition-all duration-200"
            >
              <div className='flex justify-between'>
                <h2 className="text-xl font-semibold mb-2">{room.nombres}</h2>
                <span className='text-yellow-400 cursor-pointer' onClick={() => togglePopupId(room.id_sala_tratamiento)}>Editar</span>
              </div>
              <p className="text-gray-600">Piso: {room.piso}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border bg-[#82b440] text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          {/* <span className="text-gray-700">{itemsTotal} items</span> */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
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

      {showPopupUpdate && selectedRoomId &&(
        <UpdateInfraRoomsComponent
          id={selectedRoomUpdate?.id_sala_tratamiento}
          dataUpdate={selectedRoomUpdate}
          onClose={togglePopupId}
          update={refetch}
        />
      )}
    </React.Fragment>
  )
}
