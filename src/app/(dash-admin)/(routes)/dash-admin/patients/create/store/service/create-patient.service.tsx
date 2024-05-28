import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Patient, PatientResponse } from "../../interface/create-patient.interface"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/paciente`;

export const patientCreateApi = createApi({
    reducerPath: 'pacienteApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        addPaciente: builder.mutation<PatientResponse, Patient>({
            query: (newPaciente) => ({
                url: '',
                method: 'POST',
                body: newPaciente,
            }),
        }),
    }),
});

export const { useAddPacienteMutation } = patientCreateApi;
// export default pacienteApi;
