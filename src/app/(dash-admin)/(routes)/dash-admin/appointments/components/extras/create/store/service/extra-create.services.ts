import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { ExtraAppointment, ResponseExtraAppointment } from "../../interface"
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/cita_extra`;

export const extraAppointmentCreateApi = createApi({
    reducerPath: 'extraAppointmentCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addPaciente: builder.mutation<ResponseExtraAppointment, ExtraAppointment>({
            query: (newExtraAppointment) => ({
                url: '',
                method: 'POST',
                body: newExtraAppointment,
            }),
        }),
    }),
});

export const { useAddPacienteMutation } = extraAppointmentCreateApi;