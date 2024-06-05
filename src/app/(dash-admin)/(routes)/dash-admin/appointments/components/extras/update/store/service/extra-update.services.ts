import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const extraAppointmentUpdateApi = createApi({
  reducerPath: 'extraAppointmentUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
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