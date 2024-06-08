import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findbyIdRoomProcedureAvailableApi = createApi({
  reducerPath: 'findbyIdRoomProcedureAvailableApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProcedureRoomAvailableById: builder.query({
      query: (id: number) => `procedimiento_sala/salas/disponibilidad/${id}`,
    }),
  }),
});

export const { useGetProcedureRoomAvailableByIdQuery } = findbyIdRoomProcedureAvailableApi;
