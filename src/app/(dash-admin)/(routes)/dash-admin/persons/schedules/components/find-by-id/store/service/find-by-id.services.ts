
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const scheduleDetailApi = createApi({
  reducerPath: 'scheduleDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getscheduleById: builder.query({
      query: (id: number) => `horario_trabajo/${id}`,
    }),
  }),
});

export const { useGetscheduleByIdQuery } = scheduleDetailApi;