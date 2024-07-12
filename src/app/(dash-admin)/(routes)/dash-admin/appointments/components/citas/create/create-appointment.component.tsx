"use client"
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAddAppointmentMutation } from './store/service';
import { Appointment } from './interface';
import { useGetRoomProcedureQuery } from '../../../../procedures/list/components/Rooms/store/get/service';
import { useAddPatientMutation } from '../../../../patients/create/store/service';
import { useGetPatientsQuery } from '../../../../patients/list/store/service';
import { DatatableComponent } from "@/components/datatable/";
import CreatePatientComponent from './components/patient/create/create-patient.component';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetLocationProcedureQuery } from '../../../../procedures/list/components/Location/store/get/service';
import { useGetPersonalProcedureQuery } from '../../../../procedures/list/components/Personal/store/get/service';

import { decodeToken } from "@/app/(dash-admin)/utils"

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

type FormattedProcedure = {
    id_proc: number;
    name_proc: string;
    rooms: { id_rooms: number; name_rooms: string }[];
};

export function CreateAppointmentComponent({
    hour, employee, date, closePopup, idTitle, refetch, location
}: Props) {

    const decoded = decodeToken({})
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
    const { data: dataLocationProcedure, isLoading: loadLocationProcedure, refetch: refetchLocationProcedure } = useGetLocationProcedureQuery({ limit: 300, page: 0, filter: '' });
    const { data: dataTitleProcedure, isLoading: loadEmployeeProcedure, refetch: refetchEmployeeProcedure } = useGetPersonalProcedureQuery({ limit: 300, page: 0, filter: '' })


    useEffect(() => {
        if (!loadRoomProcedures && !loadLocationProcedure && !loadEmployeeProcedure) {
            refetchRoomProcedure();
            refetchLocationProcedure();
            refetchEmployeeProcedure();
        }
    }, [loadRoomProcedures, loadLocationProcedure, loadEmployeeProcedure, refetchRoomProcedure, refetchLocationProcedure, refetchEmployeeProcedure])

    const roomProcedures = dataRoomProcedure?.data?.content;
    const locationProcedures = dataLocationProcedure?.data?.content;
    const titleProcedures = dataTitleProcedure?.data?.content;


    const [filteredProcedure, setFilteredProcedure] = useState<FormattedProcedure[]>([]);
    const [rooms, setRooms] = useState<{ id_rooms: number; name_rooms: string }[]>([]);

    const filteredProceduresKey = useMemo(() =>
        locationProcedures
            ?.filter((item: any) => item.sede.id_sede === location)
            ?.flatMap((item: any) => item.procedimiento_sede_detalle.map((detail: any) => detail.procedimiento.id_procedimiento)) || [],
        [locationProcedures, location]
    );

    const filteredTitleProcedures = useMemo(() =>
        titleProcedures
            ?.filter((data: any) => data.titulo.id_cabecera_detalle === idTitle)
            ?.flatMap((item: any) => item.procedimiento_personales_detalle.map((detail: any) => detail.procedimiento.id_procedimiento)) || [],
        [titleProcedures, idTitle]
    );

    const filteredRoomProceduresKey = useMemo(() =>
        roomProcedures
            ?.filter((item: any) => item.procedimiento_sala_detalle.some((detail: any) => detail.sala_tratamiento.sede.id_sede === location))
            ?.map((item: any) => item.procedimiento.id_procedimiento) || [],
        [roomProcedures, location]
    );

    const findIntersection = useCallback((array1: any[], array2: any[]) => {
        return array1.filter((value: any) => array2.includes(value));
    }, []);

    const combinedProcedures = useMemo(() =>
        findIntersection(filteredProceduresKey, findIntersection(filteredTitleProcedures, filteredRoomProceduresKey)),
        [filteredProceduresKey, filteredTitleProcedures, filteredRoomProceduresKey, findIntersection]
    );

    useEffect(() => {
        if (roomProcedures) {
            const filtered = roomProcedures.filter((item: any) =>
                combinedProcedures.includes(item.procedimiento.id_procedimiento)
            );

            const formattedProcedures: FormattedProcedure[] = filtered.map((proc: any) => ({
                id_proc: proc.procedimiento.id_procedimiento,
                name_proc: proc.procedimiento.nombres,
                rooms: proc.procedimiento_sala_detalle
                    .filter((roomsDetail: any) =>
                        roomsDetail.sala_tratamiento.sede.id_sede === location
                    )
                    .map((roomsDetail: any) => ({
                        id_rooms: roomsDetail.sala_tratamiento.id_sala_tratamiento,
                        name_rooms: roomsDetail.sala_tratamiento.nombres,
                    })),
            }));

            setFilteredProcedure(formattedProcedures);
        }
    }, [roomProcedures, combinedProcedures, location]);


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
                id_usuario: decoded?.id_usuario
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
            estado: true,
            estado_eliminado: false
        },
        validationSchema,
        onSubmit: async (values) => {
            // console.log('Form values:', values);
            try {
                console.log('Form values', values)
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
        const selectedProcedure = filteredProcedure.find(
            (proc) => proc.id_proc === Number(formik.values.procedimiento.id_procedimiento)
        );
        if (selectedProcedure) {
            setRooms(selectedProcedure.rooms);
        } else {
            setRooms([]);
        }
    }, [formik.values.procedimiento.id_procedimiento, filteredProcedure]);


    // ***** Deben de estar vacios
    const headers = (
        <div></div>
    );
    const paginationControls = {
        perPageOptions: [10, 20, 30, 40, 50],
        perPage,
        setPerPage,
        currentPage,
        setCurrentPage
    };

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
                                // data: dataPatient, error: errorPatient, isLoading: loadPatient
                                <DatatableComponent
                                    data={dataPatient?.data}
                                    isLoading={loadPatient}
                                    error={errorPatient}
                                    columns={columns}
                                    paginationControls={paginationControls}
                                    filter={filter}
                                    setFilter={setFilter}
                                    headers={headers}
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

                                    {filteredProcedure.map((item: any) => (
                                        <option key={item.id_proc} value={item.id_proc}>{item.name_proc}</option>
                                    ))}
                                </select>
                                {formik.touched.procedimiento?.id_procedimiento && formik.errors.procedimiento?.id_procedimiento ? (
                                    <div>{formik.errors.procedimiento.id_procedimiento}</div>
                                ) : null}
                            </div>

                            <div className='hidde md:block'></div>
                            <div className='border border-gray-300 text-left p-2 hidden'>
                                <label>Sala Tratamiento</label>
                                <select
                                    name="sala_tratamiento.id_sala_tratamiento"
                                    className='w-full py-2 outline-none px-1 bg-gray-100 font-semibold'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.sala_tratamiento?.id_sala_tratamiento}
                                    disabled
                                >
                                    {rooms.map((room: any) => (
                                        <option key={room.id_rooms} value={room.id_rooms}>{room.name_rooms}</option>
                                    ))}
                                </select>
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
