import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findDateAppointmentApi = createApi({
  reducerPath: 'findDateAppointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDateAppointmentList: builder.query({
      query: ({ date = '' }) => `cita/empleado/horarios?fecha_cita=${date}`,
    }),
  }),
});

export const { useGetDateAppointmentListQuery } = findDateAppointmentApi;
