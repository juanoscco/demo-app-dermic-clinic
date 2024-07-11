"use client"
import React, { useState, useEffect } from 'react'

import { useAddExtraAppointmentMutation } from './store/service';
import { useGetRoomProcedureQuery } from '../../../../procedures/list/components/Rooms/store/get/service';
import { useAddPatientMutation } from '../../../../patients/create/store/service';
import { useGetPatientsQuery } from '../../../../patients/list/store/service';
import { DatatableComponent } from "@/components/datatable/";
import { useGetEmployeesQuery } from '../../../../persons/list/store/service';
import { PopupUpdate } from '@/components/popup/popup-update';
import { decodeToken } from "@/app/(dash-admin)/utils";

import CreatePatientComponent from '../../citas/create/components/patient/create/create-patient.component';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFilteredProcedures } from '../../citas/create/hooks';
import { useGetLocationProcedureQuery } from '../../../../procedures/list/components/Location/store/get/service';
import { useGetPersonalProcedureQuery } from '../../../../procedures/list/components/Personal/store/get/service';

interface Props {
    close?: any
    location?: any
    refetch?: any
    date?: any
}

const validationSchema = Yup.object({
    procedimiento: Yup.object().shape({
        id_procedimiento: Yup.number().required('Required'),
    }),
    sala_tratamiento: Yup.object().shape({
        id_sala_tratamiento: Yup.number().required('Required'),
    }),
    paciente: Yup.object().shape({
        id_paciente: Yup.number().required('Required'),
    }),
    empresa: Yup.object().shape({
        id_empresa: Yup.number().required('Required'),
    }),
    sede: Yup.object().shape({
        id_sede: Yup.number().required('Required'),
    }),
    fecha_cita: Yup.string().required('Required'),
    empleado: Yup.object().shape({
        id_empleado: Yup.number().required('Required'),
    }),
});

