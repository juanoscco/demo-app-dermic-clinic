import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
// import { Procedure, ResponseProcedure } from "../../interface/"
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/procedimiento`;

export const procedureCreateApi = createApi({
    reducerPath: 'procedureCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addProcedure: builder.mutation({
            query: (newProcedure) => ({
                url: '',
                method: 'POST',
                body: newProcedure,
            }),
        }),
    }),
});

export const { useAddProcedureMutation } = procedureCreateApi;