import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const detailInfrastructureApi = createApi({
  reducerPath: 'detailInfrastructureApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getInfrastructureById: builder.query({
      query: (id: number) => `sede/${id}`,
    }),
  }),
});

export const { useGetInfrastructureByIdQuery } = detailInfrastructureApi;
