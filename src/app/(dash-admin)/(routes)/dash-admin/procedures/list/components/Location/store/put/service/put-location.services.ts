import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const putLocationProcedureApi = createApi({
  reducerPath: 'putLocationProcedureApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
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