import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentExtraInfoUpdateApi = createApi({
  reducerPath: 'appointmentExtraInfoUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updateInfoExtraAppointment: builder.mutation({
      query: ({ appointmentInfoExtraId, appointmentInfoExtraData }) => ({
        url: `cita_extra_info/${appointmentInfoExtraId}`,
        method: 'PUT',
        body: appointmentInfoExtraData,
      }),
    }),
  }),
});

export const { useUpdateInfoExtraAppointmentMutation } = appointmentExtraInfoUpdateApi;