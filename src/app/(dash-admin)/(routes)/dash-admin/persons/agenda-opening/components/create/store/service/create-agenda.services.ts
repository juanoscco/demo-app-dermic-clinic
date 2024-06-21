import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { AgendaOpening, ResponseAgendaOpening } from "../../../../interface"
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/agenda`;

export const agendaCreateApi = createApi({
    reducerPath: 'agendaCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addAgenda: builder.mutation<ResponseAgendaOpening, AgendaOpening>({
            query: (newAgenda) => ({
                url: '',
                method: 'POST',
                body: newAgenda,
            }),
        }),
    }),
});

export const { useAddAgendaMutation } = agendaCreateApi;