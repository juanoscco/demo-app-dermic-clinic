import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
// import { AgendaOpening, ResponseAgendaOpening } from "../../../../interface"
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/agenda`;

export const agendaCreateApi = createApi({
    reducerPath: 'agendaCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addAgenda: builder.mutation({
            query: (newAgenda) => ({
                url: '',
                method: 'POST',
                body: newAgenda,
            }),
        }),
    }),
});

export const { useAddAgendaMutation } = agendaCreateApi;