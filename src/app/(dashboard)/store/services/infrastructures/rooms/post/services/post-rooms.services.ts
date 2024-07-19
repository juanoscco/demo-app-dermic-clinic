import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
// import { InfraRoom, ReponseInfraRoom } from "../../interface"
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/sala_tratamiento`;

export const infrastructureRoomCreateApi = createApi({
    reducerPath: 'infrastructureRoomCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addInfrastructureRoom: builder.mutation({
            query: (newInfrastructureRoom) => ({
                url: '',
                method: 'POST',
                body: newInfrastructureRoom,
            }),
        }),
    }),
});

export const { useAddInfrastructureRoomMutation } = infrastructureRoomCreateApi;