"use client"
import React, { useState, useEffect } from 'react'
import { useGetAppointmentListQuery } from '../../../../components/citas/list/store/service';
import { useGetInfrastructureQuery } from '@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/store/service';
import { useGetRoomsListQuery } from '@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/list/store/service';
import { useGetRoomProcedureQuery } from '@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/get/service';
import { useGetEmployeesQuery } from '@/app/(dash-admin)/(routes)/dash-admin/persons/list/store/service';
import { useGetPersonalProcedureQuery } from '@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/get/service';
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateAppointmentMutation } from '../../../../components/citas/update/store/service';

interface Props {
    dataDetailAppointmentById?: any;
    refetch?: any;
}

const hours = [
    { id_cabecera_detalle: 40, descripcion: "09:00 a.m.", valor: "" },
    { id_cabecera_detalle: 41, descripcion: "09:20 a.m.", valor: "" },
    { id_cabecera_detalle: 42, descripcion: "09:40 a.m.", valor: "" },
    { id_cabecera_detalle: 43, descripcion: "10:00 a.m.", valor: "" },
    { id_cabecera_detalle: 44, descripcion: "10:20 a.m.", valor: "" },
    { id_cabecera_detalle: 45, descripcion: "10:40 a.m.", valor: "" },
    { id_cabecera_detalle: 46, descripcion: "11:00 a.m.", valor: "" },
    { id_cabecera_detalle: 47, descripcion: "11:20 a.m.", valor: "" },
    { id_cabecera_detalle: 48, descripcion: "11:40 a.m.", valor: "" },
    { id_cabecera_detalle: 49, descripcion: "12:00 p.m.", valor: "" },
    { id_cabecera_detalle: 50, descripcion: "12:20 p.m.", valor: "" },
    { id_cabecera_detalle: 51, descripcion: "12:40 p.m.", valor: "" },
    { id_cabecera_detalle: 52, descripcion: "13:00 p.m.", valor: "" },
    { id_cabecera_detalle: 53, descripcion: "13:20 p.m.", valor: "" },
    { id_cabecera_detalle: 54, descripcion: "13:40 p.m.", valor: "" },
    { id_cabecera_detalle: 55, descripcion: "14:00 p.m.", valor: "" },
    { id_cabecera_detalle: 56, descripcion: "14:20 p.m.", valor: "" },
    { id_cabecera_detalle: 57, descripcion: "14:40 p.m.", valor: "" },
    { id_cabecera_detalle: 58, descripcion: "15:00 p.m.", valor: "" },
    { id_cabecera_detalle: 59, descripcion: "15:20 p.m.", valor: "" },
    { id_cabecera_detalle: 60, descripcion: "15:40 p.m.", valor: "" },
    { id_cabecera_detalle: 61, descripcion: "16:00 p.m.", valor: "" },
    { id_cabecera_detalle: 62, descripcion: "16:20 p.m.", valor: "" },
    { id_cabecera_detalle: 63, descripcion: "16:40 p.m.", valor: "" },
    { id_cabecera_detalle: 64, descripcion: "17:00 p.m.", valor: "" },
    { id_cabecera_detalle: 65, descripcion: "17:20 p.m.", valor: "" },
    { id_cabecera_detalle: 66, descripcion: "17:40 p.m.", valor: "" },
    { id_cabecera_detalle: 67, descripcion: "18:00 p.m.", valor: "" },
    { id_cabecera_detalle: 68, descripcion: "18:20 p.m.", valor: "" },
    { id_cabecera_detalle: 69, descripcion: "18:40 p.m.", valor: "" },
    { id_cabecera_detalle: 70, descripcion: "19:00 p.m.", valor: "" }
];

const title_employe = [
    {
        id_cabecera_detalle: 5,
        descripcion: "Cosmiatras",
        valor: ""
    },
    {
        id_cabecera_detalle: 6,
        descripcion: "Doctores",
        valor: ""
    },
]

interface DataDetailAppointment {
    id_cita?: number;
    procedimiento: {
        id_procedimiento: number | null;
    };
    sala_tratamiento: {
        id_sala_tratamiento: number;
    };
    empresa: {
        id_empresa: number;
    };
    usuario_registro: {
        id_usuario: number;
    };
    paciente: {
        id_paciente: number;
        nombres?: string;
    };
    sede: {
        id_sede: number;
    };
    fecha_cita: string;
    empleado: {
        id_empleado: number | null;
    };
    hora: {
        id_cabecera?: number;
        id_cabecera_detalle: number;
        descripcion: string;
        valor: string;
    };
    estado: boolean;
}

