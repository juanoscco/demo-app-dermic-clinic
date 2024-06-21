import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse } from "../../models/login.interface"

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: 'auth/authenticate',
                method: 'POST',
                body: { username, password },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
} = authApi;

// logout: builder.mutation<void, void>({
//     query: () => ({
//         url: '/logout',
//         method: 'POST',
//     }),
// }),