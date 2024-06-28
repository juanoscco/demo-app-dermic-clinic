import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const patientDeleteApi = createApi({
  reducerPath: 'patientDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deletePatient: builder.mutation({
      query: ({ deletePatientId }) => ({
        url: `/paciente/${deletePatientId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeletePatientMutation } = patientDeleteApi;
