import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const patientDetailApi = createApi({
  reducerPath: 'patientDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getPatientById: builder.query({
      query: (id: number) => `paciente/${id}`,
    }),
  }),
});

export const { useGetPatientByIdQuery } = patientDetailApi;