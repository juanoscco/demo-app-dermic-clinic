import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Appointment, ResponseAppointment } from "../../interface/"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/cita`;

export const appointmentCreateApi = createApi({
    reducerPath: 'appointmentCreateApi',
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
        addAppointment: builder.mutation<ResponseAppointment, Appointment>({
            query: (newAppointment) => ({
                url: '',
                method: 'POST',
                body: newAppointment,
            }),
        }),
    }),
});

export const { useAddAppointmentMutation } = appointmentCreateApi;