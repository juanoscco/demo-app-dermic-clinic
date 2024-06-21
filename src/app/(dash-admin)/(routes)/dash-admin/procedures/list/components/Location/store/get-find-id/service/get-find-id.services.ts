import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findbyIdLocationProcedureAvailableApi = createApi({
  reducerPath: 'findbyIdLocationProcedureAvailableApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getProcedureLocationAvailableById: builder.query({
      query: (id: number) => `procedimiento_sede/sedes/disponibilidad/${id}`,
    }),
  }),
});

export const { useGetProcedureLocationAvailableByIdQuery } = findbyIdLocationProcedureAvailableApi;
