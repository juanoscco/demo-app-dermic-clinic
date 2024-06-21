
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const scheduleDetailApi = createApi({
  reducerPath: 'scheduleDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getscheduleById: builder.query({
      query: (id: number) => `horario_trabajo/${id}`,
    }),
  }),
});

export const { useGetscheduleByIdQuery } = scheduleDetailApi;