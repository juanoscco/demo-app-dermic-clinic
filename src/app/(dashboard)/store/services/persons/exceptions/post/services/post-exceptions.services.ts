import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';
// import { Exception, ResponseException } from "../../../../interface"
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/excepcion`;

export const exceptionCreateApi = createApi({
    reducerPath: 'exceptionCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addException: builder.mutation({
            query: (newException) => ({
                url: '',
                method: 'POST',
                body: newException,
            }),
        }),
    }),
});

export const { useAddExceptionMutation } = exceptionCreateApi;