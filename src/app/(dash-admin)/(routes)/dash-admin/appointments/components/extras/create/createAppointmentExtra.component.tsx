"use client"
import React, { useState, useEffect } from 'react'

import { useAddExtraAppointmentMutation } from './store/service';
import { useGetRoomProcedureQuery } from '../../../../procedures/list/components/Rooms/store/get/service';
import { useAddPatientMutation } from '../../../../patients/create/store/service';
import { useGetPatientsQuery } from '../../../../patients/list/store/service';
import { DatatableComponent } from "@/components/datatable/";
import { useGetEmployeesQuery } from '../../../../persons/list/store/service';
import CreatePatientComponent from '../../citas/create/components/patient/create/create-patient.component';
import { PopupUpdate } from '@/components/popup/popup-update';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    close?: any
    location?: any
    refetch?:any
    date?:any
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
    usuario_registro: Yup.object().shape({
        id_usuario: Yup.number().required('Required'),
    }),
    sede: Yup.object().shape({
        id_sede: Yup.number().required('Required'),
    }),
    fecha_cita: Yup.string().required('Required'),
    empleado: Yup.object().shape({
        id_empleado: Yup.number().required('Required'),
    }),
    estado: Yup.boolean().required('Required'),
});

export function CreateAppointmentExtraComponent({
    close, location, refetch, date
}: Props) {

    const [addPatient, { data: dataAddPatient, isLoading: loadAddPatient }] = useAddPatientMutation();
    const [addExtraAppointment, { isLoading: loadExtraAppointment }] = useAddExtraAppointmentMutation();
    const { data: getPatients, isLoading: loadPatients, refetch: refetchPatients, error: errorPatient } = useGetPatientsQuery({ page: 0, limit: 12000, filter: '' });
    const { data: getEmployees, isLoading: loadEmployees, refetch: refetchEmployess } = useGetEmployeesQuery({ page: 0, limit: 12000, filter: '' });
    const { data: getRoomProcedures, isLoading: loadRoomProcedures, refetch: refetchRoomProcedures } = useGetRoomProcedureQuery({ page: 0, limit: 13000, filter: '' });

    // const patients = getPatients?.data?.content;
    const employees = getEmployees?.data?.content;
    const roomProcedures = getRoomProcedures?.data?.content;


    // const filteredEmployee = employees?.filter((employee: any) => employee.sede.id_sede === location)
    // const dataEmployeeFiltered = filteredEmployee?.map((item:any) => ({
    //     id_employee: item.id_empleado,
    //     name_employee: item.nombres,
    //     id_username: item.usuario.id_usuario,
    //     name_user: item.usuario.username
    // }))
    // console.log(dataEmployeeFiltered);
    /**
     * Hooks
     * Aqui estn los steps y los active tabs 
     */
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


    const formik = useFormik({
        initialValues: {
            procedimiento: { id_procedimiento: 1 },
            sala_tratamiento: { id_sala_tratamiento: 1 },
            paciente: { id_paciente: 1, nombres: '' },
            empresa: { id_empresa: 1 },
            usuario_registro: { id_usuario: 1 },
            sede: { id_sede: location },
            fecha_cita: date,
            empleado: { id_empleado: 0 },
            estado: true,
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('Form data', values);
            await addExtraAppointment(values);
            refetch();
            close();
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


    type SalaTratamiento = {
        id_sala_tratamiento: number;
        nombres: string;
        sede: {
            id_sede: number;
        };
    };
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


    // ********
    type Employee = {
        id_empleado: number;
        nombres: string;
        usuario: {
            id_usuario: number;
            username: string;
        };
    };
    const [filteredEmployee, setFilteredEmployee] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        if (!loadEmployees && employees) {
            // Filtrar y establecer los empleados filtrados
            const filtered = employees.filter((employee: any) => employee.sede.id_sede === location);
            setFilteredEmployee(filtered);
        }
    }, [loadEmployees, employees, location]);

    useEffect(() => {
        // Cuando se selecciona un empleado, actualizar el valor del usuario registro ID
        if (selectedEmployee) {
            formik.setFieldValue('usuario_registro.id_usuario', selectedEmployee.usuario.id_usuario);
        } else {
            formik.setFieldValue('usuario_registro.id_usuario', 1); // Limpiar el campo si no hay empleado seleccionado
        }
    }, [selectedEmployee, formik.setFieldValue]);

    const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const employee = filteredEmployee.find(emp => emp.id_empleado === selectedId) || null;
        setSelectedEmployee(employee);
        formik.handleChange(e);
    };
    return (
        <PopupUpdate>
            <div className='flex justify-between'>
                <h1>Agregar calendario extra</h1>
                <button onClick={close}>X</button>
            </div>
            <div>
                <p className='font-bold'>{location}</p>
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
                            <>
                                <DatatableComponent
                                    data={getPatients?.data}
                                    isLoading={loadPatients}
                                    error={errorPatient}
                                    columns={columns}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    setFilter={setFilter}
                                    filter={filter}
                                />
                            </>
                        )}
                    </div>
                )}
            {step === 2 && (
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <div className='border border-gray-300 text-left p-2'>
                        <label htmlFor="paciente.id_paciente">Nombre paciente</label>
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
                            value={formik.values.sala_tratamiento.id_sala_tratamiento}
                        >
                            <option value="">Seleccione una sala</option>
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

                    <div className='border border-gray-300 text-left p-2'>
                        <label>Empleado ID</label>
                        <select
                            name="empleado.id_empleado"
                            onChange={handleEmployeeChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.empleado.id_empleado}
                            className='w-full py-2 outline-none px-1'
                        >
                            <option value="">Seleccione un empleado</option>
                            {filteredEmployee.map((employee) => (
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
                        <label>Usuario Registro ID</label>
                        <select
                            name="usuario_registro.id_usuario"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.usuario_registro.id_usuario}
                            className='w-full py-2 outline-none px-1'
                            disabled
                        //   disabled={!selectedEmployee}  
                        // Deshabilitar el select si no hay empleado seleccionado
                        >
                            <option value="">Seleccione un usuario registro</option>
                            {selectedEmployee && ( // Mostrar opciones solo si hay un empleado seleccionado
                                <option value={selectedEmployee.usuario.id_usuario}>
                                    {selectedEmployee.usuario.username}
                                </option>
                            )}
                        </select>
                        {formik.touched.usuario_registro?.id_usuario && formik.errors.usuario_registro?.id_usuario ? (
                            <div>{formik.errors.usuario_registro.id_usuario}</div>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        onClick={previousStep}
                        className="bg-gray-500 text-white px-4 py-2 rounded-sm hover:bg-gray-700"
                    >
                        Atrás
                    </button>
                    <button
                        className='w-full bg-[#82b440] shadow-xl p-3 rounded-sm text-white'

                        type="submit">{loadExtraAppointment ? 'Enviando...' : 'Guardar'}</button>
                </form>
            )}
        </PopupUpdate>
    )
}