export default function CalendarComponent({ dataDetailAppointmentById, refetch }: Props) {
    // *******
    const { data: dataAppointment, isLoading: loadAppointmentRoom, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, filter: '' })
    const { data: dataInfra, isLoading: loadInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 20, page: 0, filter: '' })
    const { data: dataRoom, isLoading: loadRoom, refetch: refetchRooms } = useGetRoomsListQuery({ limit: 3000, page: 0, filter: '' })

    // ********
    const { data: dataEmployee, isLoading: loadEmployee, refetch: refetchEmployee } = useGetEmployeesQuery({ limit: 15000, page: 0, filter: '' })
    const { data: dataHeadBoardProcedure, refetch: refetchDataHeadBoard } = useGetPersonalProcedureQuery({ limit: 300, page: 0, filter: '' })
    const { data: dataRoomProcedure, isLoading: loadRoomProcedures, refetch: refetchRoomProcedure } = useGetRoomProcedureQuery({ limit: 300, page: 0, filter: '' });


    const router = useRouter();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchRooms();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchRooms]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchInfra();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchInfra]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchAppointment();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchAppointment]);

    const appointments = dataAppointment?.data?.content;
    // 
    const [selectedCell, setSelectedCell] = useState<{ hour: any, room: any } | null>(null);

    const [selectedSedeId, setSelectedSedeId] = useState<number | null | any>(dataDetailAppointmentById.sede.id_sede);
    const handleSedeChange = (event: any) => {
        setSelectedSedeId(parseInt(event.target.value, 10));
    };

    // Filtrar los cuartos basados en el id_sede seleccionado
    const filteredRooms = dataRoom?.data?.content.filter((room: any) => room.sede.id_sede === parseInt(selectedSedeId));

    // Filtrar por medio de la profesion
    const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(dataDetailAppointmentById.empleado.titulo.id_cabecera_detalle);

    const handleProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const professionId = parseInt(event.target.value);
        const selectedProfession = title_employe.find(prof => prof.id_cabecera_detalle === professionId);
        if (selectedProfession) {
            setSelectedProfessionId(professionId);
        }
    };

    // hooks para el selecionado!
    const [selectedHour, setSelectedHour] = useState<any>(null);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);

    const handleCellClick = (hour: any, room: any) => {
        setSelectedHour(hour);
        setSelectedRoom(room);
        setSelectedCell({ hour, room });

    };

    const getCurrentDateUpdate = (dateString: string | undefined) => {
        if (!dateString) return ''; // Manejar el caso en que dateString es undefined

        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate() + 1).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedDate, setSelectedDate] = useState(getCurrentDateUpdate(dataDetailAppointmentById.fecha_cita));

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };


    const sortedDataInfra = dataInfra?.data?.content?.slice().sort((a: any, b: any) => {
        return a.codigo.localeCompare(b.codigo);
    });

    const filteredAppointments = appointments?.map((item: any) => ({
        id_appointment: item.id_cita,
        id_hour: item.horario.id_cabecera_detalle,
        hour_desc: item.horario.descripcion,
        id_room: item.sala_tratamiento.id_sala_tratamiento,
        id_location: item.sede.id_sede,
        item_date: item.fecha_cita,
        item_profession: item.empleado.titulo.id_cabecera_detalle,
        item_procedure_name: item.procedimiento.nombres,
        item_patient_name: item.paciente.nombres,
        item_color: item.color,
        item_entrace: item.cita_info.hora_entrada,
        item_atention: item.cita_info.hora_atencion,
        item_exit: item.cita_info.hora_salida,
        item_id_state_time: item.paciente.estado_antiguedad.id_cabecera_detalle,
    }));


    const filterAppointmentsByHourAndRoom = (hour: any, room: any, location: any, date: any, profession: any) => {
        return filteredAppointments?.find((item: any) =>
            item.id_hour === hour.id_cabecera_detalle &&
            item.id_room === room.id_sala_tratamiento &&
            item.id_location === location &&
            item.item_date === date &&
            item.item_profession === profession
        );
    };


    // ********

    const roomProcedures = dataRoomProcedure?.data?.content
    const employee = dataEmployee?.data?.content

    const dataHeadBoardFilter = dataHeadBoardProcedure?.data?.content;

    // Objeto temporal para rastrear los id_procedimiento únicos
    const uniqueProcedures: { [key: string]: any } = {};

    // Filtrar procedimientos únicos de las salas y obtener id_procedimiento y nombre_proc
    const filterRoomProcedures = roomProcedures
        ?.filter((item: any) =>
            item.procedimiento_sala_detalle.some((detail: any) =>
                detail.sala_tratamiento.id_sala_tratamiento === selectedRoom?.id_sala_tratamiento
            )
        )
        .reduce((uniqueItems: any[], item: any) => {
            const id_procedimiento = item.procedimiento.id_procedimiento;
            if (!uniqueProcedures[id_procedimiento]) {
                uniqueProcedures[id_procedimiento] = true;
                uniqueItems.push({
                    id_procedimiento: id_procedimiento,
                    nombre_proc: item.procedimiento.nombres
                });
            }
            return uniqueItems;
        }, []);

    const filteredRoomProceduresWithMatch = dataHeadBoardFilter?.filter((item: any) => item.titulo.id_cabecera_detalle === selectedProfessionId)
        .map((item: any) => ({
            ...item,
            procedimiento_personales_detalle: item.procedimiento_personales_detalle.filter((detail: any) =>
                filterRoomProcedures?.some((proc: any) =>
                    proc.id_procedimiento === detail.procedimiento.id_procedimiento &&
                    proc.nombre_proc === detail.procedimiento.nombres
                )
            )
        }))

    // Filtrar dataHeadBoardFilter por selectedProfessionId
    const filteredHeadBoard = dataHeadBoardFilter?.filter((item: any) => item.titulo.id_cabecera_detalle === selectedProfessionId);

    // Obtener el id_cabecera_detalle del primer elemento filtrado (asumiendo que todos tienen el mismo selectedProfessionId)
    const idTitulo = filteredHeadBoard?.length > 0 ? filteredHeadBoard[0]?.titulo.id_cabecera_detalle : null;

    // Filtrar empleados por selectedProfessionId y obtener una lista de objetos con id_empleado y nombres
    const doctorInfo = employee?.filter((item: any) => item.titulo.id_cabecera_detalle === selectedProfessionId && item.sede.id_sede === selectedSedeId)
        .map((item: any) => ({
            id_empleado: item.id_empleado,
            nombres: item.nombres
        }));

    // Formatear los datos en el objeto solicitado
    const formattedData: any = {
        id_titulo: idTitulo,
        doctors:
            doctorInfo?.map((doctor: any) => ({
                id_doctor: doctor.id_empleado,
                name: doctor.nombres,
            })),

        procedures: filteredRoomProceduresWithMatch?.map((item: any) => (item.procedimiento_personales_detalle.map((detail: any) => ({
            id_proc: detail.procedimiento.id_procedimiento,
            name: detail.procedimiento.nombres
        }))))
    };

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const handleToggleEdit = () => {
        setIsEditable(!isEditable);
    };
    // ******
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
    const [selectedProcedure, setSelectedProcedure] = useState<number | null>(null);
    const [updateAppointment, { isLoading: appointmentLoad }] = useUpdateAppointmentMutation();

    const initialValues: DataDetailAppointment = {
        procedimiento: {
            id_procedimiento: dataDetailAppointmentById?.procedimiento.id_procedimiento
        },
        sala_tratamiento: {
            id_sala_tratamiento: dataDetailAppointmentById?.sala_tratamiento.id_sala_tratamiento
        },
        empresa: {
            id_empresa: dataDetailAppointmentById?.empresa.id_empresa || 1
        },
        usuario_registro: {
            id_usuario: dataDetailAppointmentById?.usuario_registro_id_usuario || 1
        },
        paciente: {
            id_paciente: dataDetailAppointmentById?.paciente.id_paciente,
        },
        sede: {
            id_sede: dataDetailAppointmentById?.sede.id_sede
        },
        fecha_cita: dataDetailAppointmentById?.fecha_cita,
        empleado: {
            id_empleado: dataDetailAppointmentById?.empleado.id_empleado
        },
        hora: {
            id_cabecera: 10,
            id_cabecera_detalle: dataDetailAppointmentById?.hora.id_cabecera_detalle,
            descripcion: dataDetailAppointmentById?.hora.descripcion,
            valor: dataDetailAppointmentById?.hora.valor
        },
        estado: dataDetailAppointmentById?.estado

    };
    const validationSchema = Yup.object({
        fecha_cita: Yup.date()
            // .min(new Date(), 'La fecha de cita debe de ser una fecha futura o presente'),
    });


    const handleSelectRoomHourAndDate = (hour: any, room: any, date: string, locale: any) => {
        formik.setValues({
            ...initialValues,
            sede: { id_sede: locale },
            fecha_cita: date,
            hora: {
                id_cabecera: 10,
                id_cabecera_detalle: hour?.id_cabecera_detalle,
                descripcion: hour?.descripcion,
                valor: hour?.valor,
            },
            sala_tratamiento: { id_sala_tratamiento: room.id_sala_tratamiento },
        });
    };

    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setSelectedDoctor(value);
        formik.setFieldValue('empleado.id_empleado', value);
    };

    const handleProcedureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setSelectedProcedure(value);
        formik.setFieldValue('procedimiento.id_procedimiento', value);
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if (dataDetailAppointmentById?.id_cita) {
                    console.log(values);
                    await updateAppointment({ appointmentId: dataDetailAppointmentById?.id_cita, appointmentData: values }).unwrap();
                    console.log("SE ACTUALIZO CORRECTAMENTE!");
                    refetch();
                    refetchAppointment()
                    // router.push("/dash-admin/appointments/appointment-calendar");
                } else {
                    console.error("id_cita is missing");
                }
            } catch (error) {
                console.error("Error updating appointment:", error);
            }
        }
    });
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {/*  */}
            <form onSubmit={formik.handleSubmit} className="col-span-1 md:col-span-1 p-6 border-b-2 md:border-r-2">
                <div className="grid grid-rows-1 md:grid-rows-2 gap-6">
                    <div className="flex flex-col">
                        <h1 className="text-gray-700 font-bold mb-1 text-xl">Informacion Actual</h1>

                        <label className="text-gray-700 font-semibold mb-1">Fecha de Cita</label>
                        <p className="text-gray-600 mb-2">{dataDetailAppointmentById.fecha_cita}</p>

                        <label className="text-gray-700 font-semibold mb-1">Hora</label>
                        <p className="text-gray-600 mb-2">{dataDetailAppointmentById.hora.descripcion}</p>

                        <label className="text-gray-700 font-semibold mb-1">Sala de Tratamiento</label>
                        <p className="text-gray-600 mb-2">{dataDetailAppointmentById.sala_tratamiento.nombres}</p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-gray-700 font-bold mb-1 text-xl">Seleccionado</h1>
                        <label className="text-gray-700 font-semibold mb-1">Hora  y Fecha</label>
                        <p className="text-gray-600 mb-2">{selectedHour?.descripcion} {selectedDate}</p>

                        <div className="mb-4">
                            <label htmlFor="empleado.id_empleado" className="text-gray-700 font-semibold mb-2">Especialista</label>
                            {isEditable ? (
                                <select
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    value={selectedDoctor ?? ''}
                                    onChange={handleDoctorChange}
                                >
                                    <option value="">Selecciona un especialista</option>
                                    {formattedData.doctors?.map((doctor: any) => (
                                        doctor.id_doctor !== 1 && (
                                            <option key={doctor.id_doctor} value={doctor.id_doctor}>
                                                {doctor.name}
                                            </option>
                                        )
                                    ))}
                                </select>
                            ) : (
                                <p className="text-gray-600">{dataDetailAppointmentById.empleado.nombres}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="procedimiento.id_procedimiento" className="text-gray-700 font-semibold mb-2">Procedimiento</label>
                            {isEditable ? (
                                <select
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    value={selectedProcedure ?? ''}
                                    onChange={handleProcedureChange}
                                >
                                    <option value="">Selecciona un procedimiento</option>
                                    {formattedData.procedures[0] && formattedData.procedures[0].length > 0 ? (
                                        formattedData.procedures[0].map((item: any) => (
                                            <option key={item.id_proc} value={item.id_proc}>
                                                {item.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled value="">
                                            No hay procedimientos disponibles
                                        </option>
                                    )}
                                </select>
                            ) : (
                                <p className="text-gray-600">{dataDetailAppointmentById.procedimiento.nombres}</p>
                            )}
                            <button
                                className={`mt-4 p-2 rounded-md ${isEditable ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-500 text-gray-300'}`}
                                type="button"
                                onClick={handleToggleEdit}
                            >
                                {isEditable ? 'Volver' : 'Cambiar'}
                            </button>
                        </div>
                    </div>
                </div>
                <button className='bg-blue-500 hover:bg-blue-600 mt-4 p-2 rounded-md text-white' type='submit'>
                    {appointmentLoad ? 'Guardando...' : 'Guardar'}
                </button>
            </form>
            {/*  */}
            <section className="col-span-1 md:col-span-1 p-6">
                <section className="bg-white p-4 mt-3 border rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <input
                            type="date"
                            // value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="location"
                            value={selectedSedeId}
                            onChange={handleSedeChange}
                            className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {sortedDataInfra?.map((infra: any, i: number) => (
                                <option key={i} value={infra.id_sede}>
                                    {infra.nombres}
                                </option>
                            ))}
                        </select>
                        <select
                            name="profession"
                            value={selectedProfessionId ?? ''}
                            onChange={handleProfessionChange}
                            className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {/* <option value="">Seleccione una profesión</option> */}
                            {title_employe.map(prof => (
                                <option key={prof.id_cabecera_detalle} value={prof.id_cabecera_detalle}>
                                    {prof.descripcion}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>
                <section className='w-full bg-white h-[30rem] overflow-auto mt-4'>
                    <section className='w-full p-4'>
                        <table className='w-[40rem] md:w-full bg-white rounded-lg'>
                            <thead>
                                <tr>
                                    <th className='px-4 py-2 border w-24'>Hora</th>
                                    {filteredRooms && filteredRooms.length > 0 ? (
                                        filteredRooms.map((room: any, i: number) => (
                                            <th key={i} className='px-4 py-2 border'>
                                                {room.nombres}
                                            </th>
                                        ))
                                    ) : (
                                        <th className='px-4 py-2 border'>No hay cuartos disponibles para esta sede</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour: any, i: number) => (
                                    <tr key={i}>
                                        <td className='border h-24 text-center w-10'>{hour.descripcion}</td>
                                        {filteredRooms && filteredRooms.length > 0 ? (
                                            filteredRooms.map((room: any, j: number) => {
                                                const filteredAppointment = filterAppointmentsByHourAndRoom(hour, room, selectedSedeId, selectedDate, selectedProfessionId);

                                                return (
                                                    <td
                                                        key={j}
                                                        className={`border h-20 w-52 cursor-pointer ${selectedCell && selectedCell.hour === hour && selectedCell.room === room ? 'bg-gray-200' : ''}`}
                                                        onClick={() => {
                                                            handleCellClick(hour, room);
                                                            handleSelectRoomHourAndDate(hour, room, selectedDate, selectedSedeId);
                                                        }}
                                                    >
                                                        {filteredAppointment ? (
                                                            <div className={`flex flex-col justify-between h-5/6 p-2 mx-1  ${filteredAppointment.item_color === 'Blue' ? 'bg-blue-300' : 'bg-orange-300'}`}>
                                                                <div className='flex flex-wrap items-center justify-between'>
                                                                    <div className='flex flex-col'>
                                                                        <h3 className='capitalize text-xs font-bold'>{filteredAppointment.item_patient_name.toLowerCase()}</h3>
                                                                        <span className='text-xs underline'>{filteredAppointment.item_procedure_name}</span>

                                                                    </div>

                                                                </div>
                                                                <div className='flex justify-between'>
                                                                    <div className='flex gap-2'>
                                                                        <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>
                                                                            {filteredAppointment.item_id_state_time === 35 ? 'N' : filteredAppointment.item_id_state_time === 36 ? 'A' : ''}
                                                                        </div>
                                                                        <div className='h-4 w-4 bg-white text-sm flex items-center justify-center'>R</div>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            `w-12 h-4 rounded-sm ${filteredAppointment.item_entrace && filteredAppointment.item_atention === null && filteredAppointment.item_exit === null ? 'bg-green-500' :
                                                                                filteredAppointment.item_entrace && filteredAppointment.item_atention && filteredAppointment.item_exit === null ? 'bg-yellow-300' :
                                                                                    filteredAppointment.item_entrace && filteredAppointment.item_atention && filteredAppointment.item_exit ? 'bg-blue-500' : 'bg-white'}`}
                                                                    >

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                        )}
                                                    </td>
                                                );
                                            })
                                        ) : (
                                            <td className=' border h-20 w-52 bg-gray-200 '></td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </section>
                </section>
            </section>

        </section>
    )
}
