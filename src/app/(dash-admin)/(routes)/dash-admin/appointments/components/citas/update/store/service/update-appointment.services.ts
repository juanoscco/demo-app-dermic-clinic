import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentUpdateApi = createApi({
  reducerPath: 'appointmentUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
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