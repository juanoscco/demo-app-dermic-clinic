import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const appointmentExtraDeleteApi = createApi({
    reducerPath: 'appointmentExtraDeleteApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders,
    }),
    endpoints: (builder) => ({
        deleteAppointmentExtra: builder.mutation({
            query: ({ deleteAppointmentExtraId }) => ({
                url: `/cita_extra/${deleteAppointmentExtraId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useDeleteAppointmentExtraMutation } = appointmentExtraDeleteApi;
