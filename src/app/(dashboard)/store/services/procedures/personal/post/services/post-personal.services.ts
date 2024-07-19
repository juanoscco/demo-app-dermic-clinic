import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/procedimiento_personal`;

export const postPersonalProcedureApi = createApi({
    reducerPath: 'postPersonalProcedureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addPersonalProcedure: builder.mutation({
            query: (newPostPersonalProcedure) => ({
                url: '',
                method: 'POST',
                body: newPostPersonalProcedure,
            }),
        }),
    }),
});

export const { useAddPersonalProcedureMutation } = postPersonalProcedureApi;