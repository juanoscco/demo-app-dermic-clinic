import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const infraRoomsDeleteApi = createApi({
  reducerPath: 'infraRoomsDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deleteInfraRooms: builder.mutation({
      query: ({ deleteInfraRoomsId }) => ({
        url: `/sala_tratamiento/${deleteInfraRoomsId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteInfraRoomsMutation } = infraRoomsDeleteApi;
