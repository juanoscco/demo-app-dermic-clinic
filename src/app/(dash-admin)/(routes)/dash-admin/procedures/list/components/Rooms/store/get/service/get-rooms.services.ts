import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const getRoomProcedureApi = createApi({
  reducerPath: 'getRoomProcedureApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getRoomProcedure: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `procedimiento_sala?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetRoomProcedureQuery } = getRoomProcedureApi;
