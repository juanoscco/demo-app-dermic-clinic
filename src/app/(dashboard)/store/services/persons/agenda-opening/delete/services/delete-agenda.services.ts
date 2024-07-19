import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const employeeAgendaDeleteApi = createApi({
  reducerPath: 'employeeAgendaDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deleteAgendaEmployee: builder.mutation({
      query: ({ deleteAgendaEmployeeId }) => ({
        url: `/agenda/${deleteAgendaEmployeeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteAgendaEmployeeMutation } = employeeAgendaDeleteApi;
