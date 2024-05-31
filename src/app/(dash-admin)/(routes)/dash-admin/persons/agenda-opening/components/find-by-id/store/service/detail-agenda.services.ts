
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const agendaDetailApi = createApi({
  reducerPath: 'agendaDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAgendaById: builder.query({
      query: (id: number) => `agenda/${id}`,
    }),
  }),
});

export const { useGetAgendaByIdQuery } = agendaDetailApi;