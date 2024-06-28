import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const employeeScheduleDeleteApi = createApi({
  reducerPath: 'employeeScheduleDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deleteScheduleEmployee: builder.mutation({
      query: ({ deleteScheduleEmployeeId }) => ({
        url: `/horario_trabajo/${deleteScheduleEmployeeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteScheduleEmployeeMutation } = employeeScheduleDeleteApi;
