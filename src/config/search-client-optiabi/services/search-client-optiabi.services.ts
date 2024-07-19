import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const searchClientsRecurrentsInOptiabiApi = createApi({
  reducerPath: 'searchClientsRecurrentsInOptiabiApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getClientsOptiabi: builder.query({
      query: ({ limit = 5, page = 0, names = '' }) => `secondary/client?p=${page}&limit=${limit}&nombres=${names}`,
    }),
  }),
});

export const { useGetClientsOptiabiQuery } = searchClientsRecurrentsInOptiabiApi;