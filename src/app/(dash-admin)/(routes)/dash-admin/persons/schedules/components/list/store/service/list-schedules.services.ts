import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const listScheludesApi = createApi({
  reducerPath: 'listScheludesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getScheludes: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `horario_trabajo?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetScheludesQuery } = listScheludesApi;