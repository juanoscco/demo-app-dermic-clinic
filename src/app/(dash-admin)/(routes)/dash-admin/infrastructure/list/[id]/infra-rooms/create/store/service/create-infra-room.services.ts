import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { InfraRoom, ReponseInfraRoom } from "../../interface"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/sala_tratamiento`;

export const infrastructureRoomCreateApi = createApi({
    reducerPath: 'infrastructureRoomCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
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