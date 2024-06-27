"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useGetInfrastructureQuery } from '../../infrastructure/list/store/service';
import { useGetExtraAppointmentsQuery } from '../components/extras/list/store/service';
import { CreateAppointmentExtraComponent } from '../components/extras/create/createAppointmentExtra.component';
import DetailpopupExtraAppointmentComponent from '../components/extras/find-by-id/detail-popup-extra-appointment-component';



const formatDate = (date: string | Date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const formatTime = (timeString: string) => {
  if (!timeString) return "";

  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds);

  let formattedHours = date.getHours();
  const formattedMinutes = date.getMinutes();
  const period = formattedHours >= 12 ? 'PM' : 'AM';

  // Convertir a formato de 12 horas
  formattedHours = formattedHours % 12;
  formattedHours = formattedHours ? formattedHours : 12; // La hora '0' debe mostrarse como '12'

  return `${formattedHours}:${formattedMinutes < 10 ? '0' + formattedMinutes : formattedMinutes} ${period}`;
};

export default function ApointmentExtras() {
  const { data: dataExtraAppointment, isLoading: dataExtraAppointmentLoad, refetch: refetchExtraAppointment } = useGetExtraAppointmentsQuery({ limit: 150000, page: 0, filter: '' });
  const { data: dataInfra, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 15, page: 0, filter: '' });

  const infrastructure = dataInfra?.data?.content;

  const today = formatDate(new Date());

  const appointmentsData = dataExtraAppointment?.data?.content;

  // **********
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Nuevo estado para los elementos por página

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia la cantidad de elementos por página
  };

  const filteredAppointments = useCallback(() => {
    if (dataExtraAppointmentLoad || loadingInfra || !appointmentsData) return [];

    return appointmentsData.filter((appointment: any) => {
      const appointmentDate = appointment.fecha_cita;
      return appointmentDate === selectedDate && appointment.sede.id_sede === selectedDistrict;
    });
  }, [appointmentsData, selectedDate, selectedDistrict, dataExtraAppointmentLoad, loadingInfra]);

  const paginatedAppointments = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAppointments().slice(startIndex, endIndex);
  }, [filteredAppointments, currentPage, itemsPerPage]);

  const totalItems = filteredAppointments().length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    refetchExtraAppointment();
    refetchInfra();
  }, [selectedDate, selectedDistrict, refetchExtraAppointment, refetchInfra]);

  useEffect(() => {
    // Reset page to 1 when filters change
    setCurrentPage(1);
  }, [selectedDate, selectedDistrict]);


  // ***** 
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [popupDetailVisible, setPopupDetailVisible] = useState<boolean>(false);
  const [selectedIdAppointment, setSelectedIdAppointment] = useState<number | null | any>(null);
  const handleDetailAppointmentClick = (id: number) => {
    setPopupDetailVisible(true);
    setSelectedIdAppointment(id);
  }
  const closeDetailAppointmentClick = () => {
    setPopupDetailVisible(false);
  }

  return (
    <React.Fragment>
      <h1 className='text-2xl'>Calendario de Extras</h1>

      <section className='flex gap-3 flex-col xl:flex-row mt-5 xl:justify-between bg-white rounded-md p-4'>
        <section className='flex gap-3 flex-col xl:flex-row'>
          <input
            type="date"
            className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <select
            className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(parseInt(e.target.value, 10))}
          >

            {infrastructure?.map((infra: any, i: number) => (
              <React.Fragment key={i}>
                <option value={infra.id_sede} className='capitalize'>{infra.nombres}</option>
                {/* <option value="Sede san isidro">San Isidro</option> */}
              </React.Fragment>
            ))}

          </select>
        </section>

      </section>
      <section
        className='flex xl:justify-between flex-col xl:flex-row mt-5 gap-3 bg-white rounded-md p-3'
      >
        <input
          type="text"
          placeholder="Buscar..."
          className="p-2 border border-gray-300 rounded-md mb-2 outline-none w-full md:w-auto"
        />
        <div className="flex flex-col xl:flex-row items-center gap-3 ">
          <button
            className="p-2 bg-blue-500 rounded-md text-white w-full md:w-auto"
            onClick={togglePopup}
          >
            Agregar
          </button>
          <button className="p-2 bg-green-500 rounded-md text-white w-full md:w-auto">
            Excel
          </button>
          <button className="p-2 bg-gray-500 text-white rounded-md mt-2 xl:mt-0 w-full md:w-auto">
            Imprimir
          </button>
        </div>
      </section>
      <section className='bg-white p-2 rounded-md w-full xl:h-[35rem] h-full overflow-x-auto'>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Paciente</th>
              <th className="px-4 py-2 text-left">Procedimiento</th>

              <th className="px-4 py-2 text-left">Medico</th>
              <th className="px-4 py-2 text-left">Acciones</th>

            </tr>
          </thead>
          <tbody>
            {paginatedAppointments().map((filteredAppointment: any) => (
              <tr key={filteredAppointment?.id_cita_extra} className='border-b'>
                <td className="px-4 py-2">
                  {formatTime(filteredAppointment?.hora_registro)}
                  {/* {filteredAppointment?.hora_registro} */}
                </td>
                <td className="px-4 py-2">
                  <p>{filteredAppointment?.paciente.nombres}</p>
                  <p>{filteredAppointment?.paciente.numero_documento_identidad}</p>
                </td>
                <td>
                  <div className={`flex flex-col justify-between h-5/6 p-2 mx-1  ${filteredAppointment.color === 'Blue' ? 'bg-blue-300' : 'bg-orange-300'}`}>
                    <div className='flex flex-wrap items-center justify-between'>
                      <div className='flex flex-col '>
                        <h3 className='capitalize text-xs font-bold'>{filteredAppointment?.paciente.nombres}</h3>
                        <span className='text-xs underline'>{filteredAppointment?.procedimiento.nombres}</span>

                      </div>

                      <div className='flex gap-2'>
                        {/* <Link href={`list/${filteredAppointment.id_appointment}`} className='text-xs bg-yellow-400 p-1 rounded-md' >Detalle</Link> */}
                        <button
                          className='text-xs bg-gray-200 p-1 rounded-md'
                          onClick={() => handleDetailAppointmentClick(filteredAppointment.id_cita_extra)}
                        >
                          Atencion
                        </button>

                      </div>                                                            </div>
                    <div className='flex justify-between'>
                      <div className='flex gap-2'>
                        <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>
                          {filteredAppointment.paciente.estado_antiguedad.id_cabecera_detalle === 35 ? 'N' : filteredAppointment.paciente.estado_antiguedad.id_cabecera_detalle === 36 ? 'A' : ''}
                        </div>
                        <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>R</div>
                      </div>
                      <div
                        className={
                          `w-12 h-4 rounded-sm ${filteredAppointment.cita_extra_info.hora_entrada && filteredAppointment.cita_extra_info.hora_atencion === null && filteredAppointment.cita_extra_info.hora_salida === null ? 'bg-green-700' :
                            filteredAppointment.cita_extra_info.hora_entrada && filteredAppointment.cita_extra_info.hora_atencion && filteredAppointment.cita_extra_info.hora_salida === null ? 'bg-yellow-300' :
                              filteredAppointment.cita_extra_info.hora_entrada && filteredAppointment.cita_extra_info.hora_atencion && filteredAppointment.cita_extra_info.hora_salida ? 'bg-blue-500' : 'bg-white'}`}
                      >

                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-2">
                  <p>{filteredAppointment?.empleado.nombres}</p>
                  <p>{filteredAppointment?.empleado.numero}</p>
                </td>

                {/* <td className="px-4 py-2">
                </td> */}
                {/* <td></td> */}
                <td className="px-4 py-2">
                  <button className='text-red-500'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className='bg-white p-3 flex justify-between items-center rounded-lg'>
        <div className='flex gap-3 items-center'>
          <div className='flex gap-2 items-center'>
            <label htmlFor="itemsPerPage" className='text-gray-700'>Datos por pagina:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className='border border-gray-300 rounded-md p-1'
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span className='text-gray-600'>Total datos: {totalItems}</span>
        </div>
        <div className='flex gap-3 items-center'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'} `}
          >
            Atras
          </button>
          <span className='text-gray-700'>Pagina {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'} `}
          >
            Siguiente
          </button>
        </div>
      </div>
      {showPopup && <CreateAppointmentExtraComponent
        close={togglePopup}
        location={selectedDistrict}
        refetch={refetchExtraAppointment}
        date={selectedDate}
      />}
      {popupDetailVisible && (
        <DetailpopupExtraAppointmentComponent
          id={selectedIdAppointment}
          close={closeDetailAppointmentClick}
          refetchAppointemnt={refetchExtraAppointment}
        />
      )}
    </React.Fragment>
  )
}
