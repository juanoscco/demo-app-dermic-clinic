import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `paciente?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
