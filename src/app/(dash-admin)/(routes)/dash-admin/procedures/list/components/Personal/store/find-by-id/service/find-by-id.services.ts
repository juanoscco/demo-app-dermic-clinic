import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const findbyIdHeadBoardProcedureAvailableApi = createApi({
    reducerPath: 'findbyIdHeadBoardProcedureAvailableApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getHeadBoardProcedureAvailableById: builder.query({
            query: (id: number) => `procedimiento_personal/titulos/disponibilidad/${id}`,
        }),
    }),
});

export const { useGetHeadBoardProcedureAvailableByIdQuery } = findbyIdHeadBoardProcedureAvailableApi;
