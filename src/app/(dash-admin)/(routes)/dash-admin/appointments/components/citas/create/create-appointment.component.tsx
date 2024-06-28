"use client"
import React, { useState, useEffect } from 'react'
import { useAddAppointmentMutation } from './store/service';
import { Appointment } from './interface';
import { useGetRoomProcedureQuery } from '../../../../procedures/list/components/Rooms/store/get/service';
import { useAddPatientMutation } from '../../../../patients/create/store/service';
import { useGetPatientsQuery } from '../../../../patients/list/store/service';
import { DatatableComponent } from "@/components/datatable/";
import CreatePatientComponent from './components/patient/create/create-patient.component';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    hour?: any;
    employee?: any;
    date?: any;
    location?: any;
    closePopup?: any;
    idTitle?: any;
    refetch?: any;
}

const validationSchema = Yup.object({
    procedimiento: Yup.object({
        id_procedimiento: Yup.number().required('Requerido')
    }),
    empresa: Yup.object({
        id_empresa: Yup.number().required('Requerido')
    }),
    usuario_registro: Yup.object({
        id_usuario: Yup.number().required('Requerido')
    }),
    paciente: Yup.object({
        id_paciente: Yup.number().required('Requerido')
    }),
    sede: Yup.object({
        id_sede: Yup.number().required('Requerido')
    }),
    fecha_cita: Yup.date().required('Requerido'),
    sala_tratamiento: Yup.object().shape({
        id_sala_tratamiento: Yup.number().required('Required'),
    }),
    hora: Yup.object({
        descripcion: Yup.string().required('Requerido')
    }),
    estado: Yup.boolean().required('Requerido')
});
export function CreateAppointmentComponent({
    hour, employee, date, closePopup, idTitle, refetch, location
}: Props) {

    /**
     * 
     */
    const [step, setStep] = useState(1);
    // Tabview
    const [activeTab, setActiveTab] = useState(1);

    // ****
    // console.log(employee);
    // Posts
    const [addAppointment, { isLoading: loadAddAppointment }] = useAddAppointmentMutation();
    const [addPatient, { isLoading: loadingAddPatient, data: dataAddPatient, error: errorAddPatient }] = useAddPatientMutation();

    // *******
    const { data: dataRoomProcedure, isLoading: loadRoomProcedures, refetch: refetchRoomProcedure } = useGetRoomProcedureQuery({ limit: 300, page: 0, filter: '' });

    const roomProcedures = dataRoomProcedure?.data?.content
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchRoomProcedure();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchRoomProcedure]);

    // *****
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [filter, setFilter] = useState('');
    const { data: dataPatient, error: errorPatient, isLoading: loadPatient, refetch: refetchPatient } = useGetPatientsQuery({ limit: perPage, page: currentPage - 1, filter });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchPatient();
        }, 100);

        return () => clearTimeout(delayDebounceFn);
    }, [filter, refetchPatient]);

    const nextStep = () => {
        setStep(step + 1);
    };

    const previousStep = () => {
        setStep(step - 1);
    };

    const formik = useFormik<Appointment>({
        initialValues: {
            procedimiento: {
                id_procedimiento: 1
            },
            sala_tratamiento: {
                id_sala_tratamiento: 1
            },
            empresa: {
                id_empresa: 1
            },
            usuario_registro: {
                id_usuario: employee.usuario.id_usuario
            },
            paciente: {
                id_paciente: 0,
                nombres: ''
            },
            sede: {
                id_sede: location
            },
            fecha_cita: date,
            empleado: {
                id_empleado: employee.id_empleado,
            },
            hora: {
                id_cabecera: 10,
                id_cabecera_detalle: hour?.id_cabecera_detalle,
                descripcion: hour?.descripcion,
                valor: ""
            },
            estado: true
        },
        validationSchema,
        onSubmit: async (values) => {
            // console.log('Form values:', values);
            try {
                await addAppointment(values);
                refetch();
                closePopup();
            } catch (error) {
                console.error(error)
            }
        },
    });
    const columns = [
        {
            title: 'Paciente',
            displayName: 'Nombre del Paciente',
            field: 'nombres',
            render: (fieldValue: any, item: any) => (
                <div>
                    <h1>{fieldValue.toLowerCase()}</h1>
                    <span>{item.numero_documento_identidad}</span>
                </div>
            )
        },
        {
            title: 'Acciones',
            displayName: 'Acción',
            field: 'id_paciente',
            render: (fieldValue: any, item: any) => (
                <button className='bg-gray-200 rounded-md p-1' onClick={() => handleSelect(fieldValue, item.nombres)}>
                    Seleccionar
                </button>
            ),
        },
    ];

    const handleSelect = (idPatient: number, name: string) => {
        formik.setValues((prevValues) => ({
            ...prevValues,
            paciente: {
                id_paciente: idPatient,
                nombres: name
            }
        }));
        nextStep();
    };

    useEffect(() => {
        if (dataAddPatient?.data?.id_paciente) {
            formik.setValues((prevValues: any) => ({
                ...prevValues,
                paciente: {
                    id_paciente: dataAddPatient.data.id_paciente,
                    nombres: dataAddPatient.data.nombres
                }
            }));
        }
    }, [dataAddPatient, formik.setFieldValue]);

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
                    (detail: any) => detail.sala_tratamiento.sede.id_sede === location
                )
            );

            const formattedProcedures: FormattedProcedure[] = filtered.map((proc: any) => ({
                id_proc: proc.procedimiento.id_procedimiento,
                name_proc: proc.procedimiento.nombres,
                rooms: proc.procedimiento_sala_detalle
                    .filter(
                        (roomsDetail: any) =>
                            roomsDetail.sala_tratamiento.sede.id_sede === location
                    )
                    .map((roomsDetail: any) => ({
                        id_rooms: roomsDetail.sala_tratamiento.id_sala_tratamiento,
                        name_rooms: roomsDetail.sala_tratamiento.nombres,
                    })),
            }));

            setFilteredProcedure(formattedProcedures);
        }
    }, [loadRoomProcedures, roomProcedures, location]);

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

    return (
        <div
            className="fixed inset-0  flex justify-end items-center bg-black bg-opacity-50"
        >
            <div
                className='bg-white p-4 w-full  md:w-3/6  rounded-s-xl shadow-lg max-h-full h-full overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-xl font-bold">Crear cita</h2>
                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                        Cerrar
                    </button>
                </div>
                <div className='flex justify-between'>
                    <h1>Hora: {hour?.descripcion}</h1>
                    <span>{date}</span>
                </div>
                <div >
                    {/* Steps */}
                    {step === 1 && (
                        <div>
                            {/* Tabs headers */}
                            <div className="flex border-b">
                                <button
                                    className={`p-4 ${activeTab === 1 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab(1)}
                                >
                                    Nuevo
                                </button>
                                <button
                                    className={`p-4 ${activeTab === 2 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab(2)}
                                >
                                    Antiguo
                                </button>
                            </div>

                            {activeTab === 1 && (
                                <CreatePatientComponent
                                    addPatient={addPatient}
                                    loadingPatient={loadingAddPatient}
                                    refetch={refetchPatient}
                                    nextStep={nextStep}
                                />
                            )}
                            {activeTab === 2 && (
                                <DatatableComponent
                                    data={dataPatient?.data}
                                    isLoading={loadPatient}
                                    error={errorPatient}
                                    columns={columns}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    setFilter={setFilter}
                                    filter={filter}
                                />
                            )}
                        </div>
                    )}
                    {step === 2 && (
                        <form
                            onSubmit={formik.handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                        >
                            <div
                                className='border border-gray-300 text-left p-2'

                            >
                                <label htmlFor="paciente.id_paciente">Paciente</label>
                                <input
                                    id="paciente.nombres"
                                    name="paciente.nombres"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.paciente.nombres}
                                    className='w-full py-2 outline-none px-1'
                                    disabled
                                />
                                {formik.touched.paciente?.id_paciente && formik.errors.paciente?.id_paciente ? (
                                    <div className="text-red-600">{formik.errors.paciente.id_paciente}</div>
                                ) : null}
                            </div>
                            <div
                                className='border border-gray-300 text-left p-2'

                            >
                                <label htmlFor="">Especialista</label>
                                <input
                                    className='w-full py-2 outline-none px-1'
                                    readOnly
                                    type="text" value={employee.nombres} />
                            </div>

                            <div
                                className='border border-gray-300 text-left p-2'
                            >
                                <label>Procedimiento</label>
                                <select
                                    name="procedimiento.id_procedimiento"
                                    className='w-full py-2 outline-none px-1'

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.procedimiento.id_procedimiento}
                                >
                                    <option value="">Seleccione un procedimiento</option>
                                    {filteredProcedure.map(proc => (
                                        <option key={proc.id_proc} value={proc.id_proc}>
                                            {proc.name_proc}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.procedimiento?.id_procedimiento && formik.errors.procedimiento?.id_procedimiento ? (
                                    <div>{formik.errors.procedimiento.id_procedimiento}</div>
                                ) : null}
                            </div>
                            <div className='border border-gray-300 text-left p-2'>
                                <label>Sala Tratamiento</label>
                                <select
                                    name="sala_tratamiento.id_sala_tratamiento"
                                    className='w-full py-2 outline-none px-1'

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.sala_tratamiento?.id_sala_tratamiento}
                                >
                                    <option value="">Seleccione una sala</option>
                                    {rooms.map(room => (
                                        <option key={room.id_rooms} value={room.id_rooms}>
                                            {room.name_rooms}
                                        </option>
                                    ))}
                                </select>
                                {/* {formik.touched.sala_tratamiento?.id_sala_tratamiento && formik.errors.sala_tratamiento?.id_sala_tratamiento ? (
                                    <div>{formik.errors.sala_tratamiento.id_sala_tratamiento}</div>
                                ) : null} */}
                            </div>
                            <button
                                type="button"
                                onClick={previousStep}
                                className="bg-gray-500 text-white px-4 py-2 rounded-sm hover:bg-gray-700"
                            >
                                Atrás
                            </button>
                            <button
                                type="submit"
                                className='w-full bg-[#82b440] shadow-xl p-3 rounded-sm text-white'
                            >
                                {loadAddAppointment ? "Creando..." : "Crear"}
                            </button>

                        </form>
                    )}
                </div>

            </div>
        </div>
    )
}
