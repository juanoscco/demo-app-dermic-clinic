import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const patientUpdateApi = createApi({
  reducerPath: 'patientUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updatePatient: builder.mutation({
      query: ({ pacienteId, pacienteData }) => ({
        url: `paciente/${pacienteId}`,
        method: 'PUT',
        body: pacienteData,
      }),
    }),
  }),
});

export const { useUpdatePatientMutation } = patientUpdateApi;