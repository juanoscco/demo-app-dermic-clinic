import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const detailInfrastructureApi = createApi({
  reducerPath: 'detailInfrastructureApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInfrastructureById: builder.query({
      query: (id: number) => `sede/${id}`,
    }),
  }),
});

export const { useGetInfrastructureByIdQuery } = detailInfrastructureApi;
