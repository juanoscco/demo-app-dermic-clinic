import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const infrastructureRoomUpdateApi = createApi({
    reducerPath: 'infrastructureRoomUpdateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        infrastructureRoomUpdate: builder.mutation({
            query: ({ infrastructureRoomId, infrastructureRoomData }) => ({
                url: `sala_tratamiento/${infrastructureRoomId}`,
                method: 'PUT',
                body: infrastructureRoomData,
            }),
        }),
    }),
});

export const { useInfrastructureRoomUpdateMutation } = infrastructureRoomUpdateApi;