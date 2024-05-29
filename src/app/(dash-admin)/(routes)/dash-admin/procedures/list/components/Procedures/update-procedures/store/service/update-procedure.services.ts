import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const procedureUpdateApi = createApi({
    reducerPath: 'procedureUpdateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        updateProcedure: builder.mutation({
            query: ({ procedureId, procedureData }) => ({
                url: `procedimiento/${procedureId}`,
                method: 'PUT',
                body: procedureData,
            }),
        }),
    }),
});

export const { useUpdateProcedureMutation } = procedureUpdateApi;