import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Agenda, ResponseAgenda } from "../../../../interface"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/agenda`;

export const agendaCreateApi = createApi({
    reducerPath: 'agendaCreateApi',
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
        addAgenda: builder.mutation<ResponseAgenda, Agenda>({
            query: (newAgenda) => ({
                url: '',
                method: 'POST',
                body: newAgenda,
            }),
        }),
    }),
});

export const { useAddAgendaMutation } = agendaCreateApi;