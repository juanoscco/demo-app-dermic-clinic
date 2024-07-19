import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentScheduleUpdateApi = createApi({
  reducerPath: 'appointmentScheduleUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updateAppointmentSchedule: builder.mutation({
      query: ({ appointmentScheduleId }) => ({
        url: `/cita_info/horario/${appointmentScheduleId}`,
        method: 'PUT',
        // body: appointmentData,
      }),
    }),
  }),
});

export const { useUpdateAppointmentScheduleMutation } = appointmentScheduleUpdateApi;