import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
// import { Headquarters, ResponseHeadquartes } from "../../interface/"
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/sede`;

export const infrastructureCreateApi = createApi({
    reducerPath: 'infrastructureCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addInfrastructure: builder.mutation({
            query: (newInfrastructure) => ({
                url: '',
                method: 'POST',
                body: newInfrastructure,
            }),
        }),
    }),
});

export const { useAddInfrastructureMutation } = infrastructureCreateApi;