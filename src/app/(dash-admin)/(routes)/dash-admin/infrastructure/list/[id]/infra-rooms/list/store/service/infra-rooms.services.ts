import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const roomsListApi = createApi({
    reducerPath: 'roomsListApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRoomsList: builder.query({
            query: ({ limit = 10, page = 0, filter = '' }) => `sala_tratamiento?p=${page}&limit=${limit}&filtro=${filter}`,
        }),
    }),
});

export const { useGetRoomsListQuery } = roomsListApi;
