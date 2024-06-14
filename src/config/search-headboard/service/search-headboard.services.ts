import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findHeadboardApi = createApi({
    reducerPath: 'findHeadboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFindHeadBoard: builder.query({
            query: (id: number) => `cabecera/${id}`,
        }),
    }),
});

export const { useGetFindHeadBoardQuery } = findHeadboardApi;
