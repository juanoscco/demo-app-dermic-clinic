"use client"
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetPatientByIdQuery } from './store/service';
import { DeletePatientComponent } from "./patient-delete/components";
import { useGetAppointmentListQuery } from '../../../appointments/components/citas/list/store/service';
import { useGetExtraAppointmentsQuery } from '../../../appointments/components/extras/list/store/service';
import { formatTime } from '@/utils/formatTime';
import PatientUpdateComponent from './patient-update/patient-update.component';

interface Props {
    params: {
        id: number
    }
}

export default function DetailsPatients({ params }: Props) {

    // TODO MEJORAR UI DE DETALLES PACIENTES
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(false)


    const { data, error, isLoading, refetch } = useGetPatientByIdQuery(params.id);
    
    const { data: dataAppointment, isLoading: loadAppointment, isError: errorAppointment, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, filter: '' });
    const { data: dataExtraAppointment, isLoading: dataExtraAppointmentLoad, isError: errorExtraAppointment, refetch: refetchExtraAppointment } = useGetExtraAppointmentsQuery({ limit: 150000, page: 0, filter: '' });

    const dataPatient = data?.data;

    const appointments = dataAppointment?.data?.content;
    const extraAppointments = dataExtraAppointment?.data?.content;

    const filterPatientWithAppointment = useCallback(() => {
        if (!appointments || !dataPatient) return [];
        return appointments.filter((item: any) => item.paciente.id_paciente === dataPatient.id_paciente && item.estado);
    }, [appointments, dataPatient]);

    const filterPatientWithExtraAppointment = useCallback(() => {
        if (!extraAppointments || !dataPatient) return [];
        return extraAppointments.filter((item: any) => item.paciente.id_paciente === dataPatient.id_paciente && item.estado);
    }, [extraAppointments, dataPatient]);

    useEffect(() => {
        if (!loadAppointment && !dataExtraAppointmentLoad) {
            refetchAppointment();
            refetchExtraAppointment();
        }
    }, [loadAppointment, dataExtraAppointmentLoad, refetchAppointment, refetchExtraAppointment]);

    const filteredAppointments = useMemo(() => filterPatientWithAppointment(), [filterPatientWithAppointment]);
    const filteredExtraAppointments = useMemo(() => filterPatientWithExtraAppointment(), [filterPatientWithExtraAppointment]);



    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const togglePopupDelete = () => {
        setShowPopupDelete(!showPopupDelete);
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading patient details</div>;



    // TODO: FALTA AGREGAR MAS DISEÑO UI
    return (
        <section className="flex flex-wrap lg:justify-between h-full">
            {/* Información del paciente */}
            <div className="w-full lg:w-1/2 p-4">
                <div className="bg-white p-8 w-full">
                    <h1 className="text-2xl font-bold">
                        Paciente:
                    </h1>
                    <span className='text-xl font-bold capitalize'>{dataPatient.nombres.toLowerCase()}</span>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">DNI:</p>
                        <p className="text-gray-900">{dataPatient.numero_documento_identidad}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Teléfono:</p>
                        <p className="text-gray-900">{dataPatient.telefono}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Email:</p>
                        <p className="text-gray-900">{dataPatient.email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Fecha de Nacimiento:</p>
                        <p className="text-gray-900">{new Date(dataPatient.nacimiento).toLocaleDateString()}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Estado Civil:</p>
                        <p className="text-gray-900">{dataPatient.estado_civil?.descripcion}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Ocupación:</p>
                        <p className="text-gray-900">{dataPatient.ocupacion}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Dirección:</p>
                        <p className="text-gray-900">{dataPatient.direccion}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 font-medium">Lugar de Nacimiento:</p>
                        <p className="text-gray-900">{dataPatient.lugar_nacimiento}</p>
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
                            <PatientUpdateComponent
                                onClose={togglePopup}
                                id={dataPatient.id_paciente}
                                data={dataPatient}
                                update={refetch}
                            />
                        }
                        <button
                            onClick={togglePopupDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Eliminar
                        </button>
                        {showPopupDelete && (
                            <DeletePatientComponent
                                onClose={togglePopupDelete}
                                id={dataPatient.id_paciente}
                                update={refetch}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* Información del historial del paciente */}
            <div className="w-full lg:w-1/2 p-4 flex flex-col gap-5">
                <div className="w-full flex flex-col gap-4">
                    <div className="bg-white p-8 overflow-x-auto h-[24rem] rounded-lg ">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Historial de citas del paciente</h2>
                        {loadAppointment ? (
                            <div className="text-gray-700 text-center py-4">Cargando...</div>
                        ) : (errorAppointment) ? (
                            <div className="text-red-500 text-center py-4">Error al cargar los datos. Inténtalo de nuevo.</div>
                        ) : (
                            <>
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((appointment: any) => (
                                        <div key={appointment.id_cita} className="mb-6 border-b pb-4">
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Fecha de la cita: {appointment.fecha_cita} </h3>
                                            <p className="text-gray-600 font-medium mb-2">Doctor: <span className='text-gray-900'>{appointment.empleado.nombres}</span></p>

                                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 p-4 rounded-lg'>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Motivo de la Visita:</p>
                                                    <p className="text-gray-900 mb-2">{appointment.procedimiento.nombres}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Sede:</p>
                                                    <p className="text-gray-900 mb-2">{appointment.sede.nombres}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Sala:</p>
                                                    <p className="text-gray-900 mb-2">{appointment.sala_tratamiento.nombres}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Piso:</p>
                                                    <p className="text-gray-900 mb-2">{appointment.sala_tratamiento.piso}</p>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 p-4 mt-4 rounded-lg'>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Hora:</p>
                                                    <p className="text-gray-900">{appointment.horario.descripcion}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Entrada:</p>
                                                    <p className="text-gray-900">{formatTime(appointment.cita_info.hora_entrada)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Atencion:</p>
                                                    <p className="text-gray-900">{formatTime(appointment.cita_info.hora_atencion)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Salida:</p>
                                                    <p className="text-gray-900">{formatTime(appointment.cita_info.hora_salida)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-700 text-center py-4">No hay citas</div>
                                )}
                            </>
                        )}
                    </div>
                </div>


                <div className="bg-white p-8 overflow-x-auto h-[20rem] rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Historial de citas Extras</h2>
                    {loadAppointment || dataExtraAppointmentLoad ? (
                        <div className="text-gray-700 text-center py-4">Cargando...</div>
                    ) : (errorAppointment || errorExtraAppointment) ? (
                        <div className="text-red-500 text-center py-4">Error al cargar los datos. Inténtalo de nuevo.</div>
                    ) : (
                        <>
                            {filteredExtraAppointments?.length > 0 ? (
                                filteredExtraAppointments.map((extraAppointment: any) => (
                                    <div key={extraAppointment.id_cita} className="mb-6 border-b pb-4">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Fecha de la cita extra: {extraAppointment.fecha_cita}</h3>
                                        <p className="text-gray-600 font-medium mb-2">Doctor: <span className='text-gray-900'>{extraAppointment.empleado.nombres}</span></p>

                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 p-4 rounded-lg'>
                                            <div>
                                                <p className="text-gray-600 font-medium">Motivo de la Visita:</p>
                                                <p className="text-gray-900 mb-2">{extraAppointment.procedimiento.nombres}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 font-medium">Sede:</p>
                                                <p className="text-gray-900 mb-2">{extraAppointment.sede.nombres}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 font-medium">Sala:</p>
                                                <p className="text-gray-900 mb-2">{extraAppointment.sala_tratamiento.nombres}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 font-medium">Piso:</p>
                                                <p className="text-gray-900 mb-2">{extraAppointment.sala_tratamiento.piso}</p>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 p-4 mt-4 rounded-lg'>
                                            <div>
                                                <p className="text-gray-600 font-medium">Hora Registrada:</p>
                                                <p className="text-gray-900">{formatTime(extraAppointment.hora_registro)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 font-medium">Entrada:</p>
                                                <p className="text-gray-900">{formatTime(extraAppointment?.cita_extra_info.hora_entrada)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 font-medium">Atencion:</p>
                                                <p className="text-gray-900">{formatTime(extraAppointment?.cita_extra_info.hora_atencion)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 font-medium">Salida:</p>
                                                <p className="text-gray-900">{formatTime(extraAppointment?.cita_extra_info.hora_salida)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-700 text-center py-4">No hay citas</div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </section>

    )
}
