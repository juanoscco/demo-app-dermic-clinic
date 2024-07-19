import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const infrastructureListApi = createApi({
  reducerPath: 'infrastructureListApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getInfrastructure: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `sede?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetInfrastructureQuery } = infrastructureListApi;
