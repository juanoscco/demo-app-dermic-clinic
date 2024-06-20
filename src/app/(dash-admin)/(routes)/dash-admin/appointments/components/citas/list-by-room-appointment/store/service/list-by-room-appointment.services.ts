import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const appointmentRoomListApi = createApi({
    reducerPath: 'appointmentRoomListApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAppointmentRoomList: builder.query({
            query: ({ limit = 10, page = 0, filter = '' }) => `cita/sala_procedimiento?p=${page}&limit=${limit}&filtro=${filter}`,
        }),
    }),
});

export const { useGetAppointmentRoomListQuery } = appointmentRoomListApi;
