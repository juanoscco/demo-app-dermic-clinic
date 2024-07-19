import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentListApi = createApi({
  reducerPath: 'appointmentListApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getAppointmentList: builder.query({
      query: ({ limit = 10, page = 0, id_empleado = 0 }) => `cita?p=${page}&limit=${limit}&id_empleado=${id_empleado}`,
    }),
  }),
});

export const { useGetAppointmentListQuery } = appointmentListApi;
