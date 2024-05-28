"use client"
import React, { useState } from 'react';
import { useGetInfrastructureByIdQuery } from "./store/service";

import Link from 'next/link';
import InfraUpdateComponent from './infra-update/infra-update.component';

interface Props {
  params: {
    id: number
  }
}

export default function DetailsInfraestructure({ params }: Props) {
  const [showPopup, setShowPopup] = useState(false);

  const { data, error, isLoading, refetch } = useGetInfrastructureByIdQuery(params.id)

  const dataInfrastructure = data?.data;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error en la carga de infraestructura</div>;

  return (
    <div className="p-4 md:p-8">
      <Link href={`/dash-admin/infrastructure/list`}>Atras</Link>
      <div className="bg-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">{dataInfrastructure.nombres}</h1>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Código de Localización:</p>
          <p className="text-gray-900">{dataInfrastructure.codigo}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Dirección:</p>
          <p className="text-gray-900">{dataInfrastructure.direccion}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Celular:</p>
          <p className="text-gray-900">{dataInfrastructure.telefono}</p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={togglePopup}
        >Editar</button>
        {showPopup &&
          <InfraUpdateComponent
            onClose={togglePopup}
            id={dataInfrastructure.id_sede}
            data={dataInfrastructure}
            update={refetch}
          />
        }
      </div>
      <section className='flex justify-between items-center mb-4 mt-8'>
        <h2 className="text-2xl font-semibold ">Cuartos</h2>
        <div>
          <button>Crear cuartos</button>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* {infra.cuartos.map((cuarto, index) => (
          <div key={index} className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{cuarto.cuarto}</h3>
            <p className="text-gray-600">Piso: {cuarto.piso}</p>
            <p className="text-gray-600">Estado del Cuarto: {cuarto.estadoCuarto}</p>
            <h4 className="text-lg font-medium mt-4">Procedimientos:</h4>
            <ul className="list-disc list-inside pl-4 mt-2">
              {cuarto.procedimientos.map((procedimiento, procIndex) => (
                <li key={procIndex} className="text-gray-700">{procedimiento}</li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </div>
  );
}
