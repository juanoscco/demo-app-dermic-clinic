import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/' }),
//     endpoints: (builder) => ({
//         login: builder.mutation<LoginResponse, LoginRequest>({
//             query: ({ email, password }) => ({
//                 url: 'login',
//                 method: 'POST',
//                 body: { email, password },
//             }),
//         }),
//     }),
// });
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/' }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: { email, password },
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
export default authApi;
