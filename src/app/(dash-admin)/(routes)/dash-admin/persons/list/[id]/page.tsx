"use client"
import React, { useState } from 'react'
import EmployeeUpdateComponent from './employee-update/employee-update.component';
import ScheludePersonComponent from './components/schedule-component/schelude-person.component';
import AgendaPersonComponent from './components/agenda-component/agenda-person.component';
import ExceptionPersonComponent from './components/exception-component/exception-person.component';
import { useGetEmployeeByIdQuery } from './store/service';

import Link from 'next/link';

interface Props {
  params: {
    id: number
  }
}

export default function DetailsUserEmployees({ params }: Props) {

  const [showPopup, setShowPopup] = useState(false);

  const { data, error, isLoading, refetch } = useGetEmployeeByIdQuery(params.id);

  const dataEmployee = data?.data;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading patient details</div>;

  return (
    <section className="p-4">
      <Link
        href={`/dash-admin/persons/list`}
        className="inline-block mb-4 text-blue-500 hover:text-blue-700 transition-all duration-200"
      >Atras</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Datos del usuario */}
        <div className="bg-white p-6 rounded-lg ">
          <h1 className="text-2xl font-bold mb-4 capitalize">
            Empleado: {dataEmployee.nombres.toLowerCase()}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Email:</p>
              <p className="text-gray-900 font-bold">{dataEmployee.correo}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">DNI:</p>
              <p className="text-gray-900 font-bold">{dataEmployee.numero}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Rol:</p>
              <p className="text-gray-900 font-bold capitalize">{dataEmployee.usuario.rol.descripcion.toLowerCase()}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Teléfono:</p>
              <p className="text-gray-900 font-bold">{dataEmployee.telefono}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Título:</p>
              <p className="text-gray-900 font-bold">{dataEmployee.titulo?.descripcion}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Día sin refrigerio:</p>
              <p className="text-gray-900 font-bold">{dataEmployee.dia_sin_refriguerio?.descripcion}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-gray-900 font-bold capitalize">Sede: {dataEmployee.sede.nombres}</h1>
              <p className="text-gray-900 capitalize">Dirección: {dataEmployee.sede.direccion}</p>
              <p className="text-gray-900">Celular: {dataEmployee.sede.telefono}</p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={togglePopup}
            >
              Editar
            </button>
            {showPopup &&
              <EmployeeUpdateComponent
                onClose={togglePopup}
                id={dataEmployee?.id_empleado}
                data={dataEmployee}
                update={refetch}
              />
            }
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Eliminar
            </button>
          </div>
        </div>

        <ScheludePersonComponent
          dataPerson={dataEmployee}
          idPerson={dataEmployee?.id_empleado}
        />

        {/* Espacios en blanco */}
        <AgendaPersonComponent
          dataPerson={dataEmployee}
          idPerson={dataEmployee?.id_empleado}
        />
        <ExceptionPersonComponent
          dataPerson={dataEmployee}
          idPerson={dataEmployee?.id_empleado} />
      </div>
    </section>

  );
}
