import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentUpdateApi = createApi({
  reducerPath: 'appointmentUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateAppointment: builder.mutation({
      query: ({ appointmentId, appointmentData }) => ({
        url: `cita/${appointmentId}`,
        method: 'PUT',
        body: appointmentData,
      }),
    }),
  }),
});

export const { useUpdateAppointmentMutation } = appointmentUpdateApi;