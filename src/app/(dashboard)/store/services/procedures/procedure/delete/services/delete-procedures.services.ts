import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const procedureDeleteApi = createApi({
  reducerPath: 'procedureDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deleteProcedure: builder.mutation({
      query: ({ deleteProcedureId }) => ({
        url: `/procedimiento/${deleteProcedureId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteProcedureMutation } = procedureDeleteApi;
