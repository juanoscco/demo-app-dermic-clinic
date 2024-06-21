import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const putPersonalProcedureApi = createApi({
    reducerPath: 'putPersonalProcedureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        updatePersonalProcedure: builder.mutation({
            query: ({ personalProcedureId, personalProcedureData }) => ({
                url: `procedimiento_personal/${personalProcedureId}`,
                method: 'PUT',
                body: personalProcedureData,
            }),
        }),
    }),
});

export const { useUpdatePersonalProcedureMutation } = putPersonalProcedureApi;