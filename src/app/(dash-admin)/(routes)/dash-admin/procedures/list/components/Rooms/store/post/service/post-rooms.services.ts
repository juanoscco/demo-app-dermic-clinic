import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/procedimiento_sala`;

export const postRoomProcedureApi = createApi({
    reducerPath: 'postRoomProcedureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addRoomProcedure: builder.mutation({
            query: (newPostRoomProcedure) => ({
                url: '',
                method: 'POST',
                body: newPostRoomProcedure,
            }),
        }),
    }),
});

export const { useAddRoomProcedureMutation } = postRoomProcedureApi;