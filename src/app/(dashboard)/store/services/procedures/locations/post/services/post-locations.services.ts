import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/procedimiento_sede`;

export const postlocationProcedureApi = createApi({
    reducerPath: 'postlocationProcedureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addLocationProcedure: builder.mutation({
            query: (newPostLocationProcedure) => ({
                url: '',
                method: 'POST',
                body: newPostLocationProcedure,
            }),
        }),
    }),
});

export const { useAddLocationProcedureMutation } = postlocationProcedureApi;