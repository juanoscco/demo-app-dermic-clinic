"use client"
import React, { useState, useEffect } from 'react'
import { useGetAppointmentListQuery } from '../../../../components/citas/list/store/service';
import { useGetInfrastructureQuery } from '@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/store/service';
import { useGetRoomProcedureQuery } from '@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/get/service';
import { useGetEmployeesQuery } from '@/app/(dash-admin)/(routes)/dash-admin/persons/list/store/service';
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateAppointmentMutation } from '../../../../components/citas/update/store/service';
import { DeleteAppointmentComponents } from '../../../../components/citas/delete/components';

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
const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};
export default function CalendarComponent({ dataDetailAppointmentById, refetch }: Props) {
    // *******
    const { data: dataAppointment, isLoading: loadAppointmentRoom, refetch: refetchAppointment } = useGetAppointmentListQuery({ limit: 150000, page: 0, filter: '' })
    const { data: dataInfra, isLoading: loadInfra, refetch: refetchInfra } = useGetInfrastructureQuery({ limit: 20, page: 0, filter: '' })
    const { data: dataRoomProcedure, isLoading: loadRoomProcedures, refetch: refetchRoomProcedure } = useGetRoomProcedureQuery({ limit: 300, page: 0, filter: '' });
    const { data: dataEmployee, isLoading: loadEmployee, refetch: refetchEmployee } = useGetEmployeesQuery({ limit: 20000, page: 0, filter: '' });

    const roomProcedures = dataRoomProcedure?.data?.content
    // ********
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedSedeId, setSelectedSedeId] = useState<number | null | any>(1);
    const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(6);

    const handleProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const professionId = parseInt(event.target.value);
        const selectedProfession = title_employe.find(prof => prof.id_cabecera_detalle === professionId);
        if (selectedProfession) {
            setSelectedProfessionId(professionId);
        }
    };

    const handleSedeChange = (event: any) => {
        setSelectedSedeId(parseInt(event.target.value, 10));
    };


    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };
    const sortedDataInfra = dataInfra?.data?.content?.slice().sort((a: any, b: any) => {
        return a.codigo.localeCompare(b.codigo);
    });

    const filteredEmployee = dataEmployee?.data?.content.filter((item: any) => item.sede.id_sede === parseInt(selectedSedeId) && item.titulo.id_cabecera_detalle === selectedProfessionId);
    const appointments = dataAppointment?.data?.content;

    const filteredAppointments = appointments?.map((item: any) => ({
        id_appointment: item.id_cita,
        id_hour: item.horario.id_cabecera_detalle,
        hour_desc: item.horario.descripcion,
        id_employee: item.empleado.id_empleado,
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

    const filterAppointmentsByHourAndEmployee = (hour: any, employee: any, location: any, date: any, profession: any) => {
        return filteredAppointments?.find((item: any) =>
            item.id_hour === hour.id_cabecera_detalle &&
            item.id_employee === employee.id_empleado &&
            item.id_location === location &&
            item.item_date === date &&
            item.item_profession === profession
        );
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchInfra();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchInfra]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchEmployee();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchEmployee]);

    // ******
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [selectedProcedure, setSelectedProcedure] = useState<number | null>(null);
    const [updateAppointment, { isLoading: appointmentLoad }] = useUpdateAppointmentMutation();
    const [selectedCell, setSelectedCell] = useState<{ hour: any, employee: any } | null>(null);
    const [selectedHour, setSelectedHour] = useState<any>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const handleToggleEdit = () => {
        setIsEditable(!isEditable);
    };
    const handleCellClick = (hour: any, employee: any) => {
        setSelectedHour(hour);
        setSelectedEmployee(employee);
        setSelectedCell({ hour, employee });

    };
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


    const handleSelectEmployeeHourAndDate = (hour: any, employee: any, date: string, locale: any) => {
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
            empleado: { id_empleado: employee.id_empleado },
            usuario_registro: {
                id_usuario: employee.usuario.id_usuario
            },
        });
    };

    const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setSelectedRoom(value);
        formik.setFieldValue('sala_tratamiento.id_sala_tratamiento', value);
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
                    console.error("la cita no se encuentra");
                }
            } catch (error) {
                console.error("Erro en actualizar la cita:", error);
            }
        }
    });


    // ****
    type FormattedProcedure = {
        id_proc: number;
        name_proc: string;
        rooms: { id_rooms: number; name_rooms: string }[];
    };
    const [filteredProcedure, setFilteredProcedure] = useState<FormattedProcedure[]>([]);
    const [rooms, setRooms] = useState<{ id_rooms: number; name_rooms: string }[]>([]);

    useEffect(() => {
        if (!loadRoomProcedures && roomProcedures) {
            const filtered = roomProcedures.filter((item: any) =>
                item.procedimiento_sala_detalle.some(
                    (detail: any) => detail.sala_tratamiento.sede.id_sede === selectedSedeId
                )
            );

            const formattedProcedures: FormattedProcedure[] = filtered.map((proc: any) => ({
                id_proc: proc.procedimiento.id_procedimiento,
                name_proc: proc.procedimiento.nombres,
                rooms: proc.procedimiento_sala_detalle
                    .filter(
                        (roomsDetail: any) =>
                            roomsDetail.sala_tratamiento.sede.id_sede === selectedSedeId
                    )
                    .map((roomsDetail: any) => ({
                        id_rooms: roomsDetail.sala_tratamiento.id_sala_tratamiento,
                        name_rooms: roomsDetail.sala_tratamiento.nombres,
                    })),
            }));

            setFilteredProcedure(formattedProcedures);
        }
    }, [loadRoomProcedures, roomProcedures, selectedSedeId]);

    useEffect(() => {
        const selectedProcedure = filteredProcedure.find(
            (proc) => proc.id_proc === Number(formik.values.procedimiento.id_procedimiento)
        );
        if (selectedProcedure) {
            setRooms(selectedProcedure.rooms);
        } else {
            setRooms([]);
        }
    }, [formik.values.procedimiento.id_procedimiento, filteredProcedure]);

    /**
     * 
     * DELETE APPOINTMENT
     */
    const [showPopupDelete, setShowPopupDelete] = useState(false);

    const togglePopupDelete = () => {
        
        setShowPopupDelete(!showPopupDelete)
    }
    /**
     * 
     * END DELETE APPOINTMENT
     */

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {/*  */}
            <form onSubmit={formik.handleSubmit} className=" p-6 border-b-2 md:border-r-2">
                <div className="flex flex-col gap-5">
                    <div >
                        <h1 className="text-gray-700 font-bold mb-1 text-xl">Informacion Actual</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="border-b border-gray-300 pb-2">
                                <label className="text-gray-700 font-semibold mb-1">Fecha de Cita</label>
                                <p className="text-gray-600 mb-2">{dataDetailAppointmentById.fecha_cita}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-2">
                                <label className="text-gray-700 font-semibold mb-1">Hora</label>
                                <p className="text-gray-600 mb-2">{dataDetailAppointmentById.hora.descripcion}</p>
                            </div>
                            <div className="border-b border-gray-300 pb-2">
                                <label className="text-gray-700 font-semibold mb-1">Sala de Tratamiento</label>
                                <p className="text-gray-600 mb-2">{dataDetailAppointmentById.sala_tratamiento.nombres}</p>
                            </div>

                        </div>
                    </div>
                    <div>
                        <h1 className="text-gray-700 font-bold mb-1 text-xl">Seleccionado</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                            <div className='border border-gray-300 text-left p-2'>
                                <h3>Hora</h3>
                                <p className="text-gray-600 mb-2">{selectedHour?.descripcion ? selectedHour?.descripcion : 'Seleccione una de las casillas'}</p>
                            </div>
                            <div className='border border-gray-300 text-left p-2'>
                                <h3>Fecha</h3>
                                <p className="text-gray-600 mb-2">{selectedDate}</p>
                            </div>
                            <div className='border border-gray-300 text-left p-2'>
                                <label className="text-gray-700 font-semibold mb-1">Empleado</label>
                                <p className="text-gray-600 mb-2">{selectedEmployee?.nombres ? selectedEmployee?.nombres : 'Seleccione una de las casillas'}</p>
                            </div>

                            <div className='border border-gray-300 text-left p-2'>
                                <label>Sala Tratamiento</label>
                                {isEditable ? (
                                    <select
                                        className='w-full py-2 outline-none px-1'
                                        value={selectedRoom ?? ''}
                                        onChange={handleRoomChange}
                                    >
                                        <option value="">Selecciona un especialista</option>
                                        {rooms.map(room => (
                                            <option key={room.id_rooms} value={room.id_rooms}>
                                                {room.name_rooms}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-gray-600">{dataDetailAppointmentById.empleado.nombres}</p>
                                )}
                            </div>

                            <div className='border border-gray-300 text-left p-2'>
                                <label htmlFor="procedimiento.id_procedimiento" className="text-gray-700 font-semibold mb-2">Procedimiento</label>
                                {isEditable ? (
                                    <select
                                        className='w-full py-2 outline-none px-1'
                                        value={selectedProcedure ?? ''}
                                        onChange={handleProcedureChange}
                                    >
                                        <option value="">Seleccione un procedimiento</option>
                                        {filteredProcedure.map(proc => (
                                            <option key={proc.id_proc} value={proc.id_proc}>
                                                {proc.name_proc}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-gray-600">{dataDetailAppointmentById.procedimiento.nombres}</p>
                                )}
                            </div>
                            <button
                                className={`rounded-md ${isEditable ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-500 text-white'}`}
                                type="button"
                                onClick={handleToggleEdit}
                            >
                                {isEditable ? 'Volver' : 'Cambiar'}
                            </button>
                            <button
                                className='w-full bg-red-500  shadow-xl p-3 rounded-sm text-white'
                                onClick={() => togglePopupDelete()}
                            >
                                Eliminar
                            </button>

                            <button
                                className='w-full bg-[#82b440] shadow-xl p-3 rounded-sm text-white'
                                type='submit'>
                                {appointmentLoad ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                        {showPopupDelete && (
                            <DeleteAppointmentComponents
                                id={dataDetailAppointmentById.id_cita}
                                onClose={togglePopupDelete}
                                update={refetchAppointment}
                            />
                        )}
                    </div>
                </div>

            </form>
            {/*  */}
            <section className="col-span-1 md:col-span-1 p-6">
                <section className="bg-white p-4 mt-3 border rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <input
                            type="date"
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

                <section className='w-full bg-white h-[30rem] overflow-x-auto mt-5'>
                    {/* TABLA CALENDARIO */}
                    <section className='w-full p-4'>
                        <table className='w-full bg-white rounded-lg'>
                            <thead>
                                <tr>
                                    <th className='px-4 py-2 border w-24'>Hora</th>
                                    {filteredEmployee && filteredEmployee.length > 0 ? (
                                        filteredEmployee
                                            .filter((employee: any) => employee.estado)
                                            .map((employee: any) => (
                                                <th key={employee.id_empleado} className='px-4 py-2 border'>
                                                    {employee.nombres}
                                                </th>
                                            ))
                                    ) : (
                                        <th className='px-4 py-2 border'>No hay doctores disponibles para esta sede</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour: any, i: number) => (
                                    <tr key={i}>
                                        <td className='border h-24 text-center w-10'>{hour.descripcion}</td>
                                        {filteredEmployee && filteredEmployee.length > 0 ? (
                                            filteredEmployee
                                                .filter((employee: any) => employee.estado)
                                                .map((employee: any, j: number) => {
                                                    const filteredAppointment = filterAppointmentsByHourAndEmployee(hour, employee, selectedSedeId, selectedDate, selectedProfessionId);

                                                    return (
                                                        <td
                                                            key={j}
                                                            className={`border h-20 w-52 cursor-pointer ${selectedCell && selectedCell.hour === hour && selectedCell.employee === employee ? 'bg-gray-200' : ''}`}
                                                            onClick={() => {
                                                                handleCellClick(hour, employee);
                                                                handleSelectEmployeeHourAndDate(hour, employee, selectedDate, selectedSedeId)
                                                            }}
                                                        >
                                                            {filteredAppointment ? (
                                                                // item_color
                                                                <div
                                                                    className={`flex flex-col justify-between h-5/6 p-2 mx-1
                                                             ${filteredAppointment.item_color === 'Blue' ? 'bg-blue-300' : 'bg-orange-300'}`}

                                                                >
                                                                    <div className='flex flex-wrap items-center justify-between'>
                                                                        <div className='flex flex-col '>
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
