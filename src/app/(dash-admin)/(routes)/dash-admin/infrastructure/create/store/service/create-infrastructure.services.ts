import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Headquarters, ResponseHeadquartes } from "../../interface/create-infrastructure.interface"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/sede`;

export const infrastructureCreateApi = createApi({
    reducerPath: 'infrastructureCreateApi',
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
        addInfrastructure: builder.mutation<ResponseHeadquartes, Headquarters>({
            query: (newInfrastructure) => ({
                url: '',
                method: 'POST',
                body: newInfrastructure,
            }),
        }),
    }),
});

export const { useAddInfrastructureMutation } = infrastructureCreateApi;
// export default pacienteApi;
