import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const appointmentDeleteApi = createApi({
  reducerPath: 'appointmentDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deleteAppointment: builder.mutation({
      query: ({ deleteAppointmentId }) => ({
        url: `/cita/${deleteAppointmentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteAppointmentMutation } = appointmentDeleteApi;