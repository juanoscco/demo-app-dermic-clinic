
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const agendaDetailApi = createApi({
  reducerPath: 'agendaDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getAgendaById: builder.query({
      query: (id: number) => `agenda/${id}`,
    }),
  }),
});

export const { useGetAgendaByIdQuery } = agendaDetailApi;