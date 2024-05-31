
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const agendaUpdateApi = createApi({
  reducerPath: 'agendaUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateAgenda: builder.mutation({
      query: ({ agendaId, agendaData }) => ({
        url: `agenda/${agendaId}`,
        method: 'PUT',
        body: agendaData,
      }),
    }),
  }),
});

export const { useUpdateAgendaMutation } = agendaUpdateApi;