import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

// const prod = process.env.ENV_PROD 

// const baseUrl = prod ? `${process.env.API_DOCKER_PRODUCTION_JAVA_REST}` : `${process.env.API_DOCKER_DEVELOPMENT_JAVA_REST}`;
const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `paciente?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
