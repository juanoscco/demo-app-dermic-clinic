import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const ExtraAppointmentDetailApi = createApi({
  reducerPath: 'ExtraAppointmentDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExtraAppointmentById: builder.query({
      query: (id: number) => `cita_extra/${id}`,
    }),
  }),
});

export const { useGetExtraAppointmentByIdQuery } = ExtraAppointmentDetailApi;