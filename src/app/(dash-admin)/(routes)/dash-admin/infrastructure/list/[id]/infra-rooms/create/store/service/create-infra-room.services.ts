import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { InfraRoom, ReponseInfraRoom } from "../../interface"
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/sala_tratamiento`;

export const infrastructureRoomCreateApi = createApi({
    reducerPath: 'infrastructureRoomCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addInfrastructureRoom: builder.mutation<ReponseInfraRoom, InfraRoom>({
            query: (newInfrastructureRoom) => ({
                url: '',
                method: 'POST',
                body: newInfrastructureRoom,
            }),
        }),
    }),
});

export const { useAddInfrastructureRoomMutation } = infrastructureRoomCreateApi;