import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentExtraScheduleUpdateApi = createApi({
  reducerPath: 'appointmentExtraScheduleUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updateExtraAppointmentSchedule: builder.mutation({
      query: ({ appointmentScheduleId }) => ({
        url: `/cita_extra_info/horario/${appointmentScheduleId}`,
        method: 'PUT',
        // body: appointmentData,
      }),
    }),
  }),
});

export const { useUpdateExtraAppointmentScheduleMutation } = appointmentExtraScheduleUpdateApi;