export function CreateAppointmentExtraComponent({
    close, location, refetch, date
}: Props) {
    /**
        * Hooks
        * Aqui estn los steps y los active tabs 
    */

    const decoded = decodeToken({});
    const [step, setStep] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    // Patients
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');

    const nextStep = () => {
        setStep(step + 1);
    };

    const previousStep = () => {
        setStep(step - 1);
    };

    const [addPatient, { data: dataAddPatient, isLoading: loadAddPatient }] = useAddPatientMutation();
    const [addExtraAppointment, { isLoading: loadExtraAppointment }] = useAddExtraAppointmentMutation();
    const { data: getPatients, isLoading: loadPatients, refetch: refetchPatients, error: errorPatient } = useGetPatientsQuery({ page: currentPage - 1, limit: perPage, filter: filter });

    const { data: getEmployees, isLoading: loadEmployees, refetch: refetchEmployess } = useGetEmployeesQuery({ page: 0, limit: 12000, filter: '' });

    // const patients = getPatients?.data?.content;
    const employees = getEmployees?.data?.content;

    // ****************
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


    const formik = useFormik({
        initialValues: {
            procedimiento: { id_procedimiento: 1 },
            sala_tratamiento: { id_sala_tratamiento: 1 },
            paciente: { id_paciente: 1, nombres: '' },
            empresa: { id_empresa: 1 },
            usuario_registro: { id_usuario: decoded?.id_usuario },
            sede: { id_sede: location },
            fecha_cita: date,
            empleado: { id_empleado: 0 },
            estado: true,
            estado_eliminado: false
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('Form data', values);
                await addExtraAppointment(values);
                refetch();
                close();
            } catch (error) {
                console.error('Error', error);
            }
        },
    });

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


    // ********
    const paginationControls = {
        perPageOptions: [10, 20, 30, 40, 50],
        perPage,
        setPerPage,
        currentPage,
        setCurrentPage
    };

    const headers = (
        <div className='flex items-center gap-3 md:flex-row flex-col'></div>
    );

    // ************
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [rooms, setRooms] = useState<{ id_rooms: number; name_rooms: string }[]>([]);

    const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value);
        formik.handleChange(event);
        const employee = employees.find((emp: any) => emp.id_empleado === selectedId);
        setSelectedEmployee(employee);
    };

    const idTitle = selectedEmployee?.titulo?.id_cabecera_detalle

    const { filteredProcedure } = useFilteredProcedures({
        location,
        idTitle,
        locationProcedures,
        titleProcedures,
        roomProcedures,
    })
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

    // *************
    return (
        <PopupUpdate>
            <div className='flex justify-between py-4'>
                <h1 className='font-bold text-xl'>Agregar cita Extra</h1>
                <button onClick={close} className='text-xl'>x</button>
            </div>

            {step === 1 &&
                (
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
                                loadingPatient={loadAddPatient}
                                refetch={refetchPatients}
                                nextStep={nextStep}
                            />
                        )}
                        {activeTab === 2 && (

                            <DatatableComponent
                                data={getPatients?.data}
                                isLoading={loadPatients}
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <div className='border border-gray-300 text-left p-2'>
                        <label>Especialista</label>
                        <select
                            name="empleado.id_empleado"
                            onChange={handleEmployeeChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.empleado.id_empleado}
                            className='w-full py-2 outline-none px-1'
                        >
                            <option value="">Seleccione un Especialista</option>
                            {employees
                                ?.filter((item: any) => item.titulo.id_cabecera_detalle !== 7 && item.titulo.id_cabecera_detalle !== 10)
                                ?.map((employee: any) => (
                                    <option key={employee.id_empleado} value={employee.id_empleado}>
                                        {employee.nombres}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.empleado?.id_empleado && formik.errors.empleado?.id_empleado ? (
                            <div>{formik.errors.empleado.id_empleado}</div>
                        ) : null}
                    </div>
                    <div className='border border-gray-300 text-left p-2'>
                        <label>Titulo</label>
                        <input
                            type="text"
                            className='w-full py-2 outline-none px-1'
                            value={selectedEmployee?.titulo?.descripcion} readOnly disabled />
                    </div>
                    <div className='border border-gray-300 text-left p-2'>
                        <label htmlFor="paciente.id_paciente">Paciente</label>
                        <input
                            id="paciente.nombres"
                            name="paciente.nombres"
                            className='w-full py-2 outline-none px-1'

                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.paciente.nombres}
                            disabled
                        />
                        {formik.touched.paciente?.id_paciente && formik.errors.paciente?.id_paciente ? (
                            <div className="text-red-600">{formik.errors.paciente.id_paciente}</div>
                        ) : null}
                    </div>
                    <div className='border border-gray-300 text-left p-2'>
                        <label>Procedimiento</label>
                        <select
                            name="procedimiento.id_procedimiento"
                            className='w-full py-2 outline-none px-1'

                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.procedimiento.id_procedimiento}
                        >
                            <option value="">Seleccione un procedimiento</option>
                            {filteredProcedure
                            // ?.filter((item:any) => item.id_proc === 2 && item.id_proc === 1)
                            ?.map(proc => (
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
                            className='w-full py-2 outline-none px-1 bg-gray-100'
                            disabled
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.sala_tratamiento.id_sala_tratamiento}
                        >
                            {rooms.map(room => (
                                <option key={room.id_rooms} value={room.id_rooms}>
                                    {room.name_rooms}
                                </option>
                            ))}
                        </select>
                        {formik.touched.sala_tratamiento?.id_sala_tratamiento && formik.errors.sala_tratamiento?.id_sala_tratamiento ? (
                            <div>{formik.errors.sala_tratamiento.id_sala_tratamiento}</div>
                        ) : null}
                    </div>


                    <div className='border border-gray-300 text-left p-2'>
                        <label>Fecha Cita</label>
                        <input
                            name="fecha_cita"
                            type="date"
                            className='w-full py-2 outline-none px-1'

                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fecha_cita}
                        />
                        {/* {formik.touched.fecha_cita && formik.errors.fecha_cita ? <div>{formik.errors.fecha_cita}</div> : null} */}
                    </div>


                    <button
                        type="button"
                        onClick={previousStep}
                        className="bg-gray-500 text-white rounded-sm hover:bg-gray-700"
                    >
                        Atrás
                    </button>
                    <button
                        className='w-full bg-[#82b440] shadow-xl p-3 rounded-sm text-white'
                        type="submit"
                    >
                        {loadExtraAppointment ? 'Enviando...' : 'Guardar'}</button>
                </form>
            )}
        </PopupUpdate>
    )
}
