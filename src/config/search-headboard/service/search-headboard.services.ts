import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findHeadboardApi = createApi({
    reducerPath: 'findHeadboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        getFindHeadBoard: builder.query({
            query: (id: number) => `cabecera/${id}`,
        }),
    }),
});

export const { useGetFindHeadBoardQuery } = findHeadboardApi;
