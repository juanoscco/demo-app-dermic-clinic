import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const putRoomProcedureApi = createApi({
    reducerPath: 'putRoomProcedureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        updateRoomProcedure: builder.mutation({
            query: ({ roomProcedureId, roomProcedureData }) => ({
                url: `procedimiento_sala/${roomProcedureId}`,
                method: 'PUT',
                body: roomProcedureData,
            }),
        }),
    }),
});

export const { useUpdateRoomProcedureMutation } = putRoomProcedureApi;