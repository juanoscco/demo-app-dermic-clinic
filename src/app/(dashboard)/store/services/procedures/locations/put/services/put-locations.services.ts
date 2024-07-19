import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const putLocationProcedureApi = createApi({
  reducerPath: 'putLocationProcedureApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updateLocationProcedure: builder.mutation({
      query: ({ locationProcedureId, locationProcedureData }) => ({
        url: `procedimiento_sede/${locationProcedureId}`,
        method: 'PUT',
        body: locationProcedureData,
      }),
    }),
  }),
});

export const { useUpdateLocationProcedureMutation } = putLocationProcedureApi;