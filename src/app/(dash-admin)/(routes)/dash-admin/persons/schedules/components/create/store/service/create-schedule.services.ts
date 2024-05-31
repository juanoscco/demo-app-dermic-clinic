import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Schelude, ResponseSchelude } from "../../../../interface/"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/horario_trabajo`;

export const scheduleCreateApi = createApi({
    reducerPath: 'scheduleCreateApi',
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
        addSchedule: builder.mutation<ResponseSchelude, Schelude>({
            query: (newSchedule) => ({
                url: '',
                method: 'POST',
                body: newSchedule,
            }),
        }),
    }),
});

export const { useAddScheduleMutation } = scheduleCreateApi;