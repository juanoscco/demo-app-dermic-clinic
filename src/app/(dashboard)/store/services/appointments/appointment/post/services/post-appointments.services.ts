import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';
// import { Appointment, ResponseAppointment } from "../../interface/"
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/cita`;

export const appointmentCreateApi = createApi({
    reducerPath: 'appointmentCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addAppointment: builder.mutation({
            query: (newAppointment) => ({
                url: '',
                method: 'POST',
                body: newAppointment,
            }),
        }),
    }),
});

export const { useAddAppointmentMutation } = appointmentCreateApi;