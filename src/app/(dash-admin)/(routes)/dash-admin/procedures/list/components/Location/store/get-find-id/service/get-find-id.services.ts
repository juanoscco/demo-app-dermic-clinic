import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findbyIdLocationProcedureAvailableApi = createApi({
  reducerPath: 'findbyIdLocationProcedureAvailableApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProcedureLocationAvailableById: builder.query({
      query: (id: number) => `procedimiento_sede/sedes/disponibilidad/${id}`,
    }),
  }),
});

export const { useGetProcedureLocationAvailableByIdQuery } = findbyIdLocationProcedureAvailableApi;
