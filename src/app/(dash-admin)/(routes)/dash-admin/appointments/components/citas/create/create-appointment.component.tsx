"use client"
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddAppointmentMutation } from './store/service';
import { Appointment } from './interface';
import { useGetRoomProcedureQuery } from '../../../../procedures/list/components/Rooms/store/get/service';
import { useAddPatientMutation } from '../../../../patients/create/store/service';
import CreatePatientComponent from './components/patient/create/create-patient.component';
import { useGetPatientsQuery } from '../../../../patients/list/store/service';
import { DatatableComponent } from "@/components/datatable/";

interface Props {
    hour?: any;
    room?: any;
    date?: any;
    closePopup?: any;
    employee?: any;
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
export function CreateAppointmentComponent({ hour, room, date, closePopup, employee }: Props) {

    // Hooks
    // Steps
    const [step, setStep] = useState(1);
    // Tabview
    const [activeTab, setActiveTab] = useState(1);


    // Posts
    const [addAppointment, { isLoading: loadAddAppointment }] = useAddAppointmentMutation();
    const [addPatient, { isLoading: loadingAddPatient, data: dataAddPatient, error: errorAddPatient, isError }] = useAddPatientMutation();

    // Get rooms and procedures!
    const { data: dataRoomProcedure, isLoading: loadRoomProcedures, refetch: refetchRoomProcedure } = useGetRoomProcedureQuery({ limit: 200, page: 0, filter: '' });
    // Get patients
    const [perPage, setPerPage] = useState(10); // Estado para almacenar el número de pacientes por página
    const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual

    const [filter, setFilter] = useState(''); // Estado para almacenar el filtro de búsqueda
    const { data: dataPatient, error: errorPatient, isLoading: loadPatient, refetch: refetchPatient } = useGetPatientsQuery({ limit: perPage, page: currentPage - 1, filter });


    // 
    // filtrado de datos
    const [filteredData, setFilteredData] = useState([]);
    // const [selectedProcedure, setSelectedProcedure] = useState('');


    useEffect(() => {
        const firstFilter = dataRoomProcedure?.data?.content?.map((item: any) =>
            item.procedimiento_sala_detalle.map((detail: any) => detail.sala_tratamiento.id_sala_tratamiento)
        );

        const secondFilter = dataRoomProcedure?.data?.content.map((item: any) => item.procedimiento.nombres);

        const thirdFilter = dataRoomProcedure?.data?.content.map((item: any) => item.procedimiento.id_procedimiento);

        const filtered = firstFilter?.map((item: any, index: number) => ({
            nombres: secondFilter[index],
            id_procedimiento: thirdFilter[index],
            salas: item
        })).filter((item: any) => item.salas.includes(room.id_sala_tratamiento));

        setFilteredData(filtered);
    }, [dataRoomProcedure, room.id_sala_tratamiento]);

    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedProcedure(event.target.value);
    // };
    // 
    //   const firstfilter = dataRoomProcedure?.data?.content.map((item: any) => item.procedimiento_sala_detalle.map((detail: any) => detail.sala_tratamiento.id_sala_tratamiento))
    //   console.log(firstfilter);

    // console.log(room.id_sala_tratamiento)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetchPatient();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [filter, refetchPatient]);

    const columns = [
        {
            title: 'Paciente',
            displayName: 'Nombre del Paciente',
            field: 'nombres', //FieldValue
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
            render: (fieldValue: any) => (
                <div>
                    Seleccionar
                </div>
            ),
        },
    ];

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
            empresa: {
                id_empresa: room?.sede?.empresa?.id_empresa
            },
            usuario_registro: {
                id_usuario: 2
            },
            paciente: {
                id_paciente: dataAddPatient?.data?.id_paciente || 0,
            },
            sede: {
                id_sede: room?.sede.id_sede
            },
            fecha_cita: date,
            empleado: {
                id_empleado: 2
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
            console.log('Form values:', values);
            await addAppointment(values)
        },
    })

    // console.log(dataAddPatient?.data?.id_paciente)
    useEffect(() => {
        if (dataAddPatient?.data?.id_paciente) {
            formik.setValues((prevValues: any) => ({
                ...prevValues,
                paciente: {
                    id_paciente: dataAddPatient.data.id_paciente
                }
            }));
        }
    }, [dataAddPatient, formik.setFieldValue]);

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
                                />
                            )}
                            {activeTab === 2 && (
                                <div>
                                    <h1>Lista de pacientes</h1>

                                    <DatatableComponent
                                        data={dataPatient?.data}
                                        isLoading={loadPatient}
                                        error={errorPatient}
                                        columns={columns}
                                        perPage={perPage}
                                        setPerPage={setPerPage}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        // refetch={refetch}
                                        setFilter={setFilter}
                                        filter={filter}
                                    />
                                </div>
                            )}
                            <button type="button" onClick={nextStep}>Siguiente</button>
                        </div>
                    )}
                    {step === 2 && (
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {/* <div>
                                <label htmlFor="procedimiento.id_procedimiento">Procedimiento ID</label>
                                <input
                                    id="procedimiento.id_procedimiento"
                                    name="procedimiento.id_procedimiento"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.procedimiento.id_procedimiento}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                                {formik.touched.procedimiento?.id_procedimiento && formik.errors.procedimiento?.id_procedimiento ? (
                                    <div className="text-red-600">{formik.errors.procedimiento.id_procedimiento}</div>
                                ) : null}
                            </div> */}
                            <div>
                                <label htmlFor="paciente.id_paciente">Paciente ID</label>
                                <input
                                    id="paciente.id_paciente"
                                    name="paciente.id_paciente"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.paciente.id_paciente === 0 ? 'Seleccione o cree un paciente' : formik.values.paciente.id_paciente}
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
                                    <option value="" disabled>Select a procedure</option>
                                    {filteredData.map((item: any) => (
                                        <option key={item.id_procedimiento} value={item.id_procedimiento}>
                                            {item.nombres}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.procedimiento?.id_procedimiento && formik.errors.procedimiento?.id_procedimiento ? (
                                    <div className="text-red-600">{formik.errors.procedimiento.id_procedimiento}</div>
                                ) : null}
                            </div>
                            {/* <div>
                        <label htmlFor="usuario_registro.id_usuario">Doctor</label>
                        <input
                            id="usuario_registro.id_usuario"
                            name="usuario_registro.id_usuario"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.usuario_registro.id_usuario}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        {formik.touched.usuario_registro?.id_usuario && formik.errors.usuario_registro?.id_usuario ? (
                            <div className="text-red-600">{formik.errors.usuario_registro.id_usuario}</div>
                        ) : null}
                    </div> */}



                            <div>
                                <label htmlFor="empleado.id_empleado">Especialista</label>
                                <input
                                    id="empleado.id_empleado"
                                    name="empleado.id_empleado"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.empleado.id_empleado}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                                {formik.touched.empleado?.id_empleado && formik.errors.empleado?.id_empleado ? (
                                    <div className="text-red-600">{formik.errors.empleado.id_empleado}</div>
                                ) : null}
                            </div>
                            <button type="button" onClick={previousStep}>
                                atras
                            </button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                {loadAddAppointment ? "Creando..." : "Crear"}
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    )
}
