import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Schedule, ResponseSchedule } from "../../../../interface/"
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/horario_trabajo`;

export const scheduleCreateApi = createApi({
    reducerPath: 'scheduleCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addSchedule: builder.mutation<ResponseSchedule, Schedule>({
            query: (newSchedule) => ({
                url: '',
                method: 'POST',
                body: newSchedule,
            }),
        }),
    }),
});

export const { useAddScheduleMutation } = scheduleCreateApi;