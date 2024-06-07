import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const putPersonalProcedureApi = createApi({
    reducerPath: 'putPersonalProcedureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
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