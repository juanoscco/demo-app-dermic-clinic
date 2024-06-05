import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { ExtraAppointment, ResponseExtraAppointment } from "../../interface"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/cita_extra`;

export const extraAppointmentCreateApi = createApi({
    reducerPath: 'extraAppointmentCreateApi',
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