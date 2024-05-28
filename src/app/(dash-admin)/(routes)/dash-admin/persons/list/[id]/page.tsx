"use client"
import React, { useState } from 'react'
import { useGetEmployeeByIdQuery } from './store/service';
import EmployeeUpdateComponent from './employee-update/employee-update.component';

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
    <section className="flex flex-wrap">
      {/* Datos del usuario */}
      <div className="w-full p-4">
        <div className="bg-white p-8">
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
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Sede:</p>
            <h1 className="text-gray-900 font-bold capitalize">Nombre: {dataEmployee.sede.nombres}</h1>
            <p className="text-gray-900 capitalize">Direccion: {dataEmployee.sede.direccion}</p>
            <p className="text-gray-900">Celular: {dataEmployee.sede.telefono}</p>
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={togglePopup}
            >
              Editar
            </button>
            {showPopup
              &&
              <EmployeeUpdateComponent
                onClose={togglePopup}
                id={dataEmployee.id_empleado}
                data={dataEmployee}
                update={refetch}
              />
            }
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {/* Datos del horario del usuario */}
      <div className="w-full p-4">
        <div className="bg-white p-8">
          <h2 className="text-xl font-bold mb-4">Horario de Trabajo</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">Día</th>
                <th className="py-2 text-left">Horario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Lunes</td>
                <td className="border px-4 py-2">08:00 - 16:00</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">Martes</td>
                <td className="border px-4 py-2">09:00 - 17:00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Miércoles</td>
                <td className="border px-4 py-2">10:00 - 18:00</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">Jueves</td>
                <td className="border px-4 py-2">08:00 - 16:00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Viernes</td>
                <td className="border px-4 py-2">09:00 - 17:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

  );
}
