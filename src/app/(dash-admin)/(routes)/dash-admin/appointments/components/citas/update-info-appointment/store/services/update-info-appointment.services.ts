import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentInfoUpdateApi = createApi({
  reducerPath: 'appointmentInfoUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updateInfoAppointment: builder.mutation({
      query: ({ appointmentInfoId, appointmentInfoData }) => ({
        url: `cita_info/${appointmentInfoId}`,
        method: 'PUT',
        body: appointmentInfoData,
      }),
    }),
  }),
});

export const { useUpdateInfoAppointmentMutation } = appointmentInfoUpdateApi;