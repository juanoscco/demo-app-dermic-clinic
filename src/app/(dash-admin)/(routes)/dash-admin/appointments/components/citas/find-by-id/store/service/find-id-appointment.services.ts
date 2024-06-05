import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findIdAppointmentDetailApi = createApi({
  reducerPath: 'findIdAppointmentDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAppointmentById: builder.query({
      query: (id: number) => `cita/${id}`,
    }),
  }),
});

export const { useGetAppointmentByIdQuery } = findIdAppointmentDetailApi;