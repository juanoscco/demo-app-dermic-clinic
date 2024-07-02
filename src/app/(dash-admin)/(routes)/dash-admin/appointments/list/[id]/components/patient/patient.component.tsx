import { useGetPatientsQuery } from '@/app/(dash-admin)/(routes)/dash-admin/patients/list/store/service';
import { DatatableComponent } from '@/components/datatable';
import React, { useState, useEffect } from 'react'
import { useUpdateAppointmentMutation } from '../../../../components/citas/update/store/service';
import { useFormik } from 'formik';

interface Props {
    dataDetailAppointmentById?: any;

}

interface Patient {
    id_paciente: number;
    nombres: string;
    email: string;
    direccion: string;
    estado_antiguedad: { descripcion: string };
    estado_civil: { descripcion: string };
    lugar_nacimiento: string;
    numero_documento_identidad: string;
    telefono: string
}

interface DataDetailAppointment {
    procedimiento: {
        id_procedimiento: number;
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
    fecha_cita: string; // Assuming fecha_cita is a string in the format "YYYY-MM-DD" or similar
    empleado: {
        id_empleado: number;
    };
    hora: {
        id_cabecera: number;
        id_cabecera_detalle: number;
        descripcion: string;
        valor: number; // Assuming valor is a number
    };
    estado: boolean; // Assuming estado is a string representing the status
}


export default function PatientComponent({
    dataDetailAppointmentById,
    //  selectedPatient, 
    //  handleSelect 
}: Props) {
    const [updateAppointment, { data: appointmentUpdate, isLoading: appointmentLoad }] = useUpdateAppointmentMutation();

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [filter, setFilter] = useState('');

    const { data, error, isLoading, refetch } = useGetPatientsQuery({ limit: perPage, page: currentPage - 1, filter });

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
    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if (dataDetailAppointmentById?.id_cita) {
                    console.log(values);
                    await updateAppointment({ appointmentId: dataDetailAppointmentById?.id_cita, appointmentData: values }).unwrap();
                    console.log("SE ACTUALIZO CORRECTAMENTE!");
                    // refetch();
                    // refetchAppointment()
                    // router.push("/dash-admin/appointments/appointment-calendar");
                } else {
                    console.error("id_cita is missing");
                }
            } catch (error) {
                console.error("Error updating appointment:", error);
            }
        }
    });
    const handleSelect = (idPatient: number, patient: Patient) => {
        formik.setValues({
            ...initialValues,
            paciente: {
                id_paciente: idPatient,
                // nombres: name,
            },
        });
        setSelectedPatient(patient);
    };
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
            render: (fieldValue: any, item: any) => (
                <button type='button' className='bg-gray-200 rounded-md p-1 text-sm' onClick={() => handleSelect(fieldValue, item)}>
                    Seleccionar
                </button>
            ),
        },
    ];


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [filter, refetch]);

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Datos */}
            {selectedPatient ? (
                <form onSubmit={formik.handleSubmit} className=" p-6  border-r-2">
                    <h2 className="text-lg  mb-4 font-bold">Detalles del Paciente Seleccionado</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm">Nombre:</p>
                            <p className="capitalize text-gray-800 font-medium">{selectedPatient.nombres.toLowerCase()}</p>
                            <p className="text-gray-600 text-sm mt-2">Email:</p>
                            <p className="text-gray-800">{selectedPatient.numero_documento_identidad}</p>
                        </div>
                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm">Email:</p>
                            <p className="capitalize text-gray-800 font-medium">{selectedPatient.email}</p>
                            <p className="text-gray-600 text-sm mt-2">Teléfono:</p>
                            <p className="text-gray-800">{selectedPatient.telefono}</p>
                        </div>

                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm">Dirección:</p>
                            <p className="text-gray-800">{selectedPatient.direccion}</p>
                            <p className="text-gray-600 text-sm mt-2">Lugar de nacimiento:</p>
                            <p className="text-gray-800">{selectedPatient.lugar_nacimiento}</p>

                        </div>
                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm mt-2">Estado de antigüedad:</p>
                            <p className="text-gray-800">{selectedPatient.estado_antiguedad.descripcion}</p>
                            <p className="text-gray-600 text-sm">Estado civil:</p>
                            <p className="text-gray-800">{selectedPatient.estado_civil.descripcion}</p>
                        </div>
                    </div>
                    <button type='submit'>{appointmentLoad?'Cargando...':'Guardar'}</button>

                </form>
            ) : (
                <section className=" p-6  border-r-2 ">
                    <h2 className="text-lg  mb-4 font-bold">Detalles del Paciente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm">Nombre:</p>
                            <p className="capitalize text-gray-800 font-medium">{dataDetailAppointmentById?.paciente.nombres.toLowerCase()}</p>
                            <p className="text-gray-600 text-sm mt-2">Documento de Identidad:</p>
                            <p className="text-gray-800">{dataDetailAppointmentById?.paciente.numero_documento_identidad}</p>
                        </div>
                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm">Email:</p>
                            <p className="text-gray-800">{dataDetailAppointmentById?.paciente.email}</p>
                            <p className="text-gray-600 text-sm mt-2">Teléfono:</p>
                            <p className="text-gray-800">{dataDetailAppointmentById?.paciente.telefono}</p>
                        </div>
                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm">Dirección:</p>
                            <p className="text-gray-800">{dataDetailAppointmentById?.paciente.direccion}</p>
                            <p className="text-gray-600 text-sm mt-2">Lugar de nacimiento:</p>
                            <p className="text-gray-800">{dataDetailAppointmentById?.paciente.lugar_nacimiento}</p>
                        </div>
                        <div className="border-b border-gray-300 pb-2">
                            <p className="text-gray-600 text-sm">Estado de antigüedad:</p>
                            <p className="text-gray-800">{dataDetailAppointmentById?.paciente.estado_antiguedad.descripcion}</p>
                            <p className="text-gray-600 text-sm mt-2">Estado civil:</p>
                            <p className="text-gray-800">{dataDetailAppointmentById?.paciente.estado_civil.descripcion}</p>
                        </div>
                    </div>

                </section>
            )}
            {/* Cambiar ID
            <section className="py-2 overflow-auto">
                <h1 className='text-xl font-bold'>Seleccionar paciente</h1>
                <DatatableComponent
                    data={data?.data}
                    isLoading={isLoading}
                    error={error}
                    columns={columns}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setFilter={setFilter}
                    filter={filter}
                />
            </section> */}
        </section>
    )
}
