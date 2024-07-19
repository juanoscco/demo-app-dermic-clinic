"use client"
import React, { useState } from 'react';
import InfraUpdateComponent from './infra-update/infra-update.component';
import InfraRoomsComponent from './infra-rooms/list/infra-rooms.component';
import Link from 'next/link';
import { InfraDeleteComponent } from './infra-delete/components';

import { useGetInfrastructureByIdQuery } from "@/app/(dashboard)/store"

interface Props {
  params: {
    id: number
  }
}

export default function DetailsInfraestructure({ params }: Props) {
  // Update
  const [showPopup, setShowPopup] = useState(false);

  // Delete
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { data, error, isLoading, refetch } = useGetInfrastructureByIdQuery(params.id)

  const dataInfrastructure = data?.data;

  // Update
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Delete
  const togglewPopUpDelete = () => {
    setShowDeletePopup(!showDeletePopup);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error en la carga de infraestructura</div>;

  return (
    <div className="p-4 md:p-8">
      <Link
        href={`/dash-admin/infrastructure/list`}
        className='inline-block mb-4 text-blue-500 hover:text-blue-700 transition-all duration-200'
      >
        Atras
      </Link>
      <div className="bg-white p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start md:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{dataInfrastructure.nombres}</h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="mb-2 sm:mb-0">
            <p className="text-gray-600 font-medium">Dirección:</p>
            <p className="text-gray-900">{dataInfrastructure.direccion}</p>
          </div>
          <div className="mb-2 sm:mb-0">
            <p className="text-gray-600 font-medium">Celular:</p>
            <p className="text-gray-900">{dataInfrastructure.telefono}</p>
          </div>
        </div>

        <div className='flex gap-3'>
          <button
            className="text-yellow-500  px-4 py-2 rounded shadow hover:text-yellow-600 transition-all duration-200"
            onClick={togglePopup}
          >
            Editar
          </button>
          <button
            className="text-red-500  px-4 py-2 rounded shadow hover:text-red-600 transition-all duration-200"
            onClick={togglewPopUpDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
      {showPopup &&
        <InfraUpdateComponent
          onClose={togglePopup}
          id={dataInfrastructure.id_sede}
          data={dataInfrastructure}
          update={refetch}
        />
      }
      {showDeletePopup && <InfraDeleteComponent
        onClose={togglewPopUpDelete}
        id={dataInfrastructure.id_sede}
        update={refetch}
      />}

      <InfraRoomsComponent
        id={dataInfrastructure.id_sede}
        dataInfra={dataInfrastructure}
      />
    </div>
  );
}
