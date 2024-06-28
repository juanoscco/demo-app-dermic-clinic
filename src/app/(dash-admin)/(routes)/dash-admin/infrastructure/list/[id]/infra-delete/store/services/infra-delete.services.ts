import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const infraDeleteApi = createApi({
    reducerPath: 'infraDeleteApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders,
    }),
    endpoints: (builder) => ({
        deleteInfra: builder.mutation({
            query: ({ deleteInfraId }) => ({
                url: `/sede/${deleteInfraId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useDeleteInfraMutation } = infraDeleteApi;
