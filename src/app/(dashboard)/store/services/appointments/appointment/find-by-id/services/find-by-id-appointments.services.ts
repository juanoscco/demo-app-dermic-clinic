import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findIdAppointmentDetailApi = createApi({
  reducerPath: 'findIdAppointmentDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getAppointmentById: builder.query({
      query: (id: number) => `cita/${id}`,
    }),
  }),
});

export const { useGetAppointmentByIdQuery } = findIdAppointmentDetailApi;