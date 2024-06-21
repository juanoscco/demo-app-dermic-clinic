import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findDateAppointmentApi = createApi({
  reducerPath: 'findDateAppointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getDateAppointmentList: builder.query({
      query: ({ date = '' }) => `cita/empleado/horarios?fecha_cita=${date}`,
    }),
  }),
});

export const { useGetDateAppointmentListQuery } = findDateAppointmentApi;
