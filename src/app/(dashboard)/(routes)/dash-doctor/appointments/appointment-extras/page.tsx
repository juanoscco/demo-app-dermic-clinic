"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { CreateAppointmentExtraComponent } from '../components/extras/create/createAppointmentExtra.component';
import DetailpopupExtraAppointmentComponent from '../components/extras/find-by-id/detail-popup-extra-appointment-component';
// import { formatTime } from '@/utils/formatTime';
import { DeleteAppointmentsExtraComponents } from '../components/extras/delete/components/delete-appointments-extra.components';
import { DataTable } from "./components/datatable"
import { ExcelExport } from "@/utils/excel";
import { PrintButton } from "@/utils/print";

import { useGetExtraAppointmentsQuery, useGetInfrastructureQuery } from '@/app/(dashboard)/store';

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};



export default function ApointmentExtras() {
  const { data: dataExtraAppointment, isLoading: dataExtraAppointmentLoad, refetch: refetchExtraAppointment } = useGetExtraAppointmentsQuery({ limit: 150000, page: 0, filter: '' });
  const { data: dataInfra, isLoading: loadingInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 15, page: 0, filter: '' });

  const infrastructure = dataInfra?.data?.content?.filter((item: any) => item.estado);

  const today = formatDate(new Date());

  const appointmentsData = dataExtraAppointment?.data?.content;

  // **********
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Nuevo estado para los elementos por página
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el término de búsqueda

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia el término de búsqueda
  };
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia la cantidad de elementos por página
  };
  const filteredAppointments = useCallback(() => {
    if (dataExtraAppointmentLoad || loadingInfra || !appointmentsData) return [];

    return appointmentsData.filter((appointment: any) => {
      const appointmentDate = appointment.fecha_cita;
      const matchesSearchTerm = (
        appointment.paciente?.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.paciente?.numero_documento_identidad?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return appointmentDate === selectedDate && appointment.sede.id_sede === selectedDistrict && matchesSearchTerm && appointment.estado;
    });
  }, [appointmentsData, selectedDate, selectedDistrict, searchTerm, dataExtraAppointmentLoad, loadingInfra]);

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
  // *****
  /**
    * 
    * DELETE APPOINTMENT
    */
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [selectedAppointmentExtraIdDelete, setSelectedAppointmentExtraIdDelete] = useState<number | null>(null)

  const togglePopupDelete = (id?: number) => {
    if (id) {
      setSelectedAppointmentExtraIdDelete(id)
    }
    setShowPopupDelete(!showPopupDelete)
  }

  const selectedDeleteAppointmentExtra = selectedAppointmentExtraIdDelete !== null
    ? appointmentsData.find((proc: any) => proc.id_cita_extra === selectedAppointmentExtraIdDelete)
    : null;
  /**
   * 
   * END DELETE APPOINTMENT
   */


  const columnsForExcelAndPrint = {
    'paciente.nombres': 'Nombre del Paciente',
    'empleado.nombres': 'Nombre del Empleado',
    'procedimiento.nombres': 'Nombre del Procedimiento',
    'procedimiento.tipo_procedimiento.descripcion': 'Tipo de Procedimiento',
    'procedimiento.subtipo_procedimiento.descripcion': 'Subtipo de Procedimiento',
    'sala_tratamiento.nombres': 'Nombre de la Sala de Tratamiento',
    'sede.nombres': 'Nombre de la Sede',
  };

  // ******
  const data = paginatedAppointments();
  const columns = [
    { key: 'hora_registro', label: 'Hora', render: (item: any) => <span>{item?.hora_registro}</span> },
    {
      key: 'paciente', label: 'Paciente', render: (item: any) => <div>
        <p>{item?.paciente.nombres}</p>
        <p>{item?.paciente.numero_documento_identidad}</p>
      </div>
    },
    {
      key: 'procedimiento', label: 'Procedimiento', render: (item: any) => (
        <div className={`flex flex-col justify-between h-5/6 p-2 mx-1  ${item.color === 'Blue' ? 'bg-blue-300' : 'bg-orange-300'}`}>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='flex flex-col '>
              <h3 className='capitalize text-xs font-bold'>{item?.paciente.nombres}</h3>
              <span className='text-xs underline'>{item?.procedimiento.nombres}</span>
            </div>

            <div className='flex gap-2'>
              <button
                className='text-xs bg-gray-200 p-1 rounded-md'
                onClick={() => handleDetailAppointmentClick(item.id_cita_extra)}
              >
                Atencion
              </button>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>
                {item.paciente.estado_antiguedad.id_cabecera_detalle === 35 ? 'N' : item.paciente.estado_antiguedad.id_cabecera_detalle === 36 ? 'A' : ''}
              </div>
              <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>R</div>
            </div>
            <div
              className={
                `w-12 h-4 rounded-sm ${item.cita_extra_info.hora_entrada && item.cita_extra_info.hora_atencion === null && item.cita_extra_info.hora_salida === null ? 'bg-green-700' :
                  item.cita_extra_info.hora_entrada && item.cita_extra_info.hora_atencion && item.cita_extra_info.hora_salida === null ? 'bg-yellow-300' :
                    item.cita_extra_info.hora_entrada && item.cita_extra_info.hora_atencion && item.cita_extra_info.hora_salida ? 'bg-blue-500' : 'bg-white'}`}
            >
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'empleado', label: 'Medico', render: (item: any) => <div>
        <p>{item?.empleado.nombres}</p>
        <p>{item?.empleado.numero}</p>
      </div>
    },
    {
      key: 'Acciones', label: 'Acciones', render: (item: any) => (
        <button
          onClick={() => togglePopupDelete(item?.id_cita_extra)}
          className='text-red-500'
        >Eliminar
        </button>
      )
    }
  ];
  const handleExportExcel = ExcelExport({ data: data, columns: columnsForExcelAndPrint, filename: 'citas_extras' })

  const handlePrint = PrintButton({ data: data, columns: columnsForExcelAndPrint, nametitle: 'citas_extras' })

  const actions = (
    <React.Fragment>
      <button
        className='p-2 bg-blue-500 rounded-md text-white xl:w-auto w-full text-center'
        onClick={togglePopup}

      >
        Agregar
      </button>
      <button
        onClick={handleExportExcel}
        className='p-2 bg-green-500 rounded-md text-white xl:w-auto w-full'
      >
        Excel
      </button>
      <button
        onClick={handlePrint}
        className='bg-gray-500 p-2 text-white rounded-md xl:w-auto w-full'
      >
        Imprimir
      </button>
    </React.Fragment>
  );

  // ******


  return (
    <React.Fragment>
      <h1 className='text-2xl'>Calendario de Extras</h1>

      <section className='flex gap-3 flex-col xl:flex-row mt-5  bg-white rounded-md p-4'>
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

      <DataTable
        data={data}
        columns={columns}
        actions={actions}
        filterPlaceholder="Buscar..."
      />

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

      {showPopupDelete && selectedDeleteAppointmentExtra && (
        <DeleteAppointmentsExtraComponents
          id={selectedDeleteAppointmentExtra?.id_cita_extra}
          onClose={togglePopupDelete}
          update={refetchExtraAppointment}
        />
      )}
    </React.Fragment>
  )
}
