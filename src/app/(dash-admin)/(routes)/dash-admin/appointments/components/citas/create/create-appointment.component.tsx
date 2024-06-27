"use client"
import React, { useState, useEffect } from 'react'
import { useAddAppointmentMutation } from './store/service';
import { Appointment } from './interface';
import { useGetRoomProcedureQuery } from '../../../../procedures/list/components/Rooms/store/get/service';
import { useAddPatientMutation } from '../../../../patients/create/store/service';
import { useGetPatientsQuery } from '../../../../patients/list/store/service';
import { DatatableComponent } from "@/components/datatable/";
import { useGetEmployeesQuery } from '../../../../persons/list/store/service';
import { useGetPersonalProcedureQuery } from '../../../../procedures/list/components/Personal/store/get/service';
import CreatePatientComponent from './components/patient/create/create-patient.component';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    hour?: any;
    room?: any;
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
    empleado: Yup.object({
        id_empleado: Yup.number().required('Requerido')
    }),
    hora: Yup.object({
        descripcion: Yup.string().required('Requerido')
    }),
    estado: Yup.boolean().required('Requerido')
});
export function CreateAppointmentComponent({
    hour, room, date, closePopup, idTitle, refetch, location
}: Props) {

    // Hooks
    // Steps
    const [step, setStep] = useState(1);
    // Tabview
    const [activeTab, setActiveTab] = useState(1);

    // employee
    const { data: dataEmployee, isLoading: loadEmployee, refetch: refetchEmployee } = useGetEmployeesQuery({ limit: 15000, page: 0, filter: '' })
    const employee = dataEmployee?.data?.content

    const { data: dataHeadBoardProcedure, refetch: refetchDataHeadBoard } = useGetPersonalProcedureQuery({ limit: 300, page: 0, filter: '' })

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchEmployee();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchEmployee]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchDataHeadBoard();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [refetchDataHeadBoard]);

    // ****
    const dataHeadBoardFilter = dataHeadBoardProcedure?.data?.content;

    // Posts
    const [addAppointment, { isLoading: loadAddAppointment }] = useAddAppointmentMutation();
    const [addPatient, { isLoading: loadingAddPatient, data: dataAddPatient, error: errorAddPatient }] = useAddPatientMutation();

    // Get rooms and procedures!
    const { data: dataRoomProcedure, isLoading: loadRoomProcedures, refetch: refetchRoomProcedure } = useGetRoomProcedureQuery({ limit: 300, page: 0, filter: '' });

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

    // ****
    const roomProcedures = dataRoomProcedure?.data?.content

    // Objeto temporal para rastrear los id_procedimiento únicos
    const uniqueProcedures: { [key: string]: any } = {};

    // Filtrar procedimientos únicos de las salas y obtener id_procedimiento y nombre_proc
    const filterRoomProcedures = roomProcedures
        ?.filter((item: any) =>
            item.procedimiento_sala_detalle.some((detail: any) =>
                detail.sala_tratamiento.id_sala_tratamiento === room.id_sala_tratamiento
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

    const filteredRoomProceduresWithMatch = dataHeadBoardFilter?.filter((item: any) => item.titulo.id_cabecera_detalle === idTitle)
        .map((item: any) => ({
            ...item,
            procedimiento_personales_detalle: item.procedimiento_personales_detalle.filter((detail: any) =>
                filterRoomProcedures?.some((proc: any) =>
                    proc.id_procedimiento === detail.procedimiento.id_procedimiento &&
                    proc.nombre_proc === detail.procedimiento.nombres
                )
            )
        }))

    // Filtrar dataHeadBoardFilter por idTitle
    const filteredHeadBoard = dataHeadBoardFilter?.filter((item: any) => item.titulo.id_cabecera_detalle === idTitle);

    // Obtener el id_cabecera_detalle del primer elemento filtrado (asumiendo que todos tienen el mismo idTitle)
    const idTitulo = filteredHeadBoard?.length > 0 ? filteredHeadBoard[0]?.titulo.id_cabecera_detalle : null;

    // Filtrar empleados por idTitle y obtener una lista de objetos con id_empleado y nombres
    const doctorInfo = employee
        ?.filter((item: any) => item.titulo.id_cabecera_detalle === idTitle && item.sede.id_sede === location)
        .map((item: any) => ({
            id_empleado: item.id_empleado,
            nombres: item.nombres
        }));

    // Obtener los procedimientos coincidentes con filterRoomProcedures

    // Formatear los datos en el objeto solicitado
    const formattedData: any = {
        id_titulo: idTitulo,
        doctors: doctorInfo?.map((doctor: any) => ({
            id_doctor: doctor.id_empleado,
            name: doctor.nombres,
        })),
        procedures: filteredRoomProceduresWithMatch?.map((item: any) => (item.procedimiento_personales_detalle.map((detail: any) => ({
            id_proc: detail.procedimiento.id_procedimiento,
            name: detail.procedimiento.nombres
        }))))
    };
    // *****

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
                id_procedimiento: 0
            },
            sala_tratamiento: {
                id_sala_tratamiento: room.id_sala_tratamiento
            },
            empresa: {
                id_empresa: room?.sede?.empresa?.id_empresa
            },
            usuario_registro: {
                id_usuario: 2
            },
            paciente: {
                id_paciente: 0,
                nombres: ''
            },
            sede: {
                id_sede: room?.sede.id_sede
            },
            fecha_cita: date,
            empleado: {
                id_empleado: 0,
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

    // console.log(employee);

    return (
        <div
            className="fixed inset-0  flex justify-end items-center bg-black bg-opacity-50"
        >
            <div
                className='bg-white p-4 w-3/6  rounded-s-xl shadow-lg max-h-full h-full overflow-y-auto'>
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
                                <>
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
                                </>
                            )}
                        </div>
                    )}
                    {step === 2 && (
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="paciente.id_paciente">Nombre paciente</label>
                                <input
                                    id="paciente.nombres"
                                    name="paciente.nombres"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.paciente.nombres}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    disabled
                                />
                                {formik.touched.paciente?.id_paciente && formik.errors.paciente?.id_paciente ? (
                                    <div className="text-red-600">{formik.errors.paciente.id_paciente}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="procedimiento.id_procedimiento">Procedimiento ID</label>
                                <select
                                    id="procedimiento.id_procedimiento"
                                    name="procedimiento.id_procedimiento"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.procedimiento.id_procedimiento}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                >
                                    <option value="">Select a procedure</option>
                                    {formattedData.procedures[0].map((item: any) => (
                                        <option key={item.id_proc} value={item.id_proc}>
                                            {item.name}
                                        </option>
                                    ))}


                                </select>
                                {formik.touched.procedimiento?.id_procedimiento && formik.errors.procedimiento?.id_procedimiento ? (
                                    <div className="text-red-600">{formik.errors.procedimiento.id_procedimiento}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="empleado.id_empleado">Especialista</label>
                                <select
                                    id="empleado.id_empleado"
                                    name="empleado.id_empleado"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.empleado.id_empleado}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                >
                                    <option value="">Selecciona un especialista</option>
                                    {/* <option value="1">1</option> */}
                                    {
                                        formattedData.doctors?.map((doctor: any) => (
                                            doctor.id_doctor !== 1 && (
                                                <option key={doctor.id_doctor} value={doctor.id_doctor}>
                                                    {doctor.name}
                                                </option>
                                            )
                                        ))

                                    }
                                </select>
                                {formik.touched.empleado?.id_empleado && formik.errors.empleado?.id_empleado ? (
                                    <div className="text-red-600">{formik.errors.empleado.id_empleado}</div>
                                ) : null}
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={previousStep}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                                >
                                    Atrás
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    {loadAddAppointment ? "Creando..." : "Crear"}
                                </button>
                            </div>

                        </form>
                    )}
                </div>

            </div>
        </div>
    )
}
