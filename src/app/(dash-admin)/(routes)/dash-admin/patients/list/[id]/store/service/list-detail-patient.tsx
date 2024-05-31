import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const patientDetailApi = createApi({
  reducerPath: 'patientDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatientById: builder.query({
      query: (id: number) => `paciente/${id}`,
    }),
  }),
});

export const { useGetPatientByIdQuery } = patientDetailApi;