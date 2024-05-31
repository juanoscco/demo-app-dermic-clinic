
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const scheduleUpdateApi = createApi({
  reducerPath: 'scheduleUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateSchedule: builder.mutation({
      query: ({ scheduleId, scheduleData }) => ({
        url: `horario_trabajo/${scheduleId}`,
        method: 'PUT',
        body: scheduleData,
      }),
    }),
  }),
});

export const { useUpdateScheduleMutation } = scheduleUpdateApi;