import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const patientUpdateApi = createApi({
  reducerPath: 'patientUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updatePatient: builder.mutation({
      query: ({ patientId, patientData }) => ({
        url: `paciente/${patientId}`,
        method: 'PUT',
        body: patientData,
      }),
    }),
  }),
});

export const { useUpdatePatientMutation } = patientUpdateApi;