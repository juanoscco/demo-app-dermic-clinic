import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const extraAppointmentUpdateApi = createApi({
  reducerPath: 'extraAppointmentUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updateExtraAppointment: builder.mutation({
      query: ({ extraAppointmentId, extraAppointmentData }) => ({
        url: `cita_extra/${extraAppointmentId}`,
        method: 'PUT',
        body: extraAppointmentData,
      }),
    }),
  }),
});

export const { useUpdateExtraAppointmentMutation } = extraAppointmentUpdateApi;