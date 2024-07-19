import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';
// import { Patient, PatientResponse } from "../../interface/"
import { prepareHeaders } from '@/app/(dashboard)/utils';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/paciente`;

export const patientCreateApi = createApi({
    reducerPath: 'pacienteApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addPatient: builder.mutation({
            query: (newPatient) => ({
                url: '',
                method: 'POST',
                body: newPatient,
            }),
        }),
    }),
});

export const { useAddPatientMutation } = patientCreateApi